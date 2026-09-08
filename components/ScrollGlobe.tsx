"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.min(maximum, Math.max(minimum, value));

const mix = (start: number, end: number, amount: number) =>
  start + (end - start) * amount;

function uniqueVertices(geometry: THREE.BufferGeometry) {
  const position = geometry.getAttribute("position");
  const seen = new Set<string>();
  const vertices: number[] = [];

  for (let index = 0; index < position.count; index += 1) {
    const x = position.getX(index);
    const y = position.getY(index);
    const z = position.getZ(index);
    const key = `${x.toFixed(4)}:${y.toFixed(4)}:${z.toFixed(4)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    vertices.push(x, y, z);
  }

  return vertices;
}

export default function ScrollGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    const bridge = document.querySelector<HTMLElement>("[data-globe-bridge]");
    const bridgeStart = document.querySelector<HTMLElement>("[data-globe-start]");
    const darkSection = document.querySelector<HTMLElement>("[data-globe-dark]");
    if (!canvas || !root || !bridge || !bridgeStart || !darkSection) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.z = 4.15;

    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = 0.14;
    scene.add(globeGroup);

    const sphereGeometry = new THREE.IcosahedronGeometry(1, 2);
    const wireGeometry = new THREE.WireframeGeometry(sphereGeometry);
    const wireMaterial = new THREE.LineBasicMaterial({
      color: 0x111111,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
    });
    const wireframe = new THREE.LineSegments(wireGeometry, wireMaterial);
    globeGroup.add(wireframe);

    const vertices = uniqueVertices(sphereGeometry);
    const smallVertices: number[] = [];
    const accentVertices: number[] = [];
    for (let index = 0; index < vertices.length; index += 3) {
      const vertexNumber = index / 3;
      if (vertexNumber % 2 === 0) smallVertices.push(vertices[index], vertices[index + 1], vertices[index + 2]);
      if (vertexNumber % 11 === 0) accentVertices.push(vertices[index], vertices[index + 1], vertices[index + 2]);
    }

    const smallPointGeometry = new THREE.BufferGeometry();
    smallPointGeometry.setAttribute("position", new THREE.Float32BufferAttribute(smallVertices, 3));
    const smallPointMaterial = new THREE.PointsMaterial({
      color: 0x111111,
      size: 0.021,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const smallPoints = new THREE.Points(smallPointGeometry, smallPointMaterial);
    globeGroup.add(smallPoints);

    const accentPointGeometry = new THREE.BufferGeometry();
    accentPointGeometry.setAttribute("position", new THREE.Float32BufferAttribute(accentVertices, 3));
    const accentPointMaterial = new THREE.PointsMaterial({
      color: 0x111111,
      size: 0.038,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const accentPoints = new THREE.Points(accentPointGeometry, accentPointMaterial);
    globeGroup.add(accentPoints);

    let size = Math.max(1, Math.round(root.getBoundingClientRect().width));
    let darkMix = 0;
    let targetDarkMix = 0;
    let scrollEnergy = 0;
    let previousScrollY = window.scrollY;
    let previousScrollTime = performance.now();
    let previousFrame = performance.now();
    let isVisible = false;

    const resize = () => {
      size = Math.max(1, Math.round(root.getBoundingClientRect().width));
      renderer.setSize(size, size, false);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };

    const updateScrollState = () => {
      const viewportHeight = window.innerHeight;
      const bridgeRect = bridge.getBoundingClientRect();
      const bridgeStartRect = bridgeStart.getBoundingClientRect();
      const darkRect = darkSection.getBoundingClientRect();
      const visible = bridgeStartRect.top < viewportHeight * 0.88 && bridgeRect.bottom > viewportHeight * 0.08;
      isVisible = visible;

      targetDarkMix = clamp((viewportHeight * 0.72 - darkRect.top) / (viewportHeight * 0.58));
      const travel = reducedMotion ? 0 : targetDarkMix;
      root.style.setProperty("--globe-shift-x", `${mix(0, -48, travel)}px`);
      root.style.setProperty("--globe-shift-y", `${mix(0, -6, travel)}vh`);
      root.dataset.visible = visible ? "true" : "false";

      const now = performance.now();
      const elapsed = Math.max(16, now - previousScrollTime);
      const distance = Math.abs(window.scrollY - previousScrollY);
      scrollEnergy = Math.min(3, Math.max(scrollEnergy, distance / elapsed));
      previousScrollY = window.scrollY;
      previousScrollTime = now;
    };

    const render = (now: number) => {
      const delta = Math.min(48, now - previousFrame);
      previousFrame = now;
      if (!isVisible) return;
      darkMix += (targetDarkMix - darkMix) * (1 - Math.exp(-delta / 180));
      scrollEnergy *= Math.exp(-delta / 420);

      if (!reducedMotion) {
        globeGroup.rotation.y += delta * (0.00018 + scrollEnergy * 0.00032);
        globeGroup.rotation.z = Math.sin(now * 0.0001) * 0.035;
      }

      const tone = mix(0.055, 0.94, darkMix);
      wireMaterial.color.setRGB(tone, tone, tone);
      smallPointMaterial.color.setRGB(tone, tone, tone);
      accentPointMaterial.color.setRGB(tone, tone, tone);
      renderer.render(scene, camera);
    };

    resize();
    updateScrollState();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(root);
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    renderer.setAnimationLoop(render);

    return () => {
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      sphereGeometry.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      smallPointGeometry.dispose();
      smallPointMaterial.dispose();
      accentPointGeometry.dispose();
      accentPointMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="scrollGlobe" ref={rootRef} data-visible="false" aria-hidden="true">
      <canvas ref={canvasRef} className="scrollGlobeCanvas" />
    </div>
  );
}
