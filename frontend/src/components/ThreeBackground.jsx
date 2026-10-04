import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeBackground({ themeMode }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 2. Ambient Node Constellation
    const nodeCount = 60;
    const nodesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(nodeCount * 3);
    const velocities = [];

    const isDark = themeMode !== 'light';
    const primaryColor = isDark ? 0x38bdf8 : 0x0f766e;
    const secondaryColor = isDark ? 0x2dd4bf : 0x111827;

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 30;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      velocities.push({
        x: (Math.random() - 0.5) * 0.03,
        y: (Math.random() - 0.5) * 0.03,
        z: (Math.random() - 0.5) * 0.02,
      });
    }

    nodesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const nodesMat = new THREE.PointsMaterial({
      color: primaryColor,
      size: isDark ? 0.35 : 0.45,
      transparent: true,
      opacity: isDark ? 0.55 : 0.58,
    });

    const nodeSystem = new THREE.Points(nodesGeo, nodesMat);
    scene.add(nodeSystem);

    // 3. Floating Geometric Polyhedron Badges (3D Floating Orbs)
    const orbGroup = new THREE.Group();
    const orbGeos = [
      new THREE.IcosahedronGeometry(1.2, 0),
      new THREE.OctahedronGeometry(1.4, 0),
      new THREE.TetrahedronGeometry(1.5, 0),
    ];

    const orbMat = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.25 : 0.28,
    });

    for (let i = 0; i < 6; i++) {
      const orb = new THREE.Mesh(orbGeos[i % 3], orbMat);
      orb.position.set(
        (Math.random() - 0.5) * 45,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 20
      );
      orb.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      orbGroup.add(orb);
    }
    scene.add(orbGroup);

    // 4. Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 5. Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const posAttr = nodesGeo.attributes.position;
      const array = posAttr.array;

      for (let i = 0; i < nodeCount; i++) {
        array[i * 3] += velocities[i].x;
        array[i * 3 + 1] += velocities[i].y;
        array[i * 3 + 2] += velocities[i].z;

        if (Math.abs(array[i * 3]) > 28) velocities[i].x *= -1;
        if (Math.abs(array[i * 3 + 1]) > 28) velocities[i].y *= -1;
        if (Math.abs(array[i * 3 + 2]) > 18) velocities[i].z *= -1;
      }
      posAttr.needsUpdate = true;

      orbGroup.children.forEach((orb, idx) => {
        orb.rotation.x += 0.003 * (idx % 2 === 0 ? 1 : -1);
        orb.rotation.y += 0.004 * (idx % 2 === 0 ? -1 : 1);
      });

      // Smooth camera motion
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      nodesGeo.dispose();
      nodesMat.dispose();
      orbGeos.forEach((g) => g.dispose());
      orbMat.dispose();
      renderer.dispose();
    };
  }, [themeMode]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: themeMode === 'light' ? 0.58 : 0.65,
        transition: 'opacity 0.3s ease',
      }}
    />
  );
}
