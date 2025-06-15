
gsap.registerPlugin(ScrollTrigger);


gsap.utils.toArray(".slide-up").forEach(section => {
  gsap.from(section, {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });
});
