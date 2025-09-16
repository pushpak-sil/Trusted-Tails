// Initialize GSAP animations with ScrollTrigger
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Performance optimization: Check if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Enhanced scroll animations
if (!prefersReducedMotion) {
  // Animate elements with the "slide-up" class
  gsap.utils.toArray(".slide-up").forEach(el => {
    gsap.fromTo(el,
      { y: 100, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
          markers: false
        }
      }
    );
  });

  // Staggered animation for service cards
  gsap.utils.toArray("#services article").forEach((card, index) => {
    gsap.fromTo(card,
      { y: 80, opacity: 0, rotationY: 15 },
      {
        y: 0,
        opacity: 1,
        rotationY: 0,
        duration: 1,
        delay: index * 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play reverse play reverse"
        }
      }
    );
  });

  // Staggered animation for testimonials
  gsap.utils.toArray("#testimonials article").forEach((testimonial, index) => {
    gsap.fromTo(testimonial,
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: index * 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: testimonial,
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        }
      }
    );
  });

  // Parallax effect for hero background
  gsap.to("#home", {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: "#home",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  // Header background animation on scroll
  gsap.to("header", {
    backgroundColor: "rgba(13, 148, 136, 0.95)",
    backdropFilter: "blur(10px)",
    duration: 0.3,
    scrollTrigger: {
      trigger: "body",
      start: "100px top",
      end: "200px top",
      toggleActions: "play reverse play reverse"
    }
  });

  // Text reveal animation for headings
  gsap.utils.toArray("h2").forEach(heading => {
    const text = heading.textContent;
    heading.innerHTML = text.split('').map(char => 
      char === ' ' ? ' ' : `<span style="display: inline-block;">${char}</span>`
    ).join('');
    
    gsap.fromTo(heading.querySelectorAll('span'),
      { y: 100, opacity: 0, rotationX: -90 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
          toggleActions: "play reverse play reverse"
        }
      }
    );
  });

  // Floating animation for buttons
  gsap.utils.toArray("button, .btn").forEach(btn => {
    gsap.to(btn, {
      y: -5,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
  });

  // Image hover animations
  gsap.utils.toArray("img").forEach(img => {
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.05, duration: 0.3, ease: "power2.out" });
    });
    
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
  });

  // Progress bar animation
  gsap.to(".progress-bar", {
    scaleX: 1,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".progress-bar",
      start: "top 80%",
      toggleActions: "play reverse play reverse"
    }
  });

} else {
  // For users who prefer reduced motion, just show elements
  gsap.utils.toArray(".slide-up").forEach(el => {
    gsap.set(el, { opacity: 1, y: 0, scale: 1 });
  });
  
  gsap.utils.toArray("h2").forEach(heading => {
    gsap.set(heading, { opacity: 1 });
  });
}

// Enhanced smooth anchor scrolling with performance optimization
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1 && document.querySelector(targetId)) {
      e.preventDefault();
      
      // Add visual feedback
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
      
      // Use native smooth scrolling for better performance on mobile
      if (prefersReducedMotion || window.innerWidth < 768) {
        document.querySelector(targetId).scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        // Enhanced GSAP scrolling with offset for header
        const headerHeight = document.querySelector('header').offsetHeight;
        gsap.to(window, { 
          duration: 1.2, 
          scrollTo: { 
            y: targetId, 
            offsetY: headerHeight + 20 
          }, 
          ease: "power3.inOut" 
        });
      }
    }
  });
});

// Add scroll progress indicator
if (!prefersReducedMotion) {
  // Create progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'fixed top-0 left-0 w-full h-1 bg-teal-600 z-50 origin-left';
  progressBar.style.transform = 'scaleX(0)';
  document.body.appendChild(progressBar);
  
  // Animate progress bar on scroll
  gsap.to(progressBar, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: true
    }
  });
}

// Add scroll-triggered animations for navigation
if (!prefersReducedMotion) {
  gsap.utils.toArray('nav a').forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, { 
        scale: 1.1, 
        duration: 0.3, 
        ease: "back.out(1.7)" 
      });
    });
    
    link.addEventListener('mouseleave', () => {
      gsap.to(link, { 
        scale: 1, 
        duration: 0.3, 
        ease: "power2.out" 
      });
    });
  });
}

// Back to top button behavior with throttling for performance
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
    if (prefersReducedMotion || window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      gsap.to(window, { duration: 0.9, scrollTo: 0, ease: "power2.inOut" });
    }
  });
}

// Chat button handler - opens chatbot in popup window
document.addEventListener('DOMContentLoaded', function() {
  const chatButton = document.getElementById('chatButton');
  
  // Check if the official widget loaded after a delay
  setTimeout(() => {
    const gradientWidget = document.querySelector('[data-agent-id="d48d2994-933a-11f0-b074-4e013e2ddde4"]') || 
                          document.querySelector('.gradient-chatbot') ||
                          document.querySelector('[class*="chatbot"]');
    
    if (gradientWidget) {
      console.log('Gradient AI widget detected, keeping chat button hidden');
      // Keep button hidden since official widget is working
    } else {
      console.log('Gradient AI widget not detected, showing fallback chat button');
      // Show the fallback button since official widget didn't load
      if (chatButton) chatButton.style.display = 'block';
    }
  }, 3000); // Wait 3 seconds for widget to load
  
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
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
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

// Enhanced scroll performance and additional animations
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling to the body
  document.body.classList.add('smooth-scroll');
  
  // Enhanced scroll-triggered animations
  if (!prefersReducedMotion) {
    // Counter animation for statistics (if you add them later)
    gsap.utils.toArray('.counter').forEach(counter => {
      const target = parseInt(counter.textContent);
      gsap.fromTo(counter, 
        { textContent: 0 },
        {
          textContent: target,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: counter,
            start: "top 80%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    });
    
    // Enhanced button interactions
    gsap.utils.toArray('.btn-animated').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { 
          scale: 1.05, 
          duration: 0.3, 
          ease: "back.out(1.7)" 
        });
      });
      
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { 
          scale: 1, 
          duration: 0.3, 
          ease: "power2.out" 
        });
      });
    });
    
    // Enhanced card interactions
    gsap.utils.toArray('.card-enhanced').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { 
          rotationY: 5, 
          rotationX: 5, 
          duration: 0.6, 
          ease: "power2.out" 
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { 
          rotationY: 0, 
          rotationX: 0, 
          duration: 0.6, 
          ease: "power2.out" 
        });
      });
    });
  }
  
  // Add scroll-based header transparency
  let lastScrollY = window.scrollY;
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
    
    lastScrollY = currentScrollY;
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
    // Refresh ScrollTrigger on resize
    ScrollTrigger.refresh();
  }, 250);
});

