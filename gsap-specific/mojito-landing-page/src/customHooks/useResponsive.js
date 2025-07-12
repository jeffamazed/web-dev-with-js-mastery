import { useEffect, useState } from "react";

const useResponsive = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    cocktailsHeight: 0,
  });

  useEffect(() => {
    const updateSize = () => {
      const cocktails = document.getElementById("cocktails");

      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
        cocktailsHeight: cocktails?.getBoundingClientRect().height || 0,
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};

export default useResponsive;
