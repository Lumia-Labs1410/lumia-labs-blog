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
      
      // FAQ Accordion
      const faqItems = document.querySelectorAll('.faq-item');
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
          // Close all other items
          faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
              otherItem.classList.remove('active');
            }
          });
          
          // Toggle current item
          item.classList.toggle('active');
        });
      });
      
      // Contact Form Submission
      const contactForm = document.getElementById('contactForm');
      if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form values
          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          const subject = document.getElementById('subject').value;
          const message = document.getElementById('message').value;
          
          // In a real application, you would send this data to your server
          console.log('Form submitted:', { name, email, subject, message });
          
          // Show success message
          const submitBtn = this.querySelector('button[type="submit"]');
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'Message Sent!';
          submitBtn.style.backgroundColor = '#4CAF50';
          
          // Reset form
          this.reset();
          
          // Reset button after 3 seconds
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
          }, 3000);
        });
      }
      
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