document.addEventListener('DOMContentLoaded', () => {
  const scrollElements = document.querySelectorAll('[data-scroll]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  scrollElements.forEach(el => observer.observe(el));
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Handle missing exercise images with placeholder
  document.querySelectorAll('.exercise-img img').forEach(img => {
    img.onerror = function() {
      const exerciseName = this.alt || 'Exercise';
      const initials = exerciseName.split(' ').map(w => w[0]).join('').toUpperCase();
      this.style.display = 'none';
      this.parentElement.innerHTML = `
        <div style="
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          font-size: 48px;
          font-weight: 800;
          color: #f97316;
          opacity: 0.6;
        ">${initials}</div>
      `;
    };
  });
});
