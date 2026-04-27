'use client';

import React from 'react';
import * as THREE from 'three';

/**
 * Interactive WebGL globe — three.js, hand-rolled (no react-globe.gl).
 *
 * Texture-mapped sphere built from a procedural land-mass fragment
 * shader so we don't need to ship an Earth texture asset. FlyttGo
 * region pulses sit on the surface as billboarded sprites; great-
 * circle arcs link primary regions. Drag to rotate; auto-rotates when
 * idle. Honours prefers-reduced-motion (auto-rotate pauses; arcs
 * stay; pulses stay; drag still works).
 *
 * Lazy-loaded via dynamic import on /global-coverage so the three.js
 * bundle (~150 KB gzipped) doesn't touch the rest of the site.
 */

type Region = {
  code: string;
  city: string;
  lon: number;
  lat: number;
  tier: 'primary' | 'secondary' | 'sovereign';
};

const REGIONS: Region[] = [
  { code: 'NO-OS', city: 'Oslo',     lon: 10.75, lat: 59.91, tier: 'primary' },
  { code: 'UK-LN', city: 'London',   lon: -0.13, lat: 51.51, tier: 'primary' },
  { code: 'DE-FR', city: 'Frankfurt', lon: 8.68, lat: 50.11, tier: 'primary' },
  // North America — explicit SaaS/IaaS plane
  { code: 'US-W',  city: 'San Francisco', lon: -122.4, lat: 37.78, tier: 'primary' },
  { code: 'US-NW', city: 'Seattle',   lon: -122.33, lat: 47.6, tier: 'primary' },
  { code: 'US-MW', city: 'Chicago',   lon: -87.65, lat: 41.88, tier: 'secondary' },
  { code: 'US-NE', city: 'Boston',    lon: -71.06, lat: 42.36, tier: 'primary' },
  { code: 'US-E',  city: 'Northern Virginia', lon: -77.4, lat: 39.0, tier: 'primary' },
  { code: 'US-S',  city: 'Atlanta',   lon: -84.39, lat: 33.75, tier: 'secondary' },
  { code: 'US-SC', city: 'Dallas',    lon: -96.8, lat: 32.78, tier: 'secondary' },
  { code: 'US-SE', city: 'Miami',     lon: -80.19, lat: 25.76, tier: 'secondary' },
  { code: 'BR-SE', city: 'São Paulo', lon: -46.6, lat: -23.55, tier: 'secondary' },
  { code: 'NG-LG', city: 'Lagos',    lon: 3.38, lat: 6.52, tier: 'secondary' },
  { code: 'CM-YA', city: 'Yaoundé',  lon: 11.52, lat: 3.85, tier: 'secondary' },
  { code: 'KE-NB', city: 'Nairobi',  lon: 36.82, lat: -1.29, tier: 'secondary' },
  { code: 'UG-KP', city: 'Kampala',  lon: 32.59, lat: 0.35, tier: 'secondary' },
  { code: 'ET-AA', city: 'Addis Ababa', lon: 38.74, lat: 9.03, tier: 'secondary' },
  { code: 'ZA-JN', city: 'Johannesburg', lon: 28.05, lat: -26.2, tier: 'sovereign' },
  { code: 'AE-DX', city: 'Dubai',    lon: 55.27, lat: 25.2, tier: 'sovereign' },
  { code: 'SA-RD', city: 'Riyadh',   lon: 46.67, lat: 24.71, tier: 'sovereign' },
  { code: 'EG-CR', city: 'Cairo',    lon: 31.24, lat: 30.04, tier: 'secondary' },
  { code: 'IN-MU', city: 'Mumbai',   lon: 72.88, lat: 19.08, tier: 'secondary' },
  { code: 'SG',    city: 'Singapore', lon: 103.82, lat: 1.35, tier: 'primary' },
  { code: 'JP-TY', city: 'Tokyo',    lon: 139.69, lat: 35.69, tier: 'secondary' },
  { code: 'AU-SY', city: 'Sydney',   lon: 151.21, lat: -33.87, tier: 'secondary' },
];

const TIER_COLOR: Record<Region['tier'], number> = {
  primary: 0x1e6fd9,
  secondary: 0x0fb5a6,
  sovereign: 0x7c5ce6,
};

