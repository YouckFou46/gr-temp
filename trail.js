document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('trail-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let particles = [];

    document.addEventListener('mousemove', function(event) {
        particles.push({
            x: event.clientX,
            y: event.clientY,
            life: 200 
        });
    });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            const alpha = p.life / 100;

            ctx.beginPath();
            ctx.arc(p.x, p.y, 50, 0, Math.PI * 2);
            ctx.fillStyle = `rgb(255, 0, 144)`;
            ctx.shadowColor = 'rgb(255, 0, 144)';
            // ctx.fillStyle = `#fff`;
            // ctx.shadowColor = '#fff';
            ctx.shadowBlur = 3 * alpha; 
            ctx.fill();

            p.life--; // Lebensdauer verkürzen
        }

        // Entferne tote Partikel
        particles = particles.filter(p => p.life > 0);

        requestAnimationFrame(draw);
    }

    draw();
});