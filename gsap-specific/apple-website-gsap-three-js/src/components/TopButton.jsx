import { useEffect, useState } from "react";
import { BiSolidArrowToTop } from "react-icons/bi";

const TopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldBeVisible = window.scrollY > 500;
          setVisible((prev) =>
            prev !== shouldBeVisible ? shouldBeVisible : prev,
          );
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  if (!visible) return null;

  return (
    <button
      className="fixed z-50 bottom-5 right-5 text-2xl text-custom-white bg-white/5 p-2 rounded-full hover:bg-white/15 focus-visible:bg-white/15 cursor-pointer"
      aria-label="Back to Top"
      onClick={handleBackToTop}
    >
      <BiSolidArrowToTop />
    </button>
  );
};

export default TopButton;
