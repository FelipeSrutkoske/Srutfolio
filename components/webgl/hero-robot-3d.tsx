"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const SPEECH_LINES = {
  pt: [
    "Olá! 👋",
    "Node.js, TypeScript, Go & Linux.",
    "Clique em qualquer projeto para ver os trade-offs.",
    "Já viu o go-vit? Roda direto no terminal.",
    "VehiGo: Nginx, 3 serviços, Redis 7 e Postgres.",
    "1 ano sustentando produção em MySQL e Oracle.",
    "Look4: binário nativo em Rust + GTK4 no GNOME.",
    "Disponível para vagas remotas (BR & Intl).",
    "Inglês B2 — pronto para times distribuídos.",
    "Curtiu? O currículo em PDF tá logo ali ←",
  ],
  en: [
    "Hey there! 👋",
    "Node.js, TypeScript, Go & Linux.",
    "Open any case study to inspect real trade-offs.",
    "Check out go-vit — single-binary Go TUI.",
    "VehiGo: Nginx, 3 services, Redis 7 & Postgres.",
    "1 year running production MySQL, Oracle & Linux.",
    "Look4: native Rust + GTK4 utility for GNOME.",
    "Open to remote roles worldwide.",
    "English B2 — ready for distributed teams.",
    "Want the short version? Resume PDF is right there ←",
  ],
};

