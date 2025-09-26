import { useEffect, useState } from "react";
import { ImArrowUp } from "react-icons/im";

const TopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const toggleVisible = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 500);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const handleBackToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleBackToTop}
      aria-label="Back to the top page"
      className="fixed z-50 p-2 text-white/50 bottom-3 right-3 md:bottom-6 md:right-6 text-xl md:text-2xl cursor-pointer border-2 border-transparent rounded-full flex-center hover:border-yellow hover:text-yellow transition-colors duration-200 active:scale-[0.97]"
    >
      <ImArrowUp aria-hidden="true" />
    </button>
  );
};

export default TopButton;
