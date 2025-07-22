import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import {
  animateWithGsap,
  headingTimeline,
  videoAnimation,
} from "../utils/animations";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { explore1Img, explore2Img, exploreVideo } from "../utils";
import gsap from "gsap";

const Features = ({ isMobile, videoRefs, responsive, featuresRef }) => {
  const headingRef = useRef(null);
  const imgContainerRef = useRef(null);
  const textContainerRef = useRef(null);

  useGSAP(() => {}, { dependencies: [], scope: featuresRef });

  useGSAP(
    () => {
      const heading = headingRef.current;
      const features = featuresRef.current;
      const exploreVideo = videoRefs[1].current;
      const imgContainer = imgContainerRef.current;
      const textContainer = textContainerRef.current;
      const images = imgContainerRef.current.querySelectorAll(".g_grow");
      const texts = textContainerRef.current.querySelectorAll(".g_text");

      if (
        !heading ||
        !features ||
        !exploreVideo ||
        !images ||
        !images.length ||
        !imgContainer ||
        !textContainer ||
        !texts ||
        !texts.length
      )
        return;

      // kill all triggers in this section
      const triggerIds = [
        "features-trigger",
        "images-trigger",
        "texts-trigger",
        "explore-video-trigger",
      ];
      triggerIds.forEach((id) => {
        ScrollTrigger.getById(id)?.kill();
      });

      // for clearing the previous styles for texts
      gsap.set(texts, { clearProps: "all" });

      const startValue = isMobile ? "top 70%" : "top 50%";

      // heading animation
      const tl = headingTimeline(features, "features-trigger", startValue);
      tl.to(heading, { y: 0, opacity: 1 });

      // video animation
      videoAnimation(
        exploreVideo,
        "explore-video-trigger",
        "top bottom",
        "bottom top"
      );

      // images animation
      animateWithGsap(
        images,
        { scale: 1, opacity: 1, ease: "power1" },
        imgContainer,
        { scrub: 5.5, id: "images-trigger" }
      );

      // text animation
      animateWithGsap(
        texts,
        {
          y: 0,
          opacity: 1,
          ease: "power2.inOut",
          duration: 1,
        },
        textContainer,
        { id: "texts-trigger" }
      );
    },
    {
      scope: featuresRef,
      dependencies: [isMobile, responsive.width, responsive.height],
    }
  );

  return (
    <section
      className="common-padding h-full bg-zinc relative overflow-hidden"
      ref={featuresRef}
    >
      <div className="container mx-auto">
        <h2 ref={headingRef} className="section-heading mb-12">
          Explore the full story.
        </h2>

        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-24 md:mt-32 mb-24 ml-8 lg:ml-0">
            <h3 className="text-4xl lg:text-6xl font-semibold text-custom-white">
              <span className="block">iPhone.</span>
              <span className="block">Forged in titanium.</span>
            </h3>
          </div>
        </div>

        <div className="flex-center flex-col sm:px-10 gap-5">
          <div className="relative h-[50vh] flex items-center w-full">
            <video
              ref={videoRefs[1]}
              playsInline
              className="size-full object-cover object-center"
              preload="none"
              autoPlay
              muted
              tabIndex={-1}
            >
              <source src={exploreVideo} type="video/mp4" />
            </video>
          </div>

          <div className="flex flex-col w-full relative">
            <div className="feature-video-container" ref={imgContainerRef}>
              <div className="overflow-hidden flex-1 h-[50vh]">
                <img
                  src={explore1Img}
                  alt="titanium"
                  className="feature-video g_grow"
                />
              </div>
              <div className="overflow-hidden flex-1 h-[50vh]">
                <img
                  src={explore2Img}
                  alt="titanium 2"
                  className="feature-video g_grow"
                />
              </div>
            </div>

            <div className="feature-text-container" ref={textContainerRef}>
              {/* first para */}
              <div className="flex-1 flex-center">
                <p className="feature-text g_text">
                  iPhone 15 Pro is{" "}
                  <span className="text-custom-white">
                    the first iPhone to feature an aerospace-grade titanium
                    design,{" "}
                  </span>
                  using the same alloy that spacecrafts use for missions to
                  Mars.
                </p>
              </div>
              {/* second para */}
              <div className="flex-1 flex-center">
                <p className="feature-text g_text">
                  Titanium has one of the best strength-to-weight ratios of any
                  metal, making these our{" "}
                  <span className="text-custom-white">
                    lightest Pro models ever.{" "}
                  </span>
                  You'll notice the difference the moment you pick one up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
