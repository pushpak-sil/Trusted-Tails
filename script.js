// Simple smooth scrolling functionality without complex animations
// Performance optimization: Check if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Ensure DOM is loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing scripts...');
  
  // Hide loading indicator
  const loadingIndicator = document.getElementById('loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.style.display = 'none';
  }
  
  // Check if external dependencies loaded
  if (typeof window.grecaptcha === 'undefined') {
    console.warn('reCAPTCHA not loaded - form may not work properly');
    // Show fallback message
    const recaptchaFallback = document.getElementById('recaptcha-fallback');
    if (recaptchaFallback) {
      recaptchaFallback.classList.remove('hidden');
    }
  }
  
  // Check if Tailwind CSS loaded
  if (!document.querySelector('style[data-tailwind]') && !window.tailwind) {
    console.warn('Tailwind CSS may not be loaded properly');
  }
});

// Show loading indicator on page load
window.addEventListener('load', function() {
  const loadingIndicator = document.getElementById('loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.style.display = 'none';
  }
});

// Simple smooth anchor scrolling
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1 && document.querySelector(targetId)) {
        e.preventDefault();
        
        // Use native smooth scrolling for all devices
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetElement = document.querySelector(targetId);
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Simple scroll progress indicator
document.addEventListener('DOMContentLoaded', function() {
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.transform = `scaleX(${scrollPercent / 100})`;
    });
  }
});

// Simple navigation hover effects (removed complex animations)

// Back to top button behavior with throttling for performance
document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.getElementById('backToTop');
  if (backToTopButton) {
    let ticking = false;
    
    const showBtn = () => {
      backToTopButton.classList.remove('opacity-0', 'pointer-events-none');
      backToTopButton.classList.add('opacity-100');
    };
    
    const hideBtn = () => {
      backToTopButton.classList.add('opacity-0', 'pointer-events-none');
      backToTopButton.classList.remove('opacity-100');
    };

    const updateButton = () => {
      if (window.scrollY > 400) {
        showBtn();
      } else {
        hideBtn();
      }
      ticking = false;
    };

    // Throttled scroll event for better performance
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateButton);
        ticking = true;
      }
    });

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// Chat button handler - opens chatbot in popup window
document.addEventListener('DOMContentLoaded', function() {
  const chatButton = document.getElementById('chatButton');
  
  // Check if the official widget loaded after a delay
  setTimeout(() => {
    const gradientWidget = document.querySelector('[data-agent-id="d48d2994-933a-11f0-b074-4e013e2ddde4"]') || 
                          document.querySelector('.gradient-chatbot') ||
                          document.querySelector('[class*="chatbot"]') ||
                          document.querySelector('iframe[src*="agents.do-ai.run"]');
    
    if (gradientWidget) {
      console.log('Gradient AI widget detected, keeping chat button hidden');
      // Keep button hidden since official widget is working
    } else {
      console.log('Gradient AI widget not detected, showing fallback chat button');
      // Show the fallback button since official widget didn't load
      if (chatButton) {
        chatButton.style.display = 'block';
        chatButton.style.position = 'fixed';
        chatButton.style.right = '1rem';
        chatButton.style.bottom = '5rem';
        chatButton.style.zIndex = '50';
      }
    }
  }, 5000); // Wait 5 seconds for widget to load
  
  if (chatButton) {
    chatButton.addEventListener('click', function() {
      // Open chatbot in a popup window instead of new tab
      const popup = window.open(
        'https://ijpyvk7ggnzqoes2yww2nixu.agents.do-ai.run/chat',
        'chatbot',
        'width=400,height=600,scrollbars=yes,resizable=yes,menubar=no,toolbar=no,location=no,status=no'
      );
      
      // Focus the popup window
      if (popup) {
        popup.focus();
      }
    });
  }
});

// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic form validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
      }
      
      // Check reCAPTCHA if available
      if (typeof grecaptcha !== 'undefined' && grecaptcha.getResponse().length === 0) {
        showMessage('Please complete the reCAPTCHA verification.', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
      }
      
      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Submit form
      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          showMessage('Thank you! Your message has been sent successfully.', 'success');
          contactForm.reset();
          // Reset reCAPTCHA if present
          if (typeof grecaptcha !== 'undefined') {
            grecaptcha.reset();
          }
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        console.error('Form submission error:', error);
        showMessage('Sorry, there was an error sending your message. Please try again or contact us directly at chakrabortydebayan073@gmail.com', 'error');
      })
      .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    });
  }
  
  function showMessage(text, type) {
    if (formMessage) {
      formMessage.textContent = text;
      formMessage.className = `text-center mt-4 font-semibold ${type === 'success' ? 'text-green-600' : 'text-red-600'}`;
      formMessage.classList.remove('hidden');
      
      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.classList.add('hidden');
      }, 5000);
    }
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
  const nav = document.querySelector('nav');
  if (nav) {
    nav.classList.toggle('mobile-open');
  }
}

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      imageObserver.observe(img);
    });
  }
});

// Simple scroll performance optimization
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling to the body
  document.body.classList.add('smooth-scroll');
  
  // Simple scroll-based header transparency
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const header = document.querySelector('header');
    
    if (currentScrollY > 100) {
      header.style.backgroundColor = 'rgba(13, 148, 136, 0.95)';
      header.style.backdropFilter = 'blur(10px)';
    } else {
      header.style.backgroundColor = 'rgb(13, 148, 136)';
      header.style.backdropFilter = 'none';
    }
  });
  
  // Add momentum scrolling for mobile
  if (window.innerWidth < 768) {
    document.body.style.webkitOverflowScrolling = 'touch';
  }
});

// Performance optimization: Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Simple resize handling without GSAP dependencies
    console.log('Window resized');
  }, 250);
});

