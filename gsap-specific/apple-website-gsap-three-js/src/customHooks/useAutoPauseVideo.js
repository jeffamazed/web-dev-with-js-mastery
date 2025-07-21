import { useEffect } from "react";

const useAutoPauseVideo = ({ videoRefs, threshold = 0.5, responsive }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (!(video instanceof HTMLVideoElement)) return;

          if (entry.isIntersecting) {
            if (video.paused && !video.ended) {
              video.play().catch(() => {});
            }
          } else {
            if (!video.paused) {
              video.pause();
            }
          }
        });
      },
      { threshold }
    );

    const validVideos = videoRefs
      .map((ref) => ref.current)
      .filter((video) => video instanceof HTMLVideoElement);

    validVideos.forEach((video) => observer.observe(video));

    return () => {
      validVideos.forEach((video) => observer.unobserve(video));
      observer.disconnect();
    };
  }, [videoRefs, threshold, responsive]);
};

export default useAutoPauseVideo;
