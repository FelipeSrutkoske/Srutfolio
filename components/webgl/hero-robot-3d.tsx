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

const HEAD_RADIUS = 0.68;
const HEAD_SCALE: [number, number, number] = [1.08, 0.91, 0.95];
const VISOR_AX = 0.62;
const VISOR_AY = 0.47;
const VISOR_Y_OFFSET = -0.015;

// High-precision SDF OLED Visor Shader:
// - Deep obsidian OLED matrix with micro-pixel grid & subtle scanlines
// - Crisp anti-aliased SDF eyes with gaze parallax, blink, happy (^ ^) morph & roll squint
// - Soft multi-layer optical bloom (warm mustard gold + ice cyan rim)
// - Live 5-bar voice equalizer mouth that animates while speaking
const visorVertexShader = /* glsl */ `
  varying vec2 vVisorUv;
  varying vec3 vNormal;
  varying vec3 vViewPos;

  void main() {
    vVisorUv = uv * 2.0 - 1.0;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPos = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const visorFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uGaze;
  uniform float uBlink;
  uniform float uHappy;
  uniform float uSpeaking;
  uniform float uSpeed;

  varying vec2 vVisorUv;
  varying vec3 vNormal;
  varying vec3 vViewPos;

  // Signed distance to a rounded capsule/box
  float sdRoundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  // Signed distance to an expressive eye that morphs between capsule, blink, and happy arch (^ ^)
  float sdEye(vec2 p, float blink, float happy, float squint) {
    // Happy arch bends the eye upward in the center like a cheerful '^' curve
    vec2 q = p;
    q.y -= happy * (0.055 - 1.35 * q.x * q.x);

    float halfH = mix(0.145, 0.014, clamp(blink + squint * 0.35, 0.0, 0.95));
    halfH = mix(halfH, 0.055, happy * 0.65);
    float halfW = mix(0.092, 0.125, happy * 0.7 + blink * 0.25);
    float radius = min(halfW, halfH) * 0.95;

    return sdRoundedBox(q, vec2(halfW, halfH), radius);
  }

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPos);
    vec2 uv = vVisorUv;
    float radial = length(uv);

    // 1. Deep Obsidian OLED Screen Base + Subtle Micro-Pixel Matrix
    vec3 bgDeep = vec3(0.032, 0.035, 0.048);
    vec3 bgEdge = vec3(0.075, 0.068, 0.055);
    vec3 color = mix(bgDeep, bgEdge, smoothstep(0.25, 0.98, radial));

    float pixelGridX = 0.5 + 0.5 * cos(uv.x * 210.0);
    float pixelGridY = 0.5 + 0.5 * cos(uv.y * 165.0);
    float ledMatrix = mix(0.92, 1.04, pixelGridX * pixelGridY);
    color *= ledMatrix;

    // Subtle horizontal telemetry scanline
    float scanline = sin(uv.y * 95.0 - uTime * 3.2) * 0.5 + 0.5;
    color += vec3(0.88, 0.65, 0.08) * (scanline * 0.014) * (1.0 - smoothstep(0.6, 1.0, radial));

    // Warm mustard & cool ice inner rim glow inside the bezel
    float innerRim = smoothstep(0.68, 0.98, radial) * (1.0 - smoothstep(0.97, 1.02, radial));
    vec3 mustard = vec3(0.92, 0.68, 0.10);
    vec3 iceCyan = vec3(0.38, 0.78, 0.98);
    color += mix(mustard, iceCyan, 0.25 + 0.25 * sin(uTime * 0.8 + uv.x * 2.0)) * innerRim * 0.24;

    // 2. Expressive SDF Twin Eyes with Gaze Parallax
    vec2 leftCenter = vec2(-0.35, 0.08) + uGaze;
    vec2 rightCenter = vec2(0.35, 0.08) + uGaze;

    // Slight asymmetric curious tilt when looking sideways
    vec2 pL = uv - leftCenter;
    vec2 pR = uv - rightCenter;

    float dL = sdEye(pL, uBlink, uHappy, uSpeed);
    float dR = sdEye(pR, uBlink, uHappy, uSpeed);
    float dEyes = min(dL, dR);

    // Crisp anti-aliased eye core + multi-layer optical bloom
    float coreMask = 1.0 - smoothstep(-0.008, 0.010, dEyes);
    float innerGlow = exp(-max(dEyes, 0.0) * 19.0);
    float outerBloom = exp(-max(dEyes, 0.0) * 6.5);

    // Subtle cute specular catchlight inside each open eye
    float openFactor = (1.0 - uBlink) * (1.0 - uHappy * 0.7);
    float catchL = 1.0 - smoothstep(0.018, 0.032, length(pL - vec2(0.032, 0.052)));
    float catchR = 1.0 - smoothstep(0.018, 0.032, length(pR - vec2(0.032, 0.052)));
    float catchLight = max(catchL, catchR) * openFactor;

    // Eye color composition: pure bright white-gold core + warm mustard/cyan bloom
    vec3 eyeCoreColor = vec3(1.0, 0.99, 0.96);
    vec3 eyeHaloColor = mix(vec3(0.96, 0.72, 0.14), vec3(0.55, 0.88, 1.0), 0.22);

    color += eyeHaloColor * outerBloom * 0.34;
    color += mix(mustard, vec3(1.0, 0.93, 0.70), 0.6) * innerGlow * 0.65;
    color = mix(color, eyeCoreColor, coreMask);
    color += vec3(1.0) * catchLight * 0.35;

    // Subtle rosy/amber cheek glow when happy or speaking
    float cheekL = exp(-length(uv - vec2(-0.52, -0.18) - uGaze * 0.5) * 7.5);
    float cheekR = exp(-length(uv - vec2(0.52, -0.18) - uGaze * 0.5) * 7.5);
    float cheekGlow = (cheekL + cheekR) * (0.25 + uHappy * 0.75 + uSpeaking * 0.25);
    color += mustard * cheekGlow * 0.28;

    // 3. Live 5-Bar Voice Equalizer / Telemetry Mouth
    float mouthMask = 0.0;
    float mouthGlow = 0.0;
    for (int i = -2; i <= 2; i++) {
      float fi = float(i);
      float bx = fi * 0.072 + uGaze.x * 0.45;
      float by = -0.36 + uGaze.y * 0.35;
      float wave = 0.5 + 0.5 * sin(uTime * 14.0 + fi * 1.45) * cos(uTime * 8.5 - fi * 0.9);
      float barH = mix(0.012, 0.018 + wave * 0.055 * (1.0 - abs(fi) * 0.22), uSpeaking);
      float dBar = sdRoundedBox(uv - vec2(bx, by), vec2(0.018, barH), 0.012);
      mouthMask = max(mouthMask, 1.0 - smoothstep(-0.005, 0.007, dBar));
      mouthGlow += exp(-max(dBar, 0.0) * 28.0) * 0.18;
    }
    vec3 mouthColor = mix(mustard, vec3(1.0, 0.94, 0.76), 0.55 + 0.35 * uSpeaking);
    color += mustard * mouthGlow * (0.4 + 0.6 * uSpeaking);
    color = mix(color, mouthColor, mouthMask * (0.55 + 0.45 * uSpeaking));

    // 4. Inner Glass Specular & Bezel Vignette
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.5);
    color += vec3(0.95, 0.88, 0.72) * fresnel * 0.14;

    float vignette = smoothstep(0.86, 1.02, radial);
    color = mix(color, vec3(0.02, 0.02, 0.03), vignette * 0.82);

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

/**
 * Projects normalized visor coordinates (u, v) in [-1, 1] directly onto the head ellipsoid
 * with radial offset `dr`, guaranteeing 100% mathematical conformity and zero clipping.
 */
function evalHeadEllipsoidPoint(
  u: number,
  v: number,
  dr: number,
  outPos: THREE.Vector3
) {
  const nx = u * VISOR_AX;
  const ny = v * VISOR_AY + VISOR_Y_OFFSET;
  const nzSq = Math.max(0.01, 1 - nx * nx - ny * ny);
  const nz = Math.sqrt(nzSq);
  const r = HEAD_RADIUS + dr;
  outPos.set(
    nx * r * HEAD_SCALE[0],
    ny * r * HEAD_SCALE[1],
    nz * r * HEAD_SCALE[2]
  );
}

/**
 * Conformal oval patch on the head ellipsoid (used for both the inner OLED dome and the outer curved glass shield).
 */
function createConformalVisorPatchGeometry(
  maxRho: number,
  baseOffset: number,
  apexDomeExtra: number
): THREE.BufferGeometry {
  const radialSegs = 28;
  const angularSegs = 80;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const tmp = new THREE.Vector3();

  for (let rIdx = 0; rIdx <= radialSegs; rIdx++) {
    const rho = (rIdx / radialSegs) * maxRho;
    const domeLift = (1 - (rho / maxRho) * (rho / maxRho)) * apexDomeExtra;
    const dr = baseOffset + domeLift;

    for (let aIdx = 0; aIdx <= angularSegs; aIdx++) {
      const phi = (aIdx / angularSegs) * Math.PI * 2;
      const u = rho * Math.cos(phi);
      const v = rho * Math.sin(phi);
      evalHeadEllipsoidPoint(u, v, dr, tmp);
      positions.push(tmp.x, tmp.y, tmp.z);

      // Normalized UVs [0, 1] mapping [-1, 1] across the visor aperture
      uvs.push((u / maxRho) * 0.5 + 0.5, (v / maxRho) * 0.5 + 0.5);
    }
  }

  const stride = angularSegs + 1;
  for (let rIdx = 0; rIdx < radialSegs; rIdx++) {
    for (let aIdx = 0; aIdx < angularSegs; aIdx++) {
      const a = rIdx * stride + aIdx;
      const b = a + stride;
      const c = b + 1;
      const d = a + 1;
      indices.push(a, b, d, b, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Conformal chamfered bezel ring that hugs the head ellipsoid perimeter with zero gaps or flat-torus poking.
 */
function createConformalBezelRingGeometry(
  innerRho: number,
  outerRho: number,
  peakHeight: number,
  baseHeight = 0.003
): THREE.BufferGeometry {
  const profileSegs = 18;
  const angularSegs = 96;
  const positions: number[] = [];
  const indices: number[] = [];
  const tmp = new THREE.Vector3();

  for (let pIdx = 0; pIdx <= profileSegs; pIdx++) {
    const t = pIdx / profileSegs; // 0 = inner rim, 1 = outer rim
    const rho = innerRho + (outerRho - innerRho) * t;
    // Smooth chamfered arch profile
    const arch = Math.pow(Math.sin(t * Math.PI), 0.75);
    const dr = baseHeight + arch * peakHeight;

    for (let aIdx = 0; aIdx <= angularSegs; aIdx++) {
      const phi = (aIdx / angularSegs) * Math.PI * 2;
      const u = rho * Math.cos(phi);
      const v = rho * Math.sin(phi);
      evalHeadEllipsoidPoint(u, v, dr, tmp);
      positions.push(tmp.x, tmp.y, tmp.z);
    }
  }

  const stride = angularSegs + 1;
  for (let pIdx = 0; pIdx < profileSegs; pIdx++) {
    for (let aIdx = 0; aIdx < angularSegs; aIdx++) {
      const a = pIdx * stride + aIdx;
      const b = a + stride;
      const c = b + 1;
      const d = a + 1;
      indices.push(a, b, d, b, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Conformal spherical-cap ring on a sphere of radius `sphereRadius` (facing +Z in local space),
 * so all 6 drive hubs sit flush on the rolling sphere without floating edges.
 */
function createConformalSphereRingGeometry(
  sphereRadius: number,
  innerAngle: number,
  outerAngle: number,
  peakLift: number
): THREE.BufferGeometry {
  const rSegs = 12;
  const aSegs = 56;
  const positions: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= rSegs; i++) {
    const t = i / rSegs;
    const theta = innerAngle + (outerAngle - innerAngle) * t;
    const r = sphereRadius + 0.002 + Math.sin(t * Math.PI) * peakLift;
    const sinT = Math.sin(theta);
    const cosT = Math.cos(theta);

    for (let j = 0; j <= aSegs; j++) {
      const phi = (j / aSegs) * Math.PI * 2;
      positions.push(
        r * sinT * Math.cos(phi),
        r * sinT * Math.sin(phi),
        r * cosT
      );
    }
  }

  const stride = aSegs + 1;
  for (let i = 0; i < rSegs; i++) {
    for (let j = 0; j < aSegs; j++) {
      const a = i * stride + j;
      const b = a + stride;
      const c = b + 1;
      const d = a + 1;
      indices.push(a, b, d, b, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

/**
 * High-DPI equirectangular procedural PBR textures (albedo + bump) for the rolling sphere body:
 * Precision industrial seams, micro-rivets, mustard telemetry bands, and stencil labels.
 */
function createBodyPBRTextures(): {
  albedoMap: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
} {
  const w = 1024;
  const h = 512;

  const albedoCanvas = document.createElement("canvas");
  albedoCanvas.width = w;
  albedoCanvas.height = h;
  const ctx = albedoCanvas.getContext("2d");

  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = w;
  bumpCanvas.height = h;
  const bCtx = bumpCanvas.getContext("2d");

  if (ctx && bCtx) {
    // Warm satin titanium-ceramic base
    const baseGrad = ctx.createLinearGradient(0, 0, 0, h);
    baseGrad.addColorStop(0, "#E5E0D5");
    baseGrad.addColorStop(0.5, "#F2EFE8");
    baseGrad.addColorStop(1, "#DED8CB");
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, w, h);

    // Neutral flat height for bump map
    bCtx.fillStyle = "#808080";
    bCtx.fillRect(0, 0, w, h);

    // Equatorial dark graphite & mustard technical band
    ctx.fillStyle = "#22211E";
    ctx.fillRect(0, h * 0.485, w, h * 0.03);
    bCtx.fillStyle = "#353535";
    bCtx.fillRect(0, h * 0.485, w, h * 0.03);

    // Dashed mustard accent ticks along the equator
    ctx.fillStyle = "#E0A714";
    for (let x = 16; x < w; x += 64) {
      ctx.fillRect(x, h * 0.493, 24, h * 0.014);
    }

    // 4 Longitudinal panel seam grooves
    ctx.strokeStyle = "rgba(24, 24, 22, 0.42)";
    ctx.lineWidth = 3;
    bCtx.strokeStyle = "#303030";
    bCtx.lineWidth = 4;

    for (let i = 0; i < 4; i++) {
      const x = (i + 0.5) * (w / 4);
      ctx.beginPath();
      ctx.moveTo(x, h * 0.14);
      ctx.lineTo(x, h * 0.86);
      ctx.stroke();

      bCtx.beginPath();
      bCtx.moveTo(x, h * 0.14);
      bCtx.lineTo(x, h * 0.86);
      bCtx.stroke();
    }

    // Polar collar rings (top & bottom latitudes)
    [0.2, 0.8].forEach((lat) => {
      ctx.strokeStyle = "rgba(24, 24, 22, 0.45)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, h * lat);
      ctx.lineTo(w, h * lat);
      ctx.stroke();

      bCtx.strokeStyle = "#2D2D2D";
      bCtx.lineWidth = 4;
      bCtx.beginPath();
      bCtx.moveTo(0, h * lat);
      bCtx.lineTo(w, h * lat);
      bCtx.stroke();
    });

    // Micro-rivets & technical stencil badges along the 4 quadrants
    ctx.fillStyle = "#181816";
    ctx.font = "bold 15px monospace";
    const labels = ["FS-01 // GO", "SYS // PROD", "LINUX // x64", "REV // 2026"];
    for (let i = 0; i < 4; i++) {
      const cx = i * (w / 4) + w / 8;
      ctx.fillStyle = "#E0A714";
      ctx.fillRect(cx - 38, h * 0.31, 76, 4);
      ctx.fillStyle = "rgba(24, 24, 22, 0.65)";
      ctx.fillText(labels[i], cx - 38, h * 0.355);

      // Corner panel rivets
      [-55, 55].forEach((dx) => {
        [0.24, 0.76].forEach((ry) => {
          ctx.beginPath();
          ctx.arc(cx + dx, h * ry, 3.2, 0, Math.PI * 2);
          ctx.fill();

          bCtx.fillStyle = "#252525";
          bCtx.beginPath();
          bCtx.arc(cx + dx, h * ry, 3.5, 0, Math.PI * 2);
          bCtx.fill();
        });
      });
    }
  }

  const albedoMap = new THREE.CanvasTexture(albedoCanvas);
  albedoMap.colorSpace = THREE.SRGBColorSpace;
  albedoMap.wrapS = THREE.RepeatWrapping;
  albedoMap.wrapT = THREE.ClampToEdgeWrapping;
  albedoMap.needsUpdate = true;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.ClampToEdgeWrapping;
  bumpMap.needsUpdate = true;

  return { albedoMap, bumpMap };
}

/**
 * Ground contact shadow + subtle technical floor reticle ring.
 */
function createContactShadowTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const cx = size / 2;
    const grad = ctx.createRadialGradient(cx, cx, size * 0.03, cx, cx, size * 0.46);
    grad.addColorStop(0, "rgba(14, 14, 13, 0.34)");
    grad.addColorStop(0.38, "rgba(14, 14, 13, 0.15)");
    grad.addColorStop(0.72, "rgba(14, 14, 13, 0.03)");
    grad.addColorStop(1, "rgba(14, 14, 13, 0.0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Subtle technical reticle ring around the shadow footprint
    ctx.strokeStyle = "rgba(224, 167, 20, 0.28)";
    ctx.lineWidth = 2;
    ctx.setLineDash([14, 10]);
    ctx.beginPath();
    ctx.arc(cx, cx, size * 0.34, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(14, 14, 13, 0.14)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(cx, cx, size * 0.38, 0, Math.PI * 2);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export default function HeroRobot3D() {
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLButtonElement>(null);

  const hopImpulseRef = useRef<number>(0);
  const happyImpulseRef = useRef<number>(0.4);
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
    happyImpulseRef.current = 1.0;
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
    renderer.toneMappingExposure = 1.08;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.035
    ).texture;
    scene.environment = envTexture;

    const camera = new THREE.PerspectiveCamera(33, initW / initH, 0.1, 100);
    camera.position.set(0, 0.24, 6.95);
    camera.lookAt(0, 0.02, 0);

    // Studio 3-point lighting with real self-shadowing
    const keyLight = new THREE.DirectionalLight(0xfff8eb, 1.55);
    keyLight.position.set(3.8, 5.6, 4.6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 1.0;
    keyLight.shadow.camera.far = 15.0;
    const d = 3.2;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0015;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xf5c445, 1.05);
    rimLight.position.set(-4.2, 2.8, -3.2);
    scene.add(rimLight);

    const coolKicker = new THREE.DirectionalLight(0xdbeafe, 0.55);
    coolKicker.position.set(-3.0, -1.5, 2.5);
    scene.add(coolKicker);

    const fillLight = new THREE.HemisphereLight(0xffffff, 0xd6d1c4, 0.5);
    scene.add(fillLight);

    const disposables: Array<{ dispose: () => void }> = [];

    // Procedural PBR textures for the sphere drive body
    const { albedoMap: bodyAlbedoMap, bumpMap: bodyBumpMap } =
      createBodyPBRTextures();
    disposables.push(bodyAlbedoMap, bodyBumpMap);

    // High-craft industrial materials
    const headCeramicMat = new THREE.MeshPhysicalMaterial({
      color: 0xf2efe6,
      roughness: 0.16,
      metalness: 0.06,
      clearcoat: 0.85,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.35,
    });

    const bodyCeramicMat = new THREE.MeshPhysicalMaterial({
      map: bodyAlbedoMap,
      bumpMap: bodyBumpMap,
      bumpScale: 0.012,
      roughness: 0.2,
      metalness: 0.08,
      clearcoat: 0.72,
      clearcoatRoughness: 0.14,
      envMapIntensity: 1.25,
    });

    const darkTitaniumMat = new THREE.MeshStandardMaterial({
      color: 0x16171a,
      roughness: 0.28,
      metalness: 0.78,
      envMapIntensity: 1.4,
    });

    const matteGraphiteMat = new THREE.MeshStandardMaterial({
      color: 0x232428,
      roughness: 0.52,
      metalness: 0.45,
    });

    const mustardAnodizedMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0a714,
      roughness: 0.22,
      metalness: 0.45,
      clearcoat: 0.5,
      clearcoatRoughness: 0.15,
      envMapIntensity: 1.3,
    });

    const emissiveBeaconMat = new THREE.MeshStandardMaterial({
      color: 0xf5b82e,
      emissive: 0xe0a714,
      emissiveIntensity: 1.15,
      roughness: 0.2,
    });

    const visorGlassCoverMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.2,
      roughness: 0.03,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      envMapIntensity: 2.5,
      depthWrite: false,
    });

    const visorUniforms = {
      uTime: { value: 0 },
      uGaze: { value: new THREE.Vector2(0, 0) },
      uBlink: { value: 0 },
      uHappy: { value: 0.35 },
      uSpeaking: { value: 1.0 },
      uSpeed: { value: 0.0 },
    };

    const visorMat = new THREE.ShaderMaterial({
      vertexShader: visorVertexShader,
      fragmentShader: visorFragmentShader,
      uniforms: visorUniforms,
    });

    const shadowTex = createContactShadowTexture();
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });

    disposables.push(
      headCeramicMat,
      bodyCeramicMat,
      darkTitaniumMat,
      matteGraphiteMat,
      mustardAnodizedMat,
      emissiveBeaconMat,
      visorGlassCoverMat,
      visorMat,
      shadowTex,
      shadowMat
    );

    // World roaming anchor
    const roamAnchor = new THREE.Group();
    scene.add(roamAnchor);

    // Floating vertical container inside roamAnchor
    const robotGroup = new THREE.Group();
    robotGroup.position.set(0, -0.22, 0);
    roamAnchor.add(robotGroup);

    // 1. Contact shadow & telemetry floor reticle
    const shadowGeo = new THREE.PlaneGeometry(2.75, 2.75);
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -1.62, 0);
    roamAnchor.add(shadowMesh);
    disposables.push(shadowGeo);

    // 2. Omnidirectional Rolling Sphere Drive Unit (with 6 conformal 3D hubs on all 6 axes)
    const bodyGroup = new THREE.Group();
    bodyGroup.position.set(0, -0.46, 0);
    robotGroup.add(bodyGroup);

    const bodyRadius = 0.92;
    const bodyGeo = new THREE.SphereGeometry(bodyRadius, 96, 96);
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyCeramicMat);
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    bodyGroup.add(bodyMesh);
    disposables.push(bodyGeo);

    // Conformal spherical-cap hub rings on all 6 orthogonal poles (+Z, -Z, +X, -X, +Y, -Y)
    const hubOuterGeo = createConformalSphereRingGeometry(
      bodyRadius,
      0.22,
      0.34,
      0.018
    );
    const hubMustardGeo = createConformalSphereRingGeometry(
      bodyRadius,
      0.13,
      0.21,
      0.022
    );
    const hubCoreGeo = createConformalSphereRingGeometry(
      bodyRadius,
      0.0,
      0.12,
      0.012
    );
    disposables.push(hubOuterGeo, hubMustardGeo, hubCoreGeo);

    const hubOrientations: Array<[number, number, number]> = [
      [0, 0, 0],
      [0, Math.PI, 0],
      [0, Math.PI / 2, 0],
      [0, -Math.PI / 2, 0],
      [-Math.PI / 2, 0, 0],
      [Math.PI / 2, 0, 0],
    ];

    hubOrientations.forEach(([rx, ry, rz]) => {
      const hub = new THREE.Group();
      hub.rotation.set(rx, ry, rz);
      const outerMesh = new THREE.Mesh(hubOuterGeo, darkTitaniumMat);
      const innerMesh = new THREE.Mesh(hubMustardGeo, mustardAnodizedMat);
      const coreMesh = new THREE.Mesh(hubCoreGeo, matteGraphiteMat);
      outerMesh.receiveShadow = true;
      innerMesh.receiveShadow = true;
      hub.add(outerMesh, innerMesh, coreMesh);
      bodyGroup.add(hub);
    });

    // 3. Multi-layered Magnetic Gimbal Neck & Stabilizer Collar
    const neckGroup = new THREE.Group();
    neckGroup.position.set(0, 0.51, 0);
    robotGroup.add(neckGroup);

    const lowerCollarGeo = new THREE.TorusGeometry(0.41, 0.036, 24, 72);
    const lowerCollar = new THREE.Mesh(lowerCollarGeo, darkTitaniumMat);
    lowerCollar.rotation.x = Math.PI / 2;
    lowerCollar.castShadow = true;
    lowerCollar.receiveShadow = true;

    const neckCoreGeo = new THREE.CylinderGeometry(0.27, 0.34, 0.14, 48);
    const neckCore = new THREE.Mesh(neckCoreGeo, matteGraphiteMat);
    neckCore.position.y = 0.05;
    neckCore.receiveShadow = true;

    const upperAccentRingGeo = new THREE.TorusGeometry(0.32, 0.022, 20, 64);
    const upperAccentRing = new THREE.Mesh(
      upperAccentRingGeo,
      mustardAnodizedMat
    );
    upperAccentRing.rotation.x = Math.PI / 2;
    upperAccentRing.position.y = 0.1;

    // 3 Front telemetry status pips on the collar
    const pipGeo = new THREE.SphereGeometry(0.02, 16, 16);
    [-0.1, 0, 0.1].forEach((px, idx) => {
      const pip = new THREE.Mesh(
        pipGeo,
        idx === 1 ? emissiveBeaconMat : mustardAnodizedMat
      );
      pip.position.set(px, 0.01, 0.43);
      neckGroup.add(pip);
    });

    neckGroup.add(lowerCollar, neckCore, upperAccentRing);
    disposables.push(
      lowerCollarGeo,
      neckCoreGeo,
      upperAccentRingGeo,
      pipGeo
    );

    // 4. Sculpted Head Shell + 100% Conformal Bezel, OLED Visor & Curved Glass Cover
    const headPivot = new THREE.Group();
    headPivot.position.set(0, 0.98, 0);
    robotGroup.add(headPivot);

    const headGeo = new THREE.SphereGeometry(HEAD_RADIUS, 96, 96);
    const headMesh = new THREE.Mesh(headGeo, headCeramicMat);
    headMesh.scale.set(...HEAD_SCALE);
    headMesh.castShadow = true;
    headMesh.receiveShadow = true;
    headPivot.add(headMesh);
    disposables.push(headGeo);

    // Conformal titanium outer bezel hugging the head curvature
    const outerBezelGeo = createConformalBezelRingGeometry(
      0.89,
      1.08,
      0.046,
      0.002
    );
    const outerBezelMesh = new THREE.Mesh(outerBezelGeo, darkTitaniumMat);
    outerBezelMesh.castShadow = true;
    outerBezelMesh.receiveShadow = true;
    headPivot.add(outerBezelMesh);
    disposables.push(outerBezelGeo);

    // Conformal mustard inner accent trim ring
    const innerTrimGeo = createConformalBezelRingGeometry(
      0.86,
      0.93,
      0.026,
      0.008
    );
    const innerTrimMesh = new THREE.Mesh(innerTrimGeo, mustardAnodizedMat);
    headPivot.add(innerTrimMesh);
    disposables.push(innerTrimGeo);

    // Conformal SDF OLED visor screen
    const visorGeo = createConformalVisorPatchGeometry(0.92, 0.01, 0.016);
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    headPivot.add(visorMesh);
    disposables.push(visorGeo);

    // Conformal transparent clearcoat curved glass shield over the OLED screen
    const glassCoverGeo = createConformalVisorPatchGeometry(0.9, 0.024, 0.022);
    const glassCoverMesh = new THREE.Mesh(glassCoverGeo, visorGlassCoverMat);
    headPivot.add(glassCoverMesh);
    disposables.push(glassCoverGeo);

    // Crown / brow telemetry crest on top of the helmet
    const crestGeo = new THREE.CapsuleGeometry(0.036, 0.24, 16, 32);
    const crestMesh = new THREE.Mesh(crestGeo, darkTitaniumMat);
    crestMesh.rotation.x = Math.PI / 2 - 0.28;
    crestMesh.position.set(0, 0.59, 0.12);
    const crestStripeGeo = new THREE.CapsuleGeometry(0.02, 0.18, 12, 24);
    const crestStripe = new THREE.Mesh(crestStripeGeo, mustardAnodizedMat);
    crestStripe.rotation.x = Math.PI / 2 - 0.28;
    crestStripe.position.set(0, 0.61, 0.13);
    headPivot.add(crestMesh, crestStripe);
    disposables.push(crestGeo, crestStripeGeo);

    // Multi-part articulated side ear pods
    const earBaseGeo = new THREE.CylinderGeometry(0.145, 0.165, 0.08, 48);
    const earCapGeo = new THREE.CylinderGeometry(0.11, 0.13, 0.06, 48);
    const earRingGeo = new THREE.TorusGeometry(0.125, 0.016, 16, 48);
    const earLedGeo = new THREE.SphereGeometry(0.024, 16, 16);
    disposables.push(earBaseGeo, earCapGeo, earRingGeo, earLedGeo);

    const buildEarPod = (side: -1 | 1) => {
      const ear = new THREE.Group();
      const base = new THREE.Mesh(earBaseGeo, darkTitaniumMat);
      base.rotation.z = Math.PI / 2;
      base.castShadow = true;

      const cap = new THREE.Mesh(earCapGeo, matteGraphiteMat);
      cap.rotation.z = Math.PI / 2;
      cap.position.x = side * 0.05;

      const ring = new THREE.Mesh(earRingGeo, mustardAnodizedMat);
      ring.rotation.y = Math.PI / 2;
      ring.position.x = side * 0.04;

      const led = new THREE.Mesh(earLedGeo, emissiveBeaconMat);
      led.position.x = side * 0.085;

      ear.add(base, cap, ring, led);
      ear.position.set(side * 0.72, 0.01, -0.02);
      return ear;
    };

    const leftEar = buildEarPod(-1);
    const rightEar = buildEarPod(1);
    headPivot.add(leftEar, rightEar);

    // Spring-articulated top antenna with base collar and glowing beacon
    const antennaPivot = new THREE.Group();
    antennaPivot.position.set(0.18, 0.58, -0.08);
    headPivot.add(antennaPivot);

    const antBaseGeo = new THREE.CylinderGeometry(0.036, 0.048, 0.05, 24);
    const antBase = new THREE.Mesh(antBaseGeo, darkTitaniumMat);
    const antStemGeo = new THREE.CylinderGeometry(0.012, 0.022, 0.24, 24);
    const antStem = new THREE.Mesh(antStemGeo, darkTitaniumMat);
    antStem.position.y = 0.13;
    const antRingGeo = new THREE.TorusGeometry(0.024, 0.007, 12, 24);
    const antRing = new THREE.Mesh(antRingGeo, mustardAnodizedMat);
    antRing.rotation.x = Math.PI / 2;
    antRing.position.y = 0.06;
    const antTipGeo = new THREE.SphereGeometry(0.044, 32, 32);
    const antTip = new THREE.Mesh(antTipGeo, emissiveBeaconMat);
    antTip.position.y = 0.26;
    antennaPivot.add(antBase, antStem, antRing, antTip);
    disposables.push(antBaseGeo, antStemGeo, antRingGeo, antTipGeo);

    // 5. Floating Magnetic Hands / Servo Pods (adds silhouette breadth & expressive gestures)
    const handShellGeo = new THREE.CapsuleGeometry(0.115, 0.18, 24, 36);
    const handCuffGeo = new THREE.TorusGeometry(0.118, 0.018, 16, 40);
    const handPadGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.03, 32);
    disposables.push(handShellGeo, handCuffGeo, handPadGeo);

    const buildFloatingHand = (side: -1 | 1) => {
      const hand = new THREE.Group();
      const shell = new THREE.Mesh(handShellGeo, headCeramicMat);
      shell.castShadow = true;
      shell.receiveShadow = true;

      const cuff = new THREE.Mesh(handCuffGeo, mustardAnodizedMat);
      cuff.rotation.x = Math.PI / 2;
      cuff.position.y = -0.05;

      const bottomCap = new THREE.Mesh(handPadGeo, darkTitaniumMat);
      bottomCap.position.y = -0.14;

      const innerEmitter = new THREE.Mesh(handPadGeo, darkTitaniumMat);
      innerEmitter.rotation.z = Math.PI / 2;
      innerEmitter.position.x = -side * 0.1;

      hand.add(shell, cuff, bottomCap, innerEmitter);
      hand.position.set(side * 1.18, -0.18, 0.18);
      hand.rotation.z = -side * 0.18;
      return hand;
    };

    const leftHand = buildFloatingHand(-1);
    const rightHand = buildFloatingHand(1);
    robotGroup.add(leftHand, rightHand);

    // Autonomous roaming state machine: speak -> roll -> speak -> roll
    let mode: "speaking" | "moving" = "speaking";
    let modeTimer = 3.4;
    let currentX = 0;
    let currentZ = 0;
    let startX = 0;
    let startZ = 0;
    let targetX = 0;
    let targetZ = 0;
    let moveDuration = 2.0;
    let moveElapsed = 0;
    let waypointStep = 0;
    let speakingBlend = 1.0;

    const normalizedWaypoints: Array<[number, number]> = [
      [0.68, 0.14],
      [-0.64, -0.15],
      [0.22, 0.22],
      [-0.75, 0.1],
      [0.75, -0.12],
      [0.0, 0.0],
    ];

    const getMaxRoamX = () => {
      const vFov = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * camera.position.z * Math.tan(vFov / 2);
      const visibleWidth = visibleHeight * camera.aspect;
      return Math.max(0.25, Math.min(2.05, visibleWidth * 0.5 - 1.45));
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
      moveDuration = Math.max(1.4, Math.min(2.6, dist * 1.15 + 0.75));
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
    let nextBlinkTime = 2.4;
    let blinkProgress = 0;
    const bubbleAnchorWorld = new THREE.Vector3();
    const rollAxis = new THREE.Vector3();

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
        robotGroup.position.y + 2.02,
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

      const smoothing = prefersReducedMotion ? 1 : 1 - Math.exp(-delta * 5.0);
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

          // Physical omnidirectional rolling around world axis perpendicular to velocity
          if (stepDist > 0.0001) {
            rollAxis.set(dz / stepDist, 0, -dx / stepDist).normalize();
            bodyGroup.rotateOnWorldAxis(rollAxis, stepDist / bodyRadius);
          }

          if (progress >= 1) {
            mode = "speaking";
            modeTimer = 3.8;
            hopImpulseRef.current = 0.65;
            happyImpulseRef.current = 0.75;
            setSpeechIndex((prev) => (prev + 1) % lineCountRef.current);
            setIsSpeaking(true);
          }
        }
      }

      roamAnchor.position.x = currentX;
      roamAnchor.position.z = currentZ;

      // Hop impulse, happy expression decay & speaking equalizer blend
      hopImpulseRef.current *= Math.exp(-delta * 5.8);
      happyImpulseRef.current *= Math.exp(-delta * 2.4);
      const targetSpeak = mode === "speaking" ? 1.0 : 0.0;
      speakingBlend += (targetSpeak - speakingBlend) * smoothing;

      const hopOffset = Math.sin(hopImpulseRef.current * Math.PI) * 0.24;
      const floatY = prefersReducedMotion ? 0 : Math.sin(elapsed * 1.7) * 0.055;
      robotGroup.position.y = -0.22 + floatY + hopOffset;

      const shadowScale = 1 - (floatY + hopOffset) * 0.28;
      shadowMesh.scale.setScalar(Math.max(0.75, Math.min(1.12, shadowScale)));
      shadowMesh.rotation.z = elapsed * 0.08;

      // Neck gimbal tilt & head tracking
      const speedMag = Math.min(1.0, Math.hypot(velX, velZ) * 0.45);
      const moveLeanZ = Math.max(-0.15, Math.min(0.15, -velX * 0.06));
      const moveLeanX = Math.max(-0.09, Math.min(0.09, velZ * 0.05));
      const moveLookY = Math.max(-0.34, Math.min(0.34, velX * 0.16));

      neckGroup.rotation.z = moveLeanZ * 0.55;
      neckGroup.rotation.x = moveLeanX * 0.55;

      const targetHeadYaw =
        mode === "moving"
          ? moveLookY + currentPointer.x * 0.22
          : currentPointer.x * 0.44;
      const targetHeadPitch = currentPointer.y * 0.24 + moveLeanX;

      headPivot.rotation.y += (targetHeadYaw - headPivot.rotation.y) * smoothing;
      headPivot.rotation.x +=
        (targetHeadPitch - headPivot.rotation.x) * smoothing;
      headPivot.rotation.z +=
        (moveLeanZ - currentPointer.x * 0.06 - headPivot.rotation.z) * smoothing;

      // Spring-inertia antenna sway
      antennaPivot.rotation.z =
        -moveLeanZ * 1.4 + Math.sin(elapsed * 4.2) * 0.04;
      antennaPivot.rotation.x =
        -0.12 - moveLeanX * 1.2 + Math.cos(elapsed * 3.5) * 0.03;

      // Floating magnetic hands animation (bobbing, banking with speed, waving on click/speak)
      const handWave = Math.sin(hopImpulseRef.current * Math.PI);
      const speakGesture =
        speakingBlend * Math.sin(elapsed * 5.2) * 0.045;

      leftHand.position.y =
        -0.18 +
        Math.sin(elapsed * 2.1 + 0.8) * 0.065 +
        handWave * 0.26 +
        speakGesture;
      rightHand.position.y =
        -0.18 +
        Math.sin(elapsed * 2.1 + 2.4) * 0.065 +
        handWave * 0.32 -
        speakGesture;

      leftHand.position.z = 0.18 - velX * 0.04 + handWave * 0.12;
      rightHand.position.z = 0.18 + velX * 0.04 + handWave * 0.16;

      leftHand.rotation.z = 0.18 + moveLeanZ * 0.8 - handWave * 0.45;
      rightHand.rotation.z = -0.18 + moveLeanZ * 0.8 + handWave * 0.55;
      leftHand.rotation.x = moveLeanX - handWave * 0.25;
      rightHand.rotation.x = moveLeanX - handWave * 0.35;

      // Update SDF Visor Shader uniforms (gaze parallax, blink, happy arch, voice equalizer)
      const gazeX =
        mode === "moving"
          ? Math.max(-0.14, Math.min(0.14, velX * 0.055))
          : currentPointer.x * 0.14;
      const gazeY = -currentPointer.y * 0.1;
      visorUniforms.uGaze.value.set(gazeX, gazeY);
      visorUniforms.uHappy.value = Math.min(1.0, happyImpulseRef.current);
      visorUniforms.uSpeaking.value = speakingBlend;
      visorUniforms.uSpeed.value = speedMag;

      // Natural blinking
      if (!prefersReducedMotion) {
        if (elapsed >= nextBlinkTime) {
          blinkProgress = 1;
          nextBlinkTime = elapsed + 2.8 + (Math.sin(elapsed * 7.3) + 1) * 1.15;
        }
        if (blinkProgress > 0) {
          blinkProgress = Math.max(0, blinkProgress - delta * 6.8);
          visorUniforms.uBlink.value = Math.sin(blinkProgress * Math.PI);
        } else {
          visorUniforms.uBlink.value = 0;
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
