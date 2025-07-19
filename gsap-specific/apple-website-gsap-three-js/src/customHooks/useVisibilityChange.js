import { useEffect } from "react";

const useVisibilityChange = (videosRef) => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      videosRef.forEach((videoRef) => {
        const video = videoRef.current;

        if (video) {
          if (document.visibilityState === "visible") video.play();
          else video.pause();
        }
      });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [videosRef]);
};

export default useVisibilityChange;
