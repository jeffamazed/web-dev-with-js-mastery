import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const TopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const toggleVisible = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(window.pageYOffset > 500);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-[30px] right-[30px] xl:bottom-[50px] xl:right-[50px] xl:text-2xl text-xl text-coral-red border-3 border-coral-red p-2 rounded-full cursor-pointer z-50 hover:scale-105 duration-200 transition-transform"
    >
      <FaArrowUp aria-hidden="true" />
    </button>
  );
};

export default TopButton;
