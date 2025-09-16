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

// Check if Gradient AI widget loaded and hide fallback if it did
document.addEventListener('DOMContentLoaded', function() {
  const fallbackChat = document.getElementById('fallbackChat');
  
  // Check if the official widget loaded after a delay
  setTimeout(() => {
    const gradientWidget = document.querySelector('[data-agent-id="d48d2994-933a-11f0-b074-4e013e2ddde4"]') || 
                          document.querySelector('.gradient-chatbot') ||
                          document.querySelector('[class*="chatbot"]');
    
    if (gradientWidget) {
      console.log('Gradient AI widget detected, hiding fallback button');
      if (fallbackChat) fallbackChat.style.display = 'none';
    } else {
      console.log('Gradient AI widget not detected, keeping fallback button');
    }
  }, 3000); // Wait 3 seconds for widget to load
  
  if (fallbackChat) {
    fallbackChat.addEventListener('click', function() {
      // Try different possible chatbot URLs
      const possibleUrls = [
        'https://ijpyvk7ggnzqoes2yww2nixu.agents.do-ai.run/chat',
        'https://ijpyvk7ggnzqoes2yww2nixu.agents.do-ai.run/agent',
        'https://ijpyvk7ggnzqoes2yww2nixu.agents.do-ai.run/widget',
        'https://ijpyvk7ggnzqoes2yww2nixu.agents.do-ai.run'
      ];
      
      // Open the first URL (most likely to be the chat interface)
      window.open(possibleUrls[0], '_blank');
    });
  }
});

