import { useState, useEffect } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
      ScrollTrigger.refresh();
    };
    window.addEventListener("orientationchange", handleResize);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return size;
};

export default useWindowSize;
