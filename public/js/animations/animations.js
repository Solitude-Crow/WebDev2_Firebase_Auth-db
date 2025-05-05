// Animations for our pages
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-ripple');
    
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        button.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
    
    // Animate form elements
    const formElements = document.querySelectorAll('.form-animate');
    
    formElements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        element.style.transition = 'all 0.5s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 100 * (index + 1));
    });
    
    // Add floating animation to form container
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
      let floatingAnimation;
      
      const startFloating = () => {
        let posY = 0;
        let direction = 1;
        
        floatingAnimation = setInterval(() => {
          if (posY > 5) direction = -1;
          if (posY < 0) direction = 1;
          
          posY += 0.1 * direction;
          formContainer.style.transform = `translateY(${posY}px)`;
        }, 50);
      };
      
      const stopFloating = () => {
        clearInterval(floatingAnimation);
        formContainer.style.transform = 'translateY(0)';
      };
      
      // Start floating animation after 2 seconds
      setTimeout(startFloating, 2000);
      
      // Stop animation on focus to avoid distraction
      const inputs = formContainer.querySelectorAll('input');
      inputs.forEach(input => {
        input.addEventListener('focus', stopFloating);
        input.addEventListener('blur', startFloating);
      });
    }
    
    // Add particles background (simple version)
    const particlesContainer = document.querySelector('.particles-bg');
    if (particlesContainer) {
      for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
      }
    }
  });
  
  function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Random size
    const size = Math.random() * 10 + 2;
    
    // Random opacity
    const opacity = Math.random() * 0.5 + 0.1;
    
    // Random animation duration
    const duration = Math.random() * 20 + 10;
    
    particle.style.cssText = `
      position: absolute;
      left: ${posX}%;
      top: ${posY}%;
      width: ${size}px;
      height: ${size}px;
      background: rgba(255, 255, 255, ${opacity});
      border-radius: 50%;
      pointer-events: none;
      animation: float ${duration}s infinite ease-in-out;
    `;
    
    container.appendChild(particle);
    
    // Random movement
    setInterval(() => {
      const newPosX = Math.random() * 100;
      const newPosY = Math.random() * 100;
      
      particle.style.transition = 'all 10s ease-in-out';
      particle.style.left = `${newPosX}%`;
      particle.style.top = `${newPosY}%`;
    }, duration * 1000);
  }