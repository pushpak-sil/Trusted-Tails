// Initialize GSAP animations with ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

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
