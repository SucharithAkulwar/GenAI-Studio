/**
 * Reactive Orb — High-Performance 3D Canvas Interactive Sphere
 * Inspired by Spline Community Reactive Orb (@vladkolokolnikov)
 * Renders a geodesic 3D sphere of responsive nodes that react to mouse hover,
 * changing size, outward displacement, and radiant illumination from dark rings
 * to glowing white, neon emerald, cyan, and deep teal with floating satellite particles.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ReactiveOrb = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function initReactiveOrb(canvas) {
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animId = null;

    // Orb parameters
    const NUM_POINTS = 360;
    let baseRadius = 185;
    const fov = 420;
    let rotationX = 0.2;
    let rotationY = 0.4;
    let targetRotX = 0.2;
    let targetRotY = 0.4;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    // Mouse proximity tracking
    let mousePos = { x: -9999, y: -9999 };
    let isHovering = false;

    // Generate Fibonacci Sphere Nodes
    const nodes = [];
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    for (let i = 0; i < NUM_POINTS; i++) {
      const theta = 2 * Math.PI * i / phi;
      const y = 1 - (i / (NUM_POINTS - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      nodes.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        x: 0,
        y: 0,
        z: 0,
        projX: 0,
        projY: 0,
        projScale: 1,
        scale: 1,
        targetScale: 1,
        intensity: 0,
        targetIntensity: 0,
        displacement: 0,
        targetDisplacement: 0,
        baseSize: 6.5 + (i % 3) * 1.5
      });
    }

    // Generate Orbiting Satellite Particles
    const NUM_SATELLITES = 45;
    const satellites = [];
    for (let i = 0; i < NUM_SATELLITES; i++) {
      const satRadius = 1.25 + Math.random() * 0.75;
      const orbitSpeed = (0.004 + Math.random() * 0.008) * (Math.random() > 0.5 ? 1 : -1);
      const orbitAngle = Math.random() * Math.PI * 2;
      const inclination = (Math.random() - 0.5) * Math.PI;
      const size = 2 + Math.random() * 3.5;
      const colorType = Math.random() > 0.4 ? 'green' : (Math.random() > 0.5 ? 'cyan' : 'white');

      satellites.push({
        satRadius,
        orbitSpeed,
        orbitAngle,
        inclination,
        size,
        colorType,
        x: 0,
        y: 0,
        z: 0,
        projX: 0,
        projY: 0,
        opacity: 0.3 + Math.random() * 0.7
      });
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width || 560;
      height = rect.height || 560;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.scale(dpr, dpr);

      baseRadius = Math.min(width, height) * 0.33;
    }

    // Event Handlers
    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mousePos.x = e.clientX - rect.left;
      mousePos.y = e.clientY - rect.top;
      isHovering = true;

      if (isDragging) {
        const dx = e.clientX - lastMouseX;
        const dy = e.clientY - lastMouseY;
        targetRotY += dx * 0.008;
        targetRotX += dy * 0.008;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
    }

    function onMouseDown(e) {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    }

    function onMouseUp() {
      isDragging = false;
    }

    function onMouseLeave() {
      isHovering = false;
      isDragging = false;
      mousePos.x = -9999;
      mousePos.y = -9999;
    }

    function onTouchMove(e) {
      if (!e.touches.length) return;
      const t = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      mousePos.x = t.clientX - rect.left;
      mousePos.y = t.clientY - rect.top;
      isHovering = true;

      if (isDragging) {
        const dx = t.clientX - lastMouseX;
        const dy = t.clientY - lastMouseY;
        targetRotY += dx * 0.01;
        targetRotX += dy * 0.01;
        lastMouseX = t.clientX;
        lastMouseY = t.clientY;
      }
    }

    function onTouchStart(e) {
      if (!e.touches.length) return;
      isDragging = true;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
      onMouseMove(e.touches[0]);
    }

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onMouseUp);
    window.addEventListener('resize', resize);

    resize();

    // Main 60fps render loop
    let tick = 0;
    function render() {
      tick++;

      // Smooth rotation with inertia
      if (!isDragging) {
        targetRotY += 0.0025;
        targetRotX += 0.0008;
      }
      rotationX += (targetRotX - rotationX) * 0.08;
      rotationY += (targetRotY - rotationY) * 0.08;

      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);

      const centerX = width / 2;
      const centerY = height / 2;
      const hoverRadius = baseRadius * 0.85;

      // Update Node 3D positions
      for (let i = 0; i < NUM_POINTS; i++) {
        const n = nodes[i];

        // 3D Rotation Matrix (Yaw around Y, Pitch around X)
        const x1 = n.baseX * cosY - n.baseZ * sinY;
        const z1 = n.baseZ * cosY + n.baseX * sinY;
        const y1 = n.baseY * cosX - z1 * sinX;
        const z2 = z1 * cosX + n.baseY * sinX;

        // Current radius including interactive displacement
        const r = baseRadius + n.displacement;
        n.x = x1 * r;
        n.y = y1 * r;
        n.z = z2 * r;

        // Perspective screen projection
        const pScale = fov / (fov + n.z);
        n.projScale = pScale;
        n.projX = centerX + n.x * pScale;
        n.projY = centerY + n.y * pScale;

        // Proximity Raycasting to Cursor
        let tDist = 0;
        if (isHovering && n.z > -baseRadius * 0.35) {
          const dist = Math.hypot(n.projX - mousePos.x, n.projY - mousePos.y);
          if (dist < hoverRadius) {
            tDist = 1 - (dist / hoverRadius);
            tDist = Math.max(0, Math.min(1, tDist));
          }
        }

        // Target states based on proximity
        if (tDist > 0) {
          n.targetIntensity = Math.pow(tDist, 1.1);
          n.targetScale = 1.0 + tDist * 2.4;
          n.targetDisplacement = tDist * 22;
        } else {
          n.targetIntensity = 0;
          n.targetScale = 1.0;
          n.targetDisplacement = 0;
        }

        // Smooth spring physics interpolation
        n.intensity += (n.targetIntensity - n.intensity) * 0.15;
        n.scale += (n.targetScale - n.scale) * 0.15;
        n.displacement += (n.targetDisplacement - n.displacement) * 0.15;
      }

      // Update Satellite Particles
      for (let i = 0; i < NUM_SATELLITES; i++) {
        const sat = satellites[i];
        sat.orbitAngle += sat.orbitSpeed;

        const satDist = baseRadius * sat.satRadius;
        const sx = Math.cos(sat.orbitAngle) * satDist;
        const sy = Math.sin(sat.orbitAngle) * Math.sin(sat.inclination) * satDist;
        const sz = Math.sin(sat.orbitAngle) * Math.cos(sat.inclination) * satDist;

        // Rotate satellites with orb
        const x1 = sx * cosY - sz * sinY;
        const z1 = sz * cosY + sx * sinY;
        const y1 = sy * cosX - z1 * sinX;
        const z2 = z1 * cosX + sy * sinX;

        sat.x = x1;
        sat.y = y1;
        sat.z = z2;

        const pScale = fov / (fov + sat.z);
        sat.projX = centerX + sat.x * pScale;
        sat.projY = centerY + sat.y * pScale;
        sat.pScale = pScale;
      }

      // Depth Sort (Back to Front) for correct 3D occlusion
      nodes.sort((a, b) => a.z - b.z);
      satellites.sort((a, b) => a.z - b.z);

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Combined render list sorted by Z
      let nIdx = 0;
      let sIdx = 0;

      while (nIdx < NUM_POINTS || sIdx < NUM_SATELLITES) {
        let drawSatellite = false;
        if (sIdx < NUM_SATELLITES && nIdx < NUM_POINTS) {
          drawSatellite = satellites[sIdx].z <= nodes[nIdx].z;
        } else if (sIdx < NUM_SATELLITES) {
          drawSatellite = true;
        }

        if (drawSatellite) {
          // Draw Satellite Particle
          const sat = satellites[sIdx++];
          const sz = sat.size * sat.pScale;
          if (sz > 0.5) {
            ctx.beginPath();
            ctx.arc(sat.projX, sat.projY, sz, 0, Math.PI * 2);
            if (sat.colorType === 'green') {
              ctx.fillStyle = `rgba(74, 222, 128, ${sat.opacity})`;
            } else if (sat.colorType === 'cyan') {
              ctx.fillStyle = `rgba(34, 211, 238, ${sat.opacity})`;
            } else {
              ctx.fillStyle = `rgba(255, 255, 255, ${sat.opacity})`;
            }
            ctx.fill();
          }
        } else {
          // Draw Orb Node
          const n = nodes[nIdx++];
          const nodeRadius = Math.max(1, (n.baseSize * n.projScale * n.scale));
          const isLit = n.intensity > 0.04;

          ctx.beginPath();
          ctx.arc(n.projX, n.projY, nodeRadius, 0, Math.PI * 2);

          if (!isLit) {
            // Unlit hollow dark outline circle (as seen in the reference)
            const depthAlpha = Math.max(0.08, Math.min(0.25, (n.z + baseRadius) / (2 * baseRadius)));
            ctx.strokeStyle = `rgba(148, 163, 184, ${depthAlpha * 0.85})`;
            ctx.lineWidth = Math.max(0.8, 1.2 * n.projScale);
            ctx.stroke();
          } else {
            // Glowing reactive illuminated sphere with multi-stop radial gradient
            const grad = ctx.createRadialGradient(
              n.projX - nodeRadius * 0.3,
              n.projY - nodeRadius * 0.3,
              0,
              n.projX,
              n.projY,
              nodeRadius
            );

            if (n.intensity > 0.65) {
              // High intensity: Pure white hot core -> electric lime -> cyan rim
              grad.addColorStop(0, '#ffffff');
              grad.addColorStop(0.35, '#86efac');
              grad.addColorStop(0.7, '#22d3ee');
              grad.addColorStop(1, '#0d9488');
            } else if (n.intensity > 0.3) {
              // Medium intensity: Vibrant lime -> teal -> deep cyan
              grad.addColorStop(0, '#4ade80');
              grad.addColorStop(0.5, '#14b8a6');
              grad.addColorStop(1, '#0f766e');
            } else {
              // Low intensity: Deep cyan/emerald glow
              grad.addColorStop(0, '#2dd4bf');
              grad.addColorStop(0.6, '#0f766e');
              grad.addColorStop(1, '#115e59');
            }

            ctx.save();
            // Outer bloom glow for radiant aesthetic
            ctx.shadowColor = n.intensity > 0.6 ? '#4ade80' : '#22d3ee';
            ctx.shadowBlur = Math.min(24, n.intensity * 22);
            ctx.fillStyle = grad;
            ctx.fill();

            // Specular 3D highlight reflection dot
            ctx.beginPath();
            ctx.arc(n.projX - nodeRadius * 0.32, n.projY - nodeRadius * 0.32, Math.max(0.8, nodeRadius * 0.22), 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
            ctx.shadowBlur = 0;
            ctx.fill();

            ctx.restore();
          }
        }
      }

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return {
      destroy: function () {
        if (animId) cancelAnimationFrame(animId);
        window.removeEventListener('resize', resize);
        window.removeEventListener('mouseup', onMouseUp);
        window.removeEventListener('touchend', onMouseUp);
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('mousedown', onMouseDown);
        canvas.removeEventListener('mouseleave', onMouseLeave);
        canvas.removeEventListener('touchmove', onTouchMove);
        canvas.removeEventListener('touchstart', onTouchStart);
      }
    };
  }

  return {
    init: initReactiveOrb
  };
}));
