import { useEffect } from "react";
import { ImArrowUp } from "react-icons/im";
import { useState } from "react";

const TopLink = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const handleBackToTop = (e) => {
    e.preventDefault();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    isVisible && (
      <a
        href="#top"
        aria-label="Back to the top page"
        onClick={handleBackToTop}
        className="fixed z-50 p-2 text-white/50 bottom-3 right-3 md:bottom-6 md:right-6 text-xl md:text-2xl cursor-pointer border-2 border-transparent rounded-full flex-center hover:border-yellow hover:text-yellow transition-colors duration-200 active:scale-[0.97]"
      >
        <ImArrowUp aria-hidden="true" />
      </a>
    )
  );
};

export default TopLink;
