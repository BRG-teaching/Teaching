// Empty 3D view for the terminal viewer: a ground grid in perspective with x/y/z axes,
// orbit by dragging, zoom with the wheel. Plain canvas 2D, no libraries.
window.mountGrid3d = function (canvas) {
  const ctx = canvas.getContext('2d');
  const cam = { yaw: -0.75, pitch: 0.55, dist: 26 };
  const N = 10;                       // grid half-size in cells
  let dpr = 1, w = 0, h = 0, raf = 0;

  function resize() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    const r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    draw();
  }

  // world (x, y, z with z up) -> screen
  function project(x, y, z) {
    const cy = Math.cos(cam.yaw), sy = Math.sin(cam.yaw), cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
    const rx = cy * x - sy * y, ry = sy * x + cy * y;          // yaw about z
    const vx = rx, vy = cp * z - sp * ry, vz = sp * z + cp * ry; // pitch about x
    const depth = cam.dist - vz;
    if (depth < 0.5) return null;
    const f = Math.min(w, h) * 1.1 / depth;
    return [w / 2 + vx * f, h * 0.56 - vy * f];
  }

  function line(a, b, color, width) {
    const p = project(...a), q = project(...b);
    if (!p || !q) return;
    ctx.strokeStyle = color; ctx.lineWidth = width;
    ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke();
  }

  function draw() {
    raf = 0;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h);
    for (let i = -N; i <= N; i++) {
      const major = i % 5 === 0;
      const c = major ? '#c9c6d6' : '#e6e4ee', lw = major ? 1.1 : 0.8;
      if (i !== 0) { line([i, -N, 0], [i, N, 0], c, lw); line([-N, i, 0], [N, i, 0], c, lw); }
    }
    line([-N, 0, 0], [0, 0, 0], '#c9c6d6', 1.1); line([0, -N, 0], [0, 0, 0], '#c9c6d6', 1.1);
    line([0, 0, 0], [N, 0, 0], '#d4486a', 1.6);   // x
    line([0, 0, 0], [0, N, 0], '#3f9c20', 1.6);   // y
    line([0, 0, 0], [0, 0, 4], '#3057b1', 1.6);   // z
  }
  const redraw = () => { if (!raf) raf = requestAnimationFrame(draw); };

  let drag = null;
  canvas.addEventListener('pointerdown', (e) => { drag = { x: e.clientX, y: e.clientY }; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', (e) => {
    if (!drag) return;
    cam.yaw -= (e.clientX - drag.x) * 0.008;
    cam.pitch = Math.max(0.05, Math.min(1.5, cam.pitch + (e.clientY - drag.y) * 0.006));
    drag = { x: e.clientX, y: e.clientY }; redraw();
  });
  const end = () => { drag = null; };
  canvas.addEventListener('pointerup', end); canvas.addEventListener('pointercancel', end);
  canvas.addEventListener('wheel', (e) => { e.preventDefault(); cam.dist = Math.max(8, Math.min(80, cam.dist * Math.exp(e.deltaY * 0.001))); redraw(); }, { passive: false });
  canvas.addEventListener('dblclick', () => { Object.assign(cam, { yaw: -0.75, pitch: 0.55, dist: 26 }); redraw(); });

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();
  return () => { ro.disconnect(); if (raf) cancelAnimationFrame(raf); };
};
