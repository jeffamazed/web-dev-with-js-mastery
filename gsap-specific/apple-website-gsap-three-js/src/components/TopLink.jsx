import { useEffect, useRef, useState } from "react";
import { BiSolidArrowToTop } from "react-icons/bi";

const TopLink = () => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleVisible = () => {
      const shouldBeVsibile = window.scrollY > 500;
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setVisible((prev) =>
          prev !== shouldBeVsibile ? shouldBeVsibile : prev,
        );
      }, 100);
    };

    window.addEventListener("scroll", handleVisible);

    return () => {
      window.removeEventListener("scroll", handleVisible);
      clearTimeout(timeoutRef.current);
    };
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
    visible && (
      <a
        href="#top"
        className="fixed z-50 bottom-5 right-5 text-2xl text-custom-white bg-white/5 p-2 rounded-full hover:bg-white/15 focus-visible:bg-white/15"
        aria-label="Back to Top"
        onClick={(e) => handleBackToTop(e)}
      >
        <BiSolidArrowToTop />
      </a>
    )
  );
};

export default TopLink;
