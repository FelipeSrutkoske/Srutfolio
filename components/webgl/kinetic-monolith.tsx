"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec3 vNormal;
  varying vec3 vViewPos;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec3 pos = position;

    // Subtle breathing pulse along normal
    float pulse = sin(uTime * 1.4 + pos.y * 1.8) * 0.025;
    pos += normal * pulse;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPos = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPos;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPos);

    // Clean studio rim lighting (Fresnel) + directional key light
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.2);
    vec3 lightDir = normalize(vec3(0.6, 0.8, 0.7));
    float diff = max(dot(normal, lightDir), 0.0);

    vec3 charcoal = vec3(0.055, 0.055, 0.052);
    vec3 mustard = vec3(0.878, 0.655, 0.078);
    vec3 warmGold = vec3(0.96, 0.82, 0.38);

    vec3 base = mix(charcoal, mustard, smoothstep(0.15, 0.85, diff));
    vec3 color = mix(base, warmGold, fresnel * 0.72);

    gl_FragColor = vec4(color, 1.0);
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
      40,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100
    );
    camera.position.z = 5.2;

    // Clean architectural TorusKnot sculpture
    const geometry = new THREE.TorusKnotGeometry(1.12, 0.34, 180, 32, 2, 3);
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = 0.65;
    scene.add(mesh);

    // Subtle wireframe cage around the knot
    const wireGeo = new THREE.IcosahedronGeometry(2.15, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x0e0e0d,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    wire.position.x = 0.65;
    scene.add(wire);

    const targetMouse = { x: 0, y: 0 };
    const currentMouse = { x: 0, y: 0 };
    let scrollProgress = 0;
    let isVisible = true;

    const onPointerMove = (e: PointerEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      scrollProgress = Math.min(
        window.scrollY / Math.max(window.innerHeight, 1),
        1.5
      );
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

      mesh.position.x = 0.65 + currentMouse.x * 0.35;
      mesh.position.y = currentMouse.y * 0.25 - scrollProgress * 0.35;
      mesh.rotation.y = elapsed * 0.24 + currentMouse.x * 0.45;
      mesh.rotation.x = elapsed * 0.16 - currentMouse.y * 0.35;

      const scale = Math.max(0.78, 1 - scrollProgress * 0.18);
      mesh.scale.setScalar(scale);

      wire.rotation.y = -elapsed * 0.09;
      wire.rotation.x = elapsed * 0.06;
      wire.position.x = 0.65 - currentMouse.x * 0.15;
      wire.position.y = -currentMouse.y * 0.1;

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
      wireGeo.dispose();
      wireMat.dispose();
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
        <div className="h-64 w-64 rounded-full bg-mustard/75 blur-2xl md:h-96 md:w-96" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    />
  );
}
