const handleScrollIntoView = (e, navRef, sectionRef) => {
  const section = sectionRef.current;
  const nav = navRef.current;
  if (!section || !nav) return;

  e.preventDefault();

  const navHeight = nav.getBoundingClientRect().height;
  const sectionTop = section.getBoundingClientRect().top + window.scrollY;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  window.scrollTo({
    top: sectionTop - navHeight,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
};

export default handleScrollIntoView;
