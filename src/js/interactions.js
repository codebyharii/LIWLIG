// =================================================================
// LIWLIG — Micro-interactions Module
// =================================================================

export function initInteractions() {
    initMagneticButtons();
    initImageTilt();
    initCursorFollower();
}

// ── Magnetic hover effect for buttons ──
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ── 3D tilt effect on project cards ──
function initImageTilt() {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rotateX = (y - 0.5) * -10;
            const rotateY = (x - 0.5) * 10;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// ── Custom cursor follower ──
function initCursorFollower() {
    // Only on non-touch devices
    if ('ontouchstart' in window) return;

    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
    document.body.appendChild(cursor);

    const dot = cursor.querySelector('.cursor-dot');
    const ring = cursor.querySelector('.cursor-ring');

    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
    .cursor-follower { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; mix-blend-mode: difference; }
    .cursor-dot { width: 6px; height: 6px; background: #fff; border-radius: 50%; position: absolute; transform: translate(-50%, -50%); transition: transform 0.1s ease; }
    .cursor-ring { width: 40px; height: 40px; border: 1.5px solid rgba(255,255,255,0.5); border-radius: 50%; position: absolute; transform: translate(-50%, -50%); transition: all 0.15s ease-out; }
    a:hover ~ .cursor-follower .cursor-ring,
    button:hover ~ .cursor-follower .cursor-ring { transform: translate(-50%, -50%) scale(1.5); border-color: rgba(37,99,235,0.8); }
  `;
    document.head.appendChild(style);

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const lerp = (a, b, n) => a + (b - a) * n;

    function animateCursor() {
        dotX = lerp(dotX, mouseX, 0.9);
        dotY = lerp(dotY, mouseY, 0.9);
        ringX = lerp(ringX, mouseX, 0.15);
        ringY = lerp(ringY, mouseY, 0.15);

        dot.style.left = `${dotX}px`;
        dot.style.top = `${dotY}px`;
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Scale up on interactive elements
    document.querySelectorAll('a, button, .project-card, .service-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.style.transform = 'translate(-50%, -50%) scale(1.8)';
            ring.style.borderColor = 'rgba(37,99,235,0.6)';
        });
        el.addEventListener('mouseleave', () => {
            ring.style.transform = 'translate(-50%, -50%) scale(1)';
            ring.style.borderColor = 'rgba(255,255,255,0.5)';
        });
    });
}