// Resolution-independent full-face RGB wave visor shader:
// Broad, velvety flowing RGB waves across the entire face dome + soft glossy glass sheen,
// balanced in saturation/depth so the crisp pure-white eyes always pop cleanly.
const visorVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPos;
  varying vec2 vLocalPos;

  void main() {
    vLocalPos = position.xy;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPos = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const visorFragmentShader = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewPos;
  varying vec2 vLocalPos;

  // Smooth, rich RGB cosine palette tuned to keep high contrast behind white eyes
  vec3 rgbPalette(float t) {
    vec3 a = vec3(0.32, 0.28, 0.36);
    vec3 b = vec3(0.36, 0.34, 0.38);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.00, 0.33, 0.67);
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPos);

    // Normalized visor coordinates [-1, 1]
    vec2 uv = vLocalPos / vec2(0.51, 0.42);
    float dist = length(uv);

    // Broad organic wave field flowing smoothly across the entire face
    float wave1 = sin(uv.x * 2.1 + uTime * 0.75 + cos(uv.y * 1.6 - uTime * 0.45) * 0.85);
    float wave2 = cos(uv.y * 2.0 - uTime * 0.6 + sin(uv.x * 1.5 + uTime * 0.4) * 0.75);
    float flow = (wave1 * 0.5 + wave2 * 0.5) * 0.42 + uTime * 0.11 + dist * 0.28;

    vec3 waveColor = rgbPalette(flow);
    vec3 accentColor = rgbPalette(flow + 0.22);

    // Full-surface RGB blend with deeper velvety center so white eyes stand out crisply
    float centerDepth = smoothstep(0.0, 0.95, dist);
    vec3 base = mix(waveColor * 0.68, accentColor * 1.05, centerDepth);

    // Subtle glass rim fresnel boost
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.2);
    vec3 color = base + accentColor * fresnel * 0.42;

    // Crisp glossy glass highlight (top-left reflection)
    vec3 lightDir = normalize(vec3(-0.45, 0.78, 0.85));
    vec3 halfVec = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfVec), 0.0), 52.0);
    color += vec3(1.0, 0.99, 0.97) * spec * 0.42;

    // Gentle vignette right against the metallic bezel
    float rimShadow = smoothstep(0.84, 1.05, dist);
    color = mix(color, vec3(0.05, 0.05, 0.07), rimShadow * 0.55);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function createContactShadowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const grad = ctx.createRadialGradient(
      size / 2,
      size / 2,
      size * 0.04,
      size / 2,
      size / 2,
      size * 0.48
    );
    grad.addColorStop(0, "rgba(14, 14, 13, 0.22)");
    grad.addColorStop(0.5, "rgba(14, 14, 13, 0.08)");
    grad.addColorStop(1, "rgba(14, 14, 13, 0.0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Perfectly circular convex dome via LatheGeometry (rim -> apex for outward +Z normals),
 * scaled gently into an oval face visor with zero rectangular edges.
 */
function createSmoothVisorGeometry(): THREE.BufferGeometry {
  const points: THREE.Vector2[] = [];
  const steps = 40;
  const maxRadius = 0.48;
  const domeDepth = 0.16;

  for (let i = 0; i <= steps; i++) {
    const t = 1 - i / steps; // 1 = outer rim, 0 = center apex
    const r = Math.max(0.0005, t * maxRadius);
    const z = Math.cos(t * (Math.PI / 2)) * domeDepth;
    points.push(new THREE.Vector2(r, z));
  }

  const geo = new THREE.LatheGeometry(points, 96);
  geo.rotateX(Math.PI / 2);
  geo.scale(1.08, 0.86, 1.0);
  geo.computeVertexNormals();
  return geo;
}

export default function HeroRobot3D() {
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLButtonElement>(null);

  const hopImpulseRef = useRef<number>(0);
  const resetSpeakTimerRef = useRef<(() => void) | null>(null);
  const lineCountRef = useRef<number>(SPEECH_LINES.pt.length);

  const [webglAvailable] = useState<boolean>(() => detectWebGL());
  const [speechIndex, setSpeechIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(true);

  const lines = locale === "en" ? SPEECH_LINES.en : SPEECH_LINES.pt;

  useEffect(() => {
    lineCountRef.current = lines.length;
  }, [lines.length]);

  const handleManualInteract = () => {
    hopImpulseRef.current = 1.0;
    setSpeechIndex((prev) => (prev + 1) % lines.length);
    setIsSpeaking(true);
    resetSpeakTimerRef.current?.();
  };

  useEffect(() => {
    if (!webglAvailable) return;
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
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const initW = Math.max(container.clientWidth, 1);
    const initH = Math.max(container.clientHeight, 1);
    renderer.setPixelRatio(dpr);
    renderer.setSize(initW, initH);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture;
    scene.environment = envTexture;

    const camera = new THREE.PerspectiveCamera(34, initW / initH, 0.1, 100);
    camera.position.set(0, 0.22, 6.85);
    camera.lookAt(0, 0.02, 0);

    const keyLight = new THREE.DirectionalLight(0xfffaf0, 1.35);
    keyLight.position.set(3.5, 4.8, 4.2);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xf6cf65, 0.78);
    rimLight.position.set(-3.6, 2.4, -2.5);
    scene.add(rimLight);

    const fillLight = new THREE.HemisphereLight(0xffffff, 0xeae7df, 0.55);
    scene.add(fillLight);

    const disposables: Array<{ dispose: () => void }> = [];

    // Materials
    const ceramicMat = new THREE.MeshPhysicalMaterial({
      color: 0xfbfaf6,
      roughness: 0.2,
      metalness: 0.03,
      clearcoat: 0.55,
      clearcoatRoughness: 0.14,
    });

    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x181816,
      roughness: 0.3,
      metalness: 0.6,
    });

    const mustardAccentMat = new THREE.MeshStandardMaterial({
      color: 0xe0a714,
      roughness: 0.26,
      metalness: 0.28,
    });

    const visorUniforms = { uTime: { value: 0 } };
    const visorMat = new THREE.ShaderMaterial({
      vertexShader: visorVertexShader,
      fragmentShader: visorFragmentShader,
      uniforms: visorUniforms,
    });

    // Crisp pure-white glowing eyes (toneMapped: false so they stay pure bright white!)
    const eyeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      toneMapped: false,
    });

    // Subtle RGB ambient light spilling softly onto the bezel around the face
    const faceRgbLight = new THREE.PointLight(0xffb84d, 1.1, 2.0);
    faceRgbLight.position.set(0, 0, 0.85);

    const shadowTex = createContactShadowTexture();
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });

    disposables.push(
      ceramicMat,
      darkMetalMat,
      mustardAccentMat,
      visorMat,
      eyeMat,
      shadowTex,
      shadowMat
    );

    // Roaming anchor in world X/Z
    const roamAnchor = new THREE.Group();
    scene.add(roamAnchor);

    // Floating vertical container inside roamAnchor
    const robotGroup = new THREE.Group();
    robotGroup.position.set(0, -0.22, 0);
    roamAnchor.add(robotGroup);

    // 1. Soft contact shadow following the ground footprint
    const shadowGeo = new THREE.PlaneGeometry(2.55, 2.55);
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -1.62, 0);
    roamAnchor.add(shadowMesh);
    disposables.push(shadowGeo);

    // 2. Omnidirectional rolling sphere (BB-8 style 6 symmetrical circular panels — NO waist line colliding with the neck!)
    const bodyGroup = new THREE.Group();
    bodyGroup.position.set(0, -0.44, 0);
    robotGroup.add(bodyGroup);

    const bodyRadius = 0.94;
    const bodyGeo = new THREE.SphereGeometry(bodyRadius, 96, 96);
    const bodyMesh = new THREE.Mesh(bodyGeo, ceramicMat);
    bodyGroup.add(bodyMesh);
    disposables.push(bodyGeo);

    // Single clean central medallion on the front of the sphere
    const outerPanelGeo = new THREE.TorusGeometry(0.28, 0.018, 16, 64);
    const innerPanelGeo = new THREE.TorusGeometry(0.16, 0.014, 16, 48);
    const centerDotGeo = new THREE.SphereGeometry(0.065, 24, 24);
    disposables.push(outerPanelGeo, innerPanelGeo, centerDotGeo);

    const frontPanel = new THREE.Group();
    frontPanel.position.set(0, 0, bodyRadius - 0.025);
    const outer = new THREE.Mesh(outerPanelGeo, mustardAccentMat);
    const inner = new THREE.Mesh(innerPanelGeo, darkMetalMat);
    const dot = new THREE.Mesh(centerDotGeo, darkMetalMat);
    dot.position.z = -0.02;
    frontPanel.add(outer, inner, dot);
    bodyGroup.add(frontPanel);

    // 3. Stabilized magnetic collar (always horizontal between body and head)
    const neckGeo = new THREE.TorusGeometry(0.36, 0.03, 24, 64);
    const neckMesh = new THREE.Mesh(neckGeo, darkMetalMat);
    neckMesh.rotation.x = Math.PI / 2;
    neckMesh.position.set(0, 0.54, 0);
    robotGroup.add(neckMesh);
    disposables.push(neckGeo);

    // 4. Smooth high-res head + full-surface RGB visor placed cleanly in front of head shell
    const headPivot = new THREE.Group();
    headPivot.position.set(0, 0.94, 0);
    robotGroup.add(headPivot);

    const headGeo = new THREE.SphereGeometry(0.66, 96, 96);
    const headMesh = new THREE.Mesh(headGeo, ceramicMat);
    headMesh.scale.set(1.06, 0.9, 0.92); // front surface reaches z = 0.607
    headPivot.add(headMesh);
    disposables.push(headGeo);

    // Metallic oval bezel sitting cleanly around the visor perimeter (z = 0.525)
    const bezelGeo = new THREE.TorusGeometry(0.465, 0.032, 32, 128);
    const bezelMesh = new THREE.Mesh(bezelGeo, darkMetalMat);
    bezelMesh.scale.set(1.09, 0.87, 1.0);
    bezelMesh.position.set(0, -0.01, 0.525);
    headPivot.add(bezelMesh);
    disposables.push(bezelGeo);

    // Full-face smooth RGB dome (starts at z = 0.515, apex reaches z = 0.675 — well ahead of head shell z = 0.607!)
    const visorGeo = createSmoothVisorGeometry();
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, -0.01, 0.515);
    headPivot.add(visorMesh);
    headPivot.add(faceRgbLight);
    disposables.push(visorGeo);

    // Crisp pure-white expressive eyes sitting cleanly in front of the visor apex (z = 0.695)
    const eyesGroup = new THREE.Group();
    eyesGroup.position.set(0, -0.01, 0.695);
    headPivot.add(eyesGroup);

    const eyeGeo = new THREE.CapsuleGeometry(0.052, 0.09, 20, 32);
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.155, 0, -0.012);
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.155, 0, -0.012);
    eyesGroup.add(leftEye, rightEye);
    disposables.push(eyeGeo);

    // Side ear pods
    const earGeo = new THREE.CylinderGeometry(0.115, 0.135, 0.11, 48);
    const earRingGeo = new THREE.TorusGeometry(0.105, 0.014, 16, 48);

    const leftEar = new THREE.Group();
    const leftEarBody = new THREE.Mesh(earGeo, darkMetalMat);
    leftEarBody.rotation.z = Math.PI / 2;
    const leftEarAccent = new THREE.Mesh(earRingGeo, mustardAccentMat);
    leftEarAccent.rotation.y = Math.PI / 2;
    leftEarAccent.position.x = -0.052;
    leftEar.add(leftEarBody, leftEarAccent);
    leftEar.position.set(-0.7, 0.02, -0.02);

    const rightEar = new THREE.Group();
    const rightEarBody = new THREE.Mesh(earGeo, darkMetalMat);
    rightEarBody.rotation.z = Math.PI / 2;
    const rightEarAccent = new THREE.Mesh(earRingGeo, mustardAccentMat);
    rightEarAccent.rotation.y = Math.PI / 2;
    rightEarAccent.position.x = 0.052;
    rightEar.add(rightEarBody, rightEarAccent);
    rightEar.position.set(0.7, 0.02, -0.02);

    headPivot.add(leftEar, rightEar);
    disposables.push(earGeo, earRingGeo);

    // Top antenna
    const antennaStemGeo = new THREE.CylinderGeometry(0.015, 0.02, 0.22, 24);
    const antennaStem = new THREE.Mesh(antennaStemGeo, darkMetalMat);
    antennaStem.position.set(0, 0.66, -0.05);
    const antennaTipGeo = new THREE.SphereGeometry(0.044, 32, 32);
    const antennaTip = new THREE.Mesh(antennaTipGeo, mustardAccentMat);
    antennaTip.position.set(0, 0.78, -0.05);
    headPivot.add(antennaStem, antennaTip);
    disposables.push(antennaStemGeo, antennaTipGeo);

    // Autonomous roaming state machine: speak -> roll -> speak -> roll
    let mode: "speaking" | "moving" = "speaking";
    let modeTimer = 3.2;
    let currentX = 0;
    let currentZ = 0;
    let startX = 0;
    let startZ = 0;
    let targetX = 0;
    let targetZ = 0;
    let moveDuration = 2.0;
    let moveElapsed = 0;
    let waypointStep = 0;

    const normalizedWaypoints: Array<[number, number]> = [
      [0.72, 0.14],
      [-0.68, -0.16],
      [0.2, 0.22],
      [-0.8, 0.1],
      [0.8, -0.12],
      [0.0, 0.0],
    ];

    const getMaxRoamX = () => {
      const vFov = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * camera.position.z * Math.tan(vFov / 2);
      const visibleWidth = visibleHeight * camera.aspect;
      return Math.max(0.25, Math.min(2.15, visibleWidth * 0.5 - 1.35));
    };

    const pickNextWaypoint = () => {
      const maxX = getMaxRoamX();
      const [nx, nz] =
        normalizedWaypoints[waypointStep % normalizedWaypoints.length];
      waypointStep += 1;
      startX = currentX;
      startZ = currentZ;
      targetX = nx * maxX;
      targetZ = nz;
      const dist = Math.hypot(targetX - startX, targetZ - startZ);
      moveDuration = Math.max(1.35, Math.min(2.6, dist * 1.15 + 0.75));
      moveElapsed = 0;
    };

    resetSpeakTimerRef.current = () => {
      mode = "speaking";
      modeTimer = 3.8;
    };

    // Smooth cursor tracking & helpers
    const targetPointer = { x: 0, y: 0 };
    const currentPointer = { x: 0, y: 0 };
    let isVisible = true;
    let nextBlinkTime = 2.6;
    let blinkProgress = 0;
    const bubbleAnchorWorld = new THREE.Vector3();
    const rollAxis = new THREE.Vector3();
    const rgbColorHelper = new THREE.Color();

    const onWindowPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width * 0.5;
      const cy = rect.top + rect.height * 0.48;
      const nx = (e.clientX - cx) / Math.max(window.innerWidth * 0.42, 260);
      const ny = (e.clientY - cy) / Math.max(window.innerHeight * 0.42, 240);
      targetPointer.x = Math.max(-1, Math.min(1, nx));
      targetPointer.y = Math.max(-1, Math.min(1, ny));
    };

    const onWindowLeave = () => {
      targetPointer.x = 0;
      targetPointer.y = 0;
    };

    window.addEventListener("pointermove", onWindowPointerMove, {
      passive: true,
    });
    document.addEventListener("mouseleave", onWindowLeave);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.max(entry.contentRect.width, 1);
        const h = Math.max(entry.contentRect.height, 1);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        const maxX = getMaxRoamX();
        currentX = Math.max(-maxX, Math.min(maxX, currentX));
        targetX = Math.max(-maxX, Math.min(maxX, targetX));
      }
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    let rafId = 0;
    const clock = new THREE.Clock();

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const updateBubbleScreenPosition = () => {
      const bubble = bubbleRef.current;
      if (!bubble) return;
      bubbleAnchorWorld.set(
        roamAnchor.position.x,
        robotGroup.position.y + 1.98,
        roamAnchor.position.z
      );
      bubbleAnchorWorld.project(camera);

      const cw = container.clientWidth;
      const ch = container.clientHeight;
      const rawX = (bubbleAnchorWorld.x * 0.5 + 0.5) * cw;
      const rawY = (-bubbleAnchorWorld.y * 0.5 + 0.5) * ch;

      const halfBubble = Math.min(bubble.offsetWidth * 0.5 || 110, cw * 0.45);
      const clampedX = Math.max(
        halfBubble + 12,
        Math.min(cw - halfBubble - 12, rawX)
      );
      const clampedY = Math.max(24, Math.min(ch - 80, rawY));

      bubble.style.transform = `translate3d(${clampedX.toFixed(1)}px, ${clampedY.toFixed(1)}px, 0) translate(-50%, -100%)`;
    };

    const renderFrame = (elapsed: number, delta: number) => {
      visorUniforms.uTime.value = elapsed;

      rgbColorHelper.setHSL((elapsed * 0.11) % 1, 0.78, 0.56);
      faceRgbLight.color.copy(rgbColorHelper);

      const smoothing = prefersReducedMotion ? 1 : 1 - Math.exp(-delta * 4.5);
      currentPointer.x += (targetPointer.x - currentPointer.x) * smoothing;
      currentPointer.y += (targetPointer.y - currentPointer.y) * smoothing;

      let velX = 0;
      let velZ = 0;

      if (!prefersReducedMotion) {
        if (mode === "speaking") {
          modeTimer -= delta;
          if (modeTimer <= 0) {
            mode = "moving";
            setIsSpeaking(false);
            pickNextWaypoint();
          }
        } else {
          moveElapsed += delta;
          const progress = Math.min(1, moveElapsed / moveDuration);
          const eased = easeInOutCubic(progress);

          const nextX = startX + (targetX - startX) * eased;
          const nextZ = startZ + (targetZ - startZ) * eased;
          const dx = nextX - currentX;
          const dz = nextZ - currentZ;
          const stepDist = Math.hypot(dx, dz);

          velX = delta > 0 ? dx / delta : 0;
          velZ = delta > 0 ? dz / delta : 0;

          currentX = nextX;
          currentZ = nextZ;

          // True physical omnidirectional rolling via world-space axis perpendicular to velocity
          if (stepDist > 0.0001) {
            rollAxis.set(dz / stepDist, 0, -dx / stepDist).normalize();
            bodyGroup.rotateOnWorldAxis(rollAxis, stepDist / bodyRadius);
          }

          if (progress >= 1) {
            mode = "speaking";
            modeTimer = 3.8;
            hopImpulseRef.current = 0.65;
            setSpeechIndex((prev) => (prev + 1) % lineCountRef.current);
            setIsSpeaking(true);
          }
        }
      }

      roamAnchor.position.x = currentX;
      roamAnchor.position.z = currentZ;

      // Hop impulse + subtle float
      hopImpulseRef.current *= Math.exp(-delta * 6.0);
      const hopOffset = Math.sin(hopImpulseRef.current * Math.PI) * 0.22;
      const floatY = prefersReducedMotion ? 0 : Math.sin(elapsed * 1.6) * 0.06;
      robotGroup.position.y = -0.22 + floatY + hopOffset;

      const shadowScale = 1 - (floatY + hopOffset) * 0.3;
      shadowMesh.scale.setScalar(Math.max(0.75, Math.min(1.1, shadowScale)));

      // Stabilized head tracking + subtle inertia lean into movement (never tips over)
      const moveLeanZ = Math.max(-0.14, Math.min(0.14, -velX * 0.055));
      const moveLeanX = Math.max(-0.08, Math.min(0.08, velZ * 0.045));
      const moveLookY = Math.max(-0.32, Math.min(0.32, velX * 0.16));

      const targetHeadYaw =
        mode === "moving"
          ? moveLookY + currentPointer.x * 0.22
          : currentPointer.x * 0.42;
      const targetHeadPitch = currentPointer.y * 0.22 + moveLeanX;

      headPivot.rotation.y += (targetHeadYaw - headPivot.rotation.y) * smoothing;
      headPivot.rotation.x +=
        (targetHeadPitch - headPivot.rotation.x) * smoothing;
      headPivot.rotation.z +=
        (moveLeanZ - currentPointer.x * 0.05 - headPivot.rotation.z) * smoothing;

      // Eye gaze offset inside the visor
      eyesGroup.position.x =
        mode === "moving"
          ? Math.max(-0.04, Math.min(0.04, velX * 0.022))
          : currentPointer.x * 0.036;
      eyesGroup.position.y = -0.01 - currentPointer.y * 0.024;

      // Natural blinking
      if (!prefersReducedMotion) {
        if (elapsed >= nextBlinkTime) {
          blinkProgress = 1;
          nextBlinkTime = elapsed + 3.0 + (Math.sin(elapsed * 7.3) + 1) * 1.1;
        }
        if (blinkProgress > 0) {
          blinkProgress = Math.max(0, blinkProgress - delta * 6.5);
          const blinkWave = Math.sin(blinkProgress * Math.PI);
          const scaleY = Math.max(0.12, 1 - blinkWave * 0.88);
          leftEye.scale.y = scaleY;
          rightEye.scale.y = scaleY;
        } else {
          leftEye.scale.y = 1;
          rightEye.scale.y = 1;
        }
      }

      renderer.render(scene, camera);
      updateBubbleScreenPosition();
    };

    if (prefersReducedMotion) {
      renderFrame(0.5, 0.016);
    } else {
      const animate = () => {
        rafId = requestAnimationFrame(animate);
        if (!isVisible) return;
        const delta = Math.min(clock.getDelta(), 0.05);
        renderFrame(clock.elapsedTime, delta);
      };
      animate();
    }

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onWindowPointerMove);
      document.removeEventListener("mouseleave", onWindowLeave);

      disposables.forEach((item) => item.dispose());
      envTexture.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [webglAvailable]);

  if (!webglAvailable) {
    return null;
  }

  return (
    <div className="relative h-full w-full overflow-visible">
      {/* Dynamic speech bubble tracking the roaming robot smoothly */}
      <button
        ref={bubbleRef}
        type="button"
        onClick={handleManualInteract}
        className={`absolute left-0 top-0 z-10 max-w-[260px] cursor-pointer whitespace-normal border border-ink bg-paper px-3.5 py-2 text-center font-mono text-xs font-medium leading-snug text-ink shadow-[3px_3px_0px_#0E0E0D] transition-opacity duration-300 hover:bg-mustard-soft ${
          isSpeaking ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <span>{lines[speechIndex]}</span>
        <span
          aria-hidden="true"
          className="absolute -bottom-[7px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-ink bg-paper"
        />
      </button>

      {/* Frameless WebGL canvas */}
      <div
        ref={containerRef}
        onClick={handleManualInteract}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleManualInteract();
          }
        }}
        aria-label={
          locale === "en"
            ? "Interactive roaming 3D robot — click to talk"
            : "Robô 3D interativo passeando pelo hero — clique para conversar"
        }
        className="h-full w-full cursor-pointer select-none focus-visible:outline-none"
      />
    </div>
  );
}
