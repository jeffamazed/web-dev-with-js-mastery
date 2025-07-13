import { useEffect, useState, useRef } from "react";

const useResponsive = (delay = 150) => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    cocktailsHeight: 0,
  });
  const timeoutRef = useRef(null);

  useEffect(() => {
    const updateSize = () => {
      const cocktails = document.getElementById("cocktails");

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
          cocktailsHeight: cocktails?.getBoundingClientRect().height || 0,
        });
      }, delay);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return size;
};

export default useResponsive;