// LAND dot constellation — renders the same approximate continent
// shapes the 2D WorldDeploymentMap uses, projected onto the sphere
// surface. Each tuple is [lon, lat]. Read as recognisable Africa /
// Americas / Asia / Oceania at a glance instead of an abstract
// shader-noised sphere.
const LAND_DOTS: Array<[number, number]> = [
  // North America
  [-160, 65], [-150, 65], [-140, 65], [-130, 65], [-120, 65],
  [-160, 60], [-150, 60], [-140, 60], [-130, 60], [-120, 60], [-110, 60], [-100, 60], [-90, 60], [-80, 60], [-70, 60],
  [-155, 55], [-140, 55], [-125, 55], [-115, 55], [-105, 55], [-95, 55], [-85, 55], [-75, 55], [-65, 55], [-58, 55],
  [-128, 50], [-118, 50], [-108, 50], [-98, 50], [-88, 50], [-78, 50], [-68, 50], [-60, 50],
  [-125, 45], [-115, 45], [-105, 45], [-95, 45], [-85, 45], [-75, 45], [-67, 45],
  [-122, 40], [-112, 40], [-102, 40], [-92, 40], [-82, 40], [-74, 40],
  [-120, 35], [-108, 35], [-98, 35], [-88, 35], [-78, 35], [-72, 35],
  [-115, 30], [-105, 30], [-95, 30], [-85, 30], [-78, 30],
  [-110, 25], [-100, 25], [-90, 25], [-82, 25],
  [-105, 20], [-95, 20], [-88, 20],
  [-100, 15], [-88, 15], [-82, 15],
  [-92, 10], [-85, 10], [-78, 10],
  // South America
  [-78, 5], [-72, 5], [-65, 5], [-58, 5], [-52, 5],
  [-78, 0], [-72, 0], [-65, 0], [-58, 0], [-50, 0],
  [-78, -5], [-72, -5], [-65, -5], [-58, -5], [-50, -5], [-42, -5],
  [-75, -10], [-68, -10], [-60, -10], [-52, -10], [-45, -10], [-38, -10],
  [-72, -15], [-65, -15], [-58, -15], [-50, -15], [-42, -15],
  [-70, -20], [-62, -20], [-55, -20], [-48, -20], [-42, -20],
  [-70, -25], [-62, -25], [-55, -25], [-48, -25],
  [-72, -30], [-65, -30], [-58, -30],
  [-72, -35], [-65, -35], [-58, -35],
  [-72, -40], [-65, -40],
  [-70, -45], [-65, -45],
  // Europe
  [-10, 60], [0, 60], [10, 60], [20, 60], [30, 60], [40, 60], [55, 60],
  [-8, 55], [2, 55], [12, 55], [22, 55], [32, 55], [42, 55],
  [-8, 50], [2, 50], [12, 50], [22, 50], [32, 50], [42, 50],
  [-8, 45], [0, 45], [10, 45], [20, 45], [30, 45], [40, 45],
  [-5, 40], [5, 40], [15, 40], [25, 40], [35, 40], [42, 40],
  [-20, 65], [10, 70], [22, 68], [25, 70],
  // Africa
  [-15, 30], [-5, 30], [5, 30], [15, 30], [25, 30], [33, 30],
  [-15, 25], [-5, 25], [5, 25], [15, 25], [25, 25], [33, 25],
  [-15, 20], [-5, 20], [5, 20], [15, 20], [25, 20], [33, 20],
  [-15, 15], [-5, 15], [5, 15], [15, 15], [25, 15], [35, 15], [42, 15],
  [-12, 10], [-5, 10], [5, 10], [15, 10], [25, 10], [35, 10], [42, 10],
  [-8, 5], [0, 5], [10, 5], [20, 5], [30, 5], [38, 5],
  [10, 0], [20, 0], [28, 0], [35, 0], [42, 0],
  [12, -5], [22, -5], [30, -5], [38, -5],
  [15, -10], [22, -10], [30, -10], [38, -10],
  [15, -15], [22, -15], [30, -15], [38, -15],
  [18, -20], [25, -20], [32, -20],
  [20, -25], [27, -25], [32, -25],
  [22, -30], [28, -30],
  // MENA / Arabian peninsula
  [38, 30], [45, 30], [50, 30], [55, 30],
  [40, 25], [48, 25], [55, 25],
  [42, 20], [50, 20], [55, 20],
  [45, 15], [52, 15],
  // Asia
  [60, 65], [75, 65], [90, 65], [110, 65], [130, 65], [150, 65], [165, 65],
  [60, 60], [75, 60], [90, 60], [105, 60], [120, 60], [135, 60], [155, 60],
  [55, 55], [70, 55], [85, 55], [100, 55], [115, 55], [130, 55], [145, 55],
  [55, 50], [70, 50], [85, 50], [100, 50], [115, 50], [130, 50], [142, 50],
  [55, 45], [70, 45], [85, 45], [100, 45], [115, 45], [128, 45], [140, 45],
  [60, 40], [70, 40], [80, 40], [95, 40], [110, 40], [125, 40], [138, 40],
  [60, 35], [72, 35], [85, 35], [100, 35], [115, 35], [128, 35],
  [62, 30], [75, 30], [88, 30], [100, 30], [115, 30],
  [70, 25], [82, 25], [92, 25], [105, 25],
  [72, 20], [82, 20], [95, 20], [105, 20],
  [78, 15], [92, 15], [102, 15], [110, 15], [122, 15],
  [80, 10], [98, 10], [108, 10], [118, 10],
  [102, 5], [110, 5], [120, 5],
  [100, 0], [110, 0], [120, 0],
  // Indonesia / Philippines
  [105, -5], [115, -5], [122, -5], [130, -5],
  [115, -10], [122, -10], [130, -10], [138, -10],
  // Australia / Oceania
  [115, -20], [125, -20], [135, -20], [145, -20], [152, -20],
  [115, -25], [125, -25], [135, -25], [145, -25],
  [115, -30], [125, -30], [135, -30], [145, -30],
  [120, -35], [130, -35], [140, -35], [148, -35],
  [145, -40],
];

