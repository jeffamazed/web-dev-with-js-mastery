import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const TopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => setVisible(window.pageYOffset > 800);

    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <button
        className="fixed bottom-[30px] right-[30px] xl:bottom-[50px] xl:right-[50px] xl:text-2xl text-xl text-coral-red border-3 border-coral-red p-2 rounded-full cursor-pointer z-50 hover:scale-105 duration-200 transition-transform"
        type="button"
        aria-label="Back to top"
        onClick={scrollToTop}
      >
        <FaArrowUp />
      </button>
    )
  );
};

export default TopButton;
