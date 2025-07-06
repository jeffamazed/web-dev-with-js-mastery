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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    isVisible && (
      <a
        href="#top"
        aria-label="Back to the top page"
        onClick={handleBackToTop}
        className="fixed z-50 p-2 text-white/50 bottom-3 right-3 md:bottom-6 md:right-6 text-xl md:text-2xl cursor-pointer border-2 border-transparent rounded-full flex-center hover:border-yellow hover:text-yellow transition-colors duration-200 active:scale-[0.97]"
      >
        <ImArrowUp />
      </a>
    )
  );
};

export default TopLink;
