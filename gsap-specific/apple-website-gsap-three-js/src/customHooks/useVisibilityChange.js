import { useEffect } from "react";

const useVisibilityChange = (video) => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") video.play();
      else video.pause();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [video]);
};

export default useVisibilityChange;
