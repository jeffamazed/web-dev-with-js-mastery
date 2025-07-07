import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const totalVideoElUsed = 3;
  const nextVideoRef = useRef(null);
  const currentVideoRef = useRef(null);
  const videoFrameRef = useRef(null);
  const bgVideoRef = useRef(null);
  const btnParentRef = useRef(null);
  const heroRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  useEffect(() => {
    if (loadedVideos === totalVideoElUsed) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set(nextVideoRef.current, { visibility: "visible" });
        gsap.to(nextVideoRef.current, {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current.play(),
          onComplete: () => bgVideoRef.current.pause(),
        });

        gsap.from(currentVideoRef.current, {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      scope: heroRef,
      dependencies: [currentIndex, hasClicked],
      revertOnUpdate: true,
    }
  );

  useGSAP(
    () => {
      gsap.set(videoFrameRef.current, {
        clipPath: "polygon(0 0, 80% 0%, 93% 88%, 4% 97%)",
        borderRadius: "0 0 40% 18%",
      });

      gsap.from(videoFrameRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: "0 0 0 0",
        scrollTrigger: {
          trigger: videoFrameRef.current,
          start: "10% top",
          end: "bottom center",
          scrub: true,
        },
      });
    },
    {
      scope: heroRef,
      dependencies: [],
    }
  );

  return (
    <section
      id="hero"
      className="relative h-dvh w-full overflow-x-hidden"
      aria-labelledby="hero-gaming-heading"
      ref={heroRef}
    >
      {isLoading && (
        <div
          className="flex-center absolute z-[100] size-full overflow-hidden bg-violet-50"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <span className="sr-only">Loading...</span>
          <div className="three-body" aria-hidden="true">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}
      <div
        ref={videoFrameRef}
        className="relative z-10 h-dvh w-full overflow-hidden bg-blue-75"
      >
        <div className="size-full">
          <div
            className="mask-clip-path absolute-center z-50 h-[25dvh] w-[25dvw] overflow-hidden rounded-lg animate-spin-sway [will-change:transform]"
            ref={btnParentRef}
          >
            <button
              className="origin-center scale-50 transition-all opacity-0 duration-500 ease-in hover:scale-100 hover:opacity-100 focus:scale-100 focus:opacity-100 cursor-pointer"
              onClick={handleMiniVdClick}
              type="button"
              aria-label="Press to show the next video"
              onFocus={() =>
                btnParentRef.current.classList.add("animate-smooth-pulse")
              }
            >
              {/* fallback */}
              <span className="sr-only">Press to show the next video</span>

              <video
                ref={currentVideoRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                className="h-[25dvh] w-[25dvw] origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </button>
          </div>

          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            aria-hidden={!hasClicked}
            className="absolute-center z-20 invisible object-cover object-center"
            onLoadedData={handleVideoLoad}
          />

          {/* back layer video */}
          <video
            ref={bgVideoRef}
            src={getVideoSrc(currentIndex)}
            // autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
            aria-hidden={hasClicked}
          />
        </div>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1
              id="hero-gaming-heading"
              className="special-font hero-heading text-blue-100"
            >
              redefi<b>n</b>e
              <span className="special-font hero-heading absolute bottom-5 right-5 sm:right-10  z-40 text-blue-75">
                g<b>a</b>ming
              </span>
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100 2xl:text-lg">
              <span className="block">Enter the Metagame Layer</span>
              <span className="block">Unleash the Play Economy</span>
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1 hover:bg-yellow-hover focus:bg-yellow-hover"
            />
          </div>
        </div>
      </div>
      {/* for bottom layer */}
      <span
        className="special-font hero-heading absolute bottom-5 right-5 text-black"
        aria-hidden="true"
      >
        g<b>a</b>ming
      </span>
    </section>
  );
};

export default Hero;
