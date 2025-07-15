 // Mobile Menu Toggle
    document.addEventListener('DOMContentLoaded', function() {
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
      const navLinks = document.querySelector('.nav-links');
      
      mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.setAttribute('aria-expanded', navLinks.classList.contains('active'));
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', function(event) {
        if (!navLinks.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
          navLinks.classList.remove('active');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 100,
              behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
          }
        });
      });
    });