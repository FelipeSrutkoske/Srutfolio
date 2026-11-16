"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vNoise;

  // Compact 3D simplex-like trigonometric displacement for 60fps smoothness
  float field(vec3 p) {
    return sin(p.x * 2.1 + uTime * 0.85) *
           cos(p.y * 2.3 - uTime * 0.65) *
           sin(p.z * 2.0 + uTime * 0.75);
  }

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec3 pos = position;

    float n = field(pos * 1.15);
    float mousePull = 1.0 + 0.12 * sin(pos.x * 2.0 + uMouse.x * 3.14);
    float disp = n * (0.28 + uScroll * 0.22) * mousePull;

    pos += normal * disp;
    vNoise = n;
    vPosition = pos;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vNoise;

  void main() {
    vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.4);

    // Editorial Mustard (#E0A714), Warm Ivory (#F4F2ED), and Charcoal (#141413)
    vec3 charcoal = vec3(0.06, 0.06, 0.06);
    vec3 mustard = vec3(0.878, 0.655, 0.078);
    vec3 highlight = vec3(0.98, 0.89, 0.56);

    float band = smoothstep(-0.45, 0.55, vNoise + vNormal.y * 0.35);
    vec3 baseColor = mix(charcoal, mustard, band);
    vec3 finalColor = mix(baseColor, highlight, fresnel * 0.78);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function KineticMonolith() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100
    );
    camera.position.z = 4.6;

    const geometry = new THREE.IcosahedronGeometry(1.38, 28);
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Thin orbital wireframe ring for technical precision
    const ringGeo = new THREE.TorusGeometry(2.05, 0.008, 12, 96);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0e0e0d,
      transparent: true,
      opacity: 0.25,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI * 0.38;
    ring.rotation.y = Math.PI * 0.14;
    scene.add(ring);

    const targetMouse = { x: 0, y: 0 };
    const currentMouse = { x: 0, y: 0 };
    let isVisible = true;

    const onPointerMove = (e: PointerEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.5);
      uniforms.uScroll.value = progress;
    };

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = Math.max(container.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = prefersReducedMotion ? 0.5 : clock.getElapsedTime();
      uniforms.uTime.value = elapsed;

      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.06;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.06;
      uniforms.uMouse.value.set(currentMouse.x, currentMouse.y);

      mesh.position.x = currentMouse.x * 0.42;
      mesh.position.y = currentMouse.y * 0.28 - uniforms.uScroll.value * 0.35;
      mesh.rotation.y = elapsed * 0.18 + currentMouse.x * 0.5;
      mesh.rotation.x = elapsed * 0.12 - currentMouse.y * 0.4;

      const scale = Math.max(0.75, 1 - uniforms.uScroll.value * 0.18);
      mesh.scale.setScalar(scale);

      ring.rotation.z = elapsed * 0.08;
      ring.position.x = -currentMouse.x * 0.18;
      ring.position.y = -currentMouse.y * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (webglFailed) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-64 w-64 rounded-full bg-mustard/80 blur-2xl md:h-96 md:w-96" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    />
  );
}
