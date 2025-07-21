import { useEffect } from "react";

const useVisibilityChange = (videosRef) => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      videosRef.forEach((videoRef) => {
        const video = videoRef.current;
        if (!video) return;

        if (document.visibilityState === "visible") {
          if (video.paused && !video.ended) video.play();
        } else {
          if (!video.paused) video.pause();
        }
      });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [videosRef]);
};

export default useVisibilityChange;
