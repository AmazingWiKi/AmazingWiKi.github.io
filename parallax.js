/* ============================================
   PARALLAX SYSTEM
   ============================================ */

(function() {
    const layers = document.querySelectorAll('.parallax-layer');
    if (!layers.length) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
        mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    });

    function animate() {
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;

        layers.forEach(layer => {
            const speed = parseFloat(layer.dataset.speed) || 0.5;
            const moveX = currentX * speed * 50;
            const moveY = currentY * speed * 50;
            layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        requestAnimationFrame(animate);
    }

    animate();
})();
