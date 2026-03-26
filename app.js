document.addEventListener('DOMContentLoaded', () => {
    const blob = document.getElementById('cursor-blob');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        blob.style.left = `${x}px`;
        blob.style.top = `${y}px`;
        
        createParticle(x, y);
    });

    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        document.body.appendChild(particle);
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        const vX = (Math.random() - 0.5) * 2;
        const vY = (Math.random() - 0.5) * 2;
        
        let opacity = 0.8;
        let scale = 1;

        const animateParticle = () => {
            opacity -= 0.02;
            scale -= 0.01;
            
            const currentX = parseFloat(particle.style.left);
            const currentY = parseFloat(particle.style.top);
            
            particle.style.left = `${currentX + vX}px`;
            particle.style.top = `${currentY + vY}px`;
            particle.style.opacity = opacity;
            particle.style.transform = `scale(${scale})`;
            
            if (opacity > 0) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        };
        requestAnimationFrame(animateParticle);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
});
