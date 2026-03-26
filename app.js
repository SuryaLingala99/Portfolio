document.addEventListener('DOMContentLoaded', () => {
    const blob = document.getElementById('cursor-blob');
    
    // Smooth blob movement
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        // Update large glow blob
        blob.style.left = `${x}px`;
        blob.style.top = `${y}px`;
        
        // Create neon particle trail
        createParticle(x, y);
    });

    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        document.body.appendChild(particle);
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Random drift
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

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
});
