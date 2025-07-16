import { useState, useEffect, useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";

const useWindowSize = (delay = 150) => {
  const [size, setSize] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  }));
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;
    const handleResize = () => {
      if (document.visibilityState === "visible") {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setSize({ width: window.innerWidth, height: window.innerHeight });
        }, delay);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);

      clearTimeout(timeoutRef.current);
    };
  }, [delay]);

  return size;
};

export default useWindowSize;
