const handleScrollIntoView = (e, navRef, sectionRef) => {
  const section = sectionRef.current;
  const nav = navRef.current;
  if (!section || !nav) return;
  e.preventDefault();
  const navHeight = nav.getBoundingClientRect().height;
  const sectionTop = section.getBoundingClientRect().top + scrollY;

  window.scrollTo({ top: sectionTop - navHeight, behavior: "smooth" });
};

export default handleScrollIntoView;