const ARCS: Array<[string, string]> = [
  ['NO-OS', 'US-E'],
  ['NO-OS', 'UK-LN'],
  ['UK-LN', 'US-E'],
  ['DE-FR', 'AE-DX'],
  ['DE-FR', 'SG'],
  ['SG', 'AU-SY'],
  ['SG', 'JP-TY'],
  ['NO-OS', 'KE-NB'],
  ['AE-DX', 'IN-MU'],
  ['UK-LN', 'ZA-JN'],
  ['US-W', 'JP-TY'],
  ['US-E', 'BR-SE'],
];

const RADIUS = 1;

function lonLatToVec3(lon: number, lat: number, r = RADIUS): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -r * Math.sin(phi) * Math.cos(theta);
  const z = r * Math.sin(phi) * Math.sin(theta);
  const y = r * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export default function WebGLGlobe({ size = 420 }: { size?: number }) {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ---- Scene / camera / renderer -----------------------------------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ---- Globe -------------------------------------------------------
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Ocean shader — deep navy with a soft Fresnel + faint lat/lon grid.
    // Continents are rendered as a separate Points cloud above, using the
    // same LAND[] dataset as the 2D world map. This guarantees the globe
    // shows recognisable continent shapes (Africa / Americas / Asia /
    // Oceania) instead of an abstract noise texture.
    const globeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: /* glsl */ `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float uTime;

        void main() {
          vec3 dir = normalize(vPosition);

          // Deep navy ocean base.
          vec3 base = vec3(0.020, 0.060, 0.135);

          // Edge fresnel — gives the sphere soft volumetric depth.
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 1.6);
          base += vec3(0.12, 0.43, 0.85) * fresnel * 0.55;

          // Faint lat/lon graticule (every ~15°).
          float lat = asin(dir.y);
          float lon = atan(dir.z, dir.x);
          float gridLat = smoothstep(0.025, 0.0, abs(mod(lat * 12.0 / 3.14159, 1.0) - 0.5));
          float gridLon = smoothstep(0.025, 0.0, abs(mod(lon * 12.0 / 3.14159, 1.0) - 0.5));
          base += vec3(0.20, 0.55, 0.95) * (gridLat + gridLon) * 0.06;

          gl_FragColor = vec4(base, 1.0);
        }
      `,
    });
    const globe = new THREE.Mesh(new THREE.SphereGeometry(RADIUS, 96, 96), globeMaterial);
    globeGroup.add(globe);

    // Continent dot cloud — recognisable land shapes.
    const landPositions = new Float32Array(LAND_DOTS.length * 3);
    LAND_DOTS.forEach(([lon, lat], i) => {
      const v = lonLatToVec3(lon, lat, RADIUS * 1.003);
      landPositions[i * 3 + 0] = v.x;
      landPositions[i * 3 + 1] = v.y;
      landPositions[i * 3 + 2] = v.z;
    });
    const landGeometry = new THREE.BufferGeometry();
    landGeometry.setAttribute('position', new THREE.BufferAttribute(landPositions, 3));
    const landMaterial = new THREE.PointsMaterial({
      color: 0x9ed0f9,
      size: 0.018,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.72,
    });
    const landCloud = new THREE.Points(landGeometry, landMaterial);
    globeGroup.add(landCloud);

    // ---- Atmosphere halo --------------------------------------------
    const atmoMaterial = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: /* glsl */ `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.62, 0.82, 0.98, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(RADIUS * 1.18, 64, 64), atmoMaterial);
    globeGroup.add(atmosphere);

    // ---- Region markers + halos -------------------------------------
    const markers: Array<{ mesh: THREE.Mesh; halo: THREE.Mesh; tier: Region['tier']; phase: number }> = [];
    REGIONS.forEach((r, i) => {
      const v = lonLatToVec3(r.lon, r.lat, RADIUS * 1.005);
      const color = TIER_COLOR[r.tier];

      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 16, 16),
        new THREE.MeshBasicMaterial({ color }),
      );
      dot.position.copy(v);
      globeGroup.add(dot);

      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 16, 16),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35 }),
      );
      halo.position.copy(v);
      globeGroup.add(halo);

      markers.push({ mesh: dot, halo, tier: r.tier, phase: i * 0.43 });
    });

    // ---- Great-circle arcs ------------------------------------------
    const regionMap = new Map(REGIONS.map((r) => [r.code, r]));
    ARCS.forEach(([a, b]) => {
      const ra = regionMap.get(a);
      const rb = regionMap.get(b);
      if (!ra || !rb) return;
      const va = lonLatToVec3(ra.lon, ra.lat);
      const vb = lonLatToVec3(rb.lon, rb.lat);
      const arc = greatCirclePoints(va, vb, 60, 0.32);
      const geom = new THREE.BufferGeometry().setFromPoints(arc);
      const mat = new THREE.LineBasicMaterial({
        color: 0x9ed0f9,
        transparent: true,
        opacity: 0.55,
      });
      const line = new THREE.Line(geom, mat);
      globeGroup.add(line);
    });

    // ---- Lights (the shader is unlit but we add one for any
    //               additional materials we drop in later) ------------
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    // ---- Drag-to-rotate ---------------------------------------------
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let velocityY = 0;
    let velocityX = 0;
    let autoRotate = !reduced;

    function onPointerDown(e: PointerEvent) {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      autoRotate = false;
      renderer.domElement.setPointerCapture(e.pointerId);
    }
    function onPointerMove(e: PointerEvent) {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      globeGroup.rotation.y += dx * 0.005;
      globeGroup.rotation.x += dy * 0.005;
      globeGroup.rotation.x = Math.max(-Math.PI / 2.4, Math.min(Math.PI / 2.4, globeGroup.rotation.x));
      velocityY = dx * 0.005;
      velocityX = dy * 0.005;
    }
    function onPointerUp(e: PointerEvent) {
      isDragging = false;
      renderer.domElement.releasePointerCapture(e.pointerId);
    }

    renderer.domElement.style.cursor = 'grab';
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('pointercancel', onPointerUp);

    // ---- Animation loop ---------------------------------------------
    let raf = 0;
    let last = performance.now();
    function tick(now: number) {
      const dt = (now - last) / 1000;
      last = now;
      const t = now / 1000;

      if (autoRotate && !isDragging) {
        globeGroup.rotation.y += dt * 0.18;
      } else if (!isDragging) {
        // Drag inertia decay.
        globeGroup.rotation.y += velocityY;
        globeGroup.rotation.x += velocityX;
        velocityY *= 0.94;
        velocityX *= 0.94;
        if (Math.abs(velocityX) < 0.0005 && Math.abs(velocityY) < 0.0005) {
          // Resume auto-rotate after the user finishes interacting.
          if (!reduced) autoRotate = true;
        }
      }

      // Pulse halos.
      for (const m of markers) {
        const pulse = 1 + 1.4 * (0.5 + 0.5 * Math.sin(t * 1.6 + m.phase));
        m.halo.scale.set(pulse, pulse, pulse);
        (m.halo.material as THREE.MeshBasicMaterial).opacity =
          0.35 * (1 - (pulse - 1) / 1.4);
      }

      globeMaterial.uniforms.uTime.value = t;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    // ---- Cleanup -----------------------------------------------------
    return () => {
      cancelAnimationFrame(raf);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('pointercancel', onPointerUp);
      renderer.dispose();
      globeMaterial.dispose();
      atmoMaterial.dispose();
      landGeometry.dispose();
      landMaterial.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [size, reduced]);

  return (
    <div
      ref={mountRef}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Interactive WebGL globe — drag to rotate, regional FlyttGo deployment markers with great-circle arcs"
      className="select-none touch-none"
    />
  );
}

function greatCirclePoints(a: THREE.Vector3, b: THREE.Vector3, segments: number, lift: number) {
  const points: THREE.Vector3[] = [];
  const aN = a.clone().normalize();
  const bN = b.clone().normalize();
  const angle = aN.angleTo(bN);
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const sinAngle = Math.sin(angle);
    const w0 = Math.sin((1 - t) * angle) / sinAngle;
    const w1 = Math.sin(t * angle) / sinAngle;
    const p = aN.clone().multiplyScalar(w0).add(bN.clone().multiplyScalar(w1));
    // Lift midpoints off the surface so the arc bows outward.
    const arcLift = lift * Math.sin(Math.PI * t);
    p.normalize().multiplyScalar(RADIUS * (1 + arcLift));
    points.push(p);
  }
  return points;
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}
