// Initialize GSAP animations with ScrollTrigger
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Animate elements with the "slide-up" class
gsap.utils.toArray(".slide-up").forEach(el => {
  gsap.fromTo(el,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play reverse play reverse", // animate on scroll in and out
        markers: false // 
      }
    }
  );
});

// Smooth anchor scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1 && document.querySelector(targetId)) {
      e.preventDefault();
      gsap.to(window, { duration: 0.9, scrollTo: targetId, ease: "power2.out" });
    }
  });
});

// Back to top button behavior
const backToTopButton = document.getElementById('backToTop');
if (backToTopButton) {
  const showBtn = () => {
    backToTopButton.classList.remove('opacity-0', 'pointer-events-none');
    backToTopButton.classList.add('opacity-100');
  };
  const hideBtn = () => {
    backToTopButton.classList.add('opacity-0', 'pointer-events-none');
    backToTopButton.classList.remove('opacity-100');
  };

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      showBtn();
    } else {
      hideBtn();
    }
  });

  backToTopButton.addEventListener('click', () => {
    gsap.to(window, { duration: 0.9, scrollTo: 0, ease: "power2.inOut" });
  });
}

// Fallback chat button handler
document.addEventListener('DOMContentLoaded', function() {
  const fallbackChat = document.getElementById('fallbackChat');
  if (fallbackChat) {
    fallbackChat.addEventListener('click', function() {
      window.open('https://ijpyvk7ggnzqoes2yww2nixu.agents.do-ai.run', '_blank');
    });
  }
});

