document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("particle-canvas");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
  
    // Set canvas dimensions
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
  
    // Initialize particles
    let particles = [];
    const particleCount = 80;
    const particleColors = [
      "#ffffff",
      "#87ddfe",
      "#acaaff",
      "#1bffc2",
      "#f88aff",
    ];
  
    function Particle() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 10 + 1;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.color =
        particleColors[Math.floor(Math.random() * particleColors.length)];
      this.shape = ["circle", "square", "triangle"][
        Math.floor(Math.random() * 3)
      ];
      this.opacity = Math.random() * 0.4;
    }
  
    Particle.prototype.update = function () {
      this.x += this.speedX;
      this.y += this.speedY;
  
      // Boundary check
      if (this.x > canvas.width || this.x < 0) {
        this.speedX = -this.speedX;
      }
  
      if (this.y > canvas.height || this.y < 0) {
        this.speedY = -this.speedY;
      }
    };
  
    Particle.prototype.draw = function () {
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
  
      if (this.shape === "circle") {
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      } else if (this.shape === "square") {
        ctx.rect(
          this.x - this.size,
          this.y - this.size,
          this.size * 2,
          this.size * 2
        );
      } else if (this.shape === "triangle") {
        const height = this.size * 1.732; // Approximate height of equilateral triangle
        ctx.moveTo(this.x, this.y - height / 2);
        ctx.lineTo(this.x - this.size, this.y + height / 2);
        ctx.lineTo(this.x + this.size, this.y + height / 2);
      }
  
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.globalAlpha = 1;
    };
  
    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
  
      requestAnimationFrame(animate);
    }
  
    // Initialize
    window.addEventListener("resize", function () {
      resizeCanvas();
      initParticles();
    });
  
    resizeCanvas();
    initParticles();
    animate();
  });