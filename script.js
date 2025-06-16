// Initialize GSAP animations with ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animate elements with the "slide-up" class
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
        toggleActions: "play reverse play reverse",
        once: false,
        markers: false
      }
    }
  );
});
