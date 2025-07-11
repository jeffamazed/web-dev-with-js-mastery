import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";

const useScrollTriggerRefresh = () => {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    window.addEventListener("orientationchange", refresh);
    return () => {
      window.removeEventListener("resize", refresh);
      window.removeEventListener("orientationchange", refresh);
    };
  }, []);
};

export default useScrollTriggerRefresh;
