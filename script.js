window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.slide-up');
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.8) {
      section.style.animationPlayState = 'running';
    }
  });
});
