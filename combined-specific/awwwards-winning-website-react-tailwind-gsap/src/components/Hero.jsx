import { useRef, useState } from "react";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVideoRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVdClick = () => {
    setHasClicked(true);

    setCurrentIndex(upcomingVideoIndex);
  };

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <section className="relative h-dvh w-full overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-full overflow-hidden bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center z-50 size-64  overflow-hidden rounded-lg group">
            <button
              className="origin-center scale-50 transition-all opacity-0 duration-300 ease-in hover:scale-100 hover:opacity-100 focus:scale-100 focus:opacity-100 cursor-pointer"
              onClick={handleMiniVdClick}
              type="button"
              aria-label="Press to show the next video"
            >
              {/* fallback */}
              <span className="sr-only">Press to show the next video</span>

              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </button>
          </div>

          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible z-20 size-64 object-cover- object-center"
            onLoadedData={handleVideoLoad}
          />

          <video
            src={getVideoSrc(currentIndex)}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        {/* <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1> */}

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e{" "}
              <span className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
                g<b>a</b>ming
              </span>
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              <span className="block">Enter the Metagame Layer</span>
              <span className="block">Unleash the Play Economy</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
