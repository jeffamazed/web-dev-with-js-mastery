import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants/index";
import gsap from "gsap";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { CiRedo } from "react-icons/ci";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const VideoCarousel = ({ responsive }) => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  const [loadedData, setLoadedData] = useState([]);
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const progressBarWidth = isMobile ? "2rem" : "3rem";

  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useGSAP(
    () => {
      const videos = videoRef.current;
      const track = trackRef.current;
      if (!videos || !videos.length || !track) return;
      const toKill = [track, videos];
      ScrollTrigger.getById("videos-trigger")?.kill();
      gsap.killTweensOf(toKill);

      gsap.to(videos, {
        scrollTrigger: {
          id: "videos-trigger",
          trigger: videos,
          toggleActions: "restart none none none",
        },
        onComplete: () => {
          setVideo((prev) => ({
            ...prev,
            startPlay: true,
            isPlaying: true,
          }));
        },
      });

      const totalSlides = hightlightsSlides.length;
      const translateAmount = (-100 / totalSlides) * videoId;

      gsap.to(track, {
        transform: `translateX(${translateAmount}%)`,
        duration: 2,
        ease: "power4.out",
      });
    },
    { scope: sectionRef, dependencies: [isEnd, videoId, responsive] }
  );

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleCanPlayThrough = (e) => setLoadedData((prev) => [...prev, e]);

  // animate the progress of the video
  useEffect(() => {
    const span = videoSpanRef.current[videoId];
    const videoDiv = videoDivRef.current[videoId];
    const video = videoRef.current[videoId];
    if (!span || !videoDiv || !video) return;

    const anim = gsap.to(span, {
      onUpdate: () => {
        const progress = anim.progress() * 100;

        // use 98 to avoid glitching when video is about to end
        if (progress < 98 && isPlaying) {
          gsap.to(videoDiv, {
            width: progressBarWidth,
          });

          gsap.to(span, {
            width: `${progress}%`,
            backgroundColor: "white",
          });
        }
      },
      onComplete: () => {
        if (isPlaying) {
          gsap.to(videoDiv, {
            width: "0.75rem",
          });
          gsap.to(span, {
            backgroundColor: "transparent",
            width: "0%",
          });
        }
      },
    });

    // forcing anim so stay fresh on start
    if (videoId === 0) {
      anim.restart();
    }

    const animUpdate = () => {
      const currentTime = video.currentTime;
      const totalTime = hightlightsSlides[videoId].videoDuration;

      if (totalTime > 0) {
        anim.progress(Math.min(currentTime / totalTime, 1));
      }
    };

    if (isPlaying) gsap.ticker.add(animUpdate);
    else gsap.ticker.remove(animUpdate);

    if (isLastVideo) {
      setTimeout(() => {
        gsap.ticker.remove(animUpdate);
      }, 100);
    }

    // handle pausing the video when tab is out of focus
    const handleVisibilityChange = () => {
      if (!isLastVideo) {
        if (document.visibilityState === "visible") video.play();
        else video.pause();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      gsap.ticker.remove(animUpdate);
      anim.kill();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [videoId, startPlay, isPlaying, progressBarWidth, isLastVideo]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((prev) => ({ ...prev, isEnd: true, videoId: i + 1 }));
        break;
      case "video-last":
        setVideo((prev) => ({ ...prev, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((prev) => ({ ...prev, isLastVideo: false, videoId: 0 }));
        break;
      case "play":
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
      case "pause":
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
      default:
        return video;
    }
  };

  return (
    <>
      <section ref={sectionRef}>
        {/* for sr users */}
        <h3 className="sr-only">iPhone Video Carousel</h3>
        <div className="flex items-center w-fit" ref={trackRef}>
          {hightlightsSlides.map((list, i) => (
            <article key={list.id} className="sm:pr-20 pr-10">
              <div className="video-carousel_container">
                <div className="size-full flex-center rounded-3xl overflow-hidden bg-black">
                  <video
                    className={`pointer-events-none ${
                      list.id === 2 &&
                      "translate-x-10 sm:translate-x-20 md:translate-x-30"
                    }`}
                    playsInline
                    tabIndex={-1}
                    preload="auto"
                    muted
                    ref={(el) => (videoRef.current[i] = el)}
                    onPlay={() =>
                      setVideo((prev) => ({
                        ...prev,
                        isPlaying: true,
                      }))
                    }
                    onCanPlayThrough={handleCanPlayThrough}
                    onEnded={() =>
                      i !== 3
                        ? handleProcess("video-end", i)
                        : handleProcess("video-last")
                    }
                  >
                    <source src={list.video} type="video/mp4" />
                  </video>
                </div>

                <div className="absolute top-[10%] left-[5%] z-10">
                  {list.textLists.map((text) => (
                    <p
                      key={text}
                      className="md:text-base xl:text-lg text-sm font-medium"
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* progress bars */}
      <div className="relative flex-center mt-10 gap-6">
        <div
          className={`flex items-center justify-evenly py-3 bg-gray-300 backdrop-blur-xs rounded-full h-full ${
            isMobile ? "w-[10rem]" : "w-[14rem]"
          }`}
        >
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className="w-3 h-3 bg-gray-200 rounded-full relative"
            >
              <span
                className="absolute size-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>

        {/* for sr users */}
        <div className="sr-only" aria-live="polite">
          Showing feature {videoId + 1} of {hightlightsSlides.length}
        </div>

        <div
          role="group"
          aria-label="Video playback controls"
          className="bg-gray-300 rounded-full p-2 flex-center"
        >
          <button
            type="button"
            className="control-btn"
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
            aria-label={isLastVideo ? "Replay" : !isPlaying ? "Play" : "Pause"}
          >
            {isLastVideo ? (
              <CiRedo aria-hidden="true" />
            ) : !isPlaying ? (
              <CiPlay1 aria-hidden="true" />
            ) : (
              <CiPause1 aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default VideoCarousel;
