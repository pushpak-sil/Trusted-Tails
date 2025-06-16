// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true
});

// Animation frame loop + sync ScrollTrigger
function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update(); // Ensure GSAP animations stay in sync
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

document.querySelector("a[href='#contact']").addEventListener("click", (e) => {
  e.preventDefault();
  lenis.scrollTo("#contact");
});


// Animate elements with the "service-card" class
gsap.utils.toArray(".service-card").forEach((card, i) => {
  gsap.fromTo(card,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay: i * 0.1,
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none reverse",
      }
    }
  );
});
