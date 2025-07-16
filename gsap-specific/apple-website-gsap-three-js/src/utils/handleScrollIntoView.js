const handleScrollIntoView = (e, navRef, sectionRef) => {
  const highlights = sectionRef.current;
  const nav = navRef.current;
  if (!highlights || !nav) return;
  e.preventDefault();
  const navHeight = nav.getBoundingClientRect().height;
  const highlightsTop = highlights.getBoundingClientRect().top + scrollY;

  window.scrollTo({ top: highlightsTop - navHeight, behavior: "smooth" });
};

export default handleScrollIntoView;
