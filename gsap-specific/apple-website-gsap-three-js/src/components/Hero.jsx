import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { heroVideo, smallHeroVideo } from "../utils";
import LoadingIcon from "./LoadingIcon";
import handleScrollIntoView from "../utils/handleScrollIntoView";
import { videoAnimation } from "../utils/animations";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Hero = ({ responsive, navRef, highlightsRef, videoRefs }) => {
  const [videoSrc, setVideoSrc] = useState(
    responsive.width < 768 ? smallHeroVideo : heroVideo
  );

  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const heroRef = useRef(null);
  const h1Ref = useRef(null);
  const ctaRef = useRef(null);

  // handle video changing
  useEffect(() => {
    if (responsive.width < 768) setVideoSrc(smallHeroVideo);
    else setVideoSrc(heroVideo);
  }, [responsive.width]);

  useGSAP(
    () => {
      const h1 = h1Ref.current;
      const cta = ctaRef.current;
      const video = videoRefs[0].current;
      const hero = heroRef.current;
      if (!h1 || !cta || isVideoLoading || !video || !hero) return;

      // fresh scrolltrigger
      ScrollTrigger.getById("hero-trigger")?.kill();

      gsap.to(h1, {
        opacity: 1,
        delay: 1.5,
      });

      gsap.to(cta, {
        opacity: 1,
        y: -80,
        delay: 2,
      });

      videoAnimation(video, video, "hero-trigger", "top center", "bottom top");
    },
    {
      scope: heroRef,
      dependencies: [
        isVideoLoading,
        responsive.width,
        responsive.height,
        videoSrc,
      ],
    }
  );

  return (
    <section
      ref={heroRef}
      className="w-full nav-height container mx-auto"
      aria-busy={isVideoLoading}
      aria-live="polite"
    >
      <div className="h-5/6 w-full flex-center flex-col">
        <h1 ref={h1Ref} className="hero-title">
          iPhone 15 Pro
        </h1>
        <div className="w-full max-w-xs md:max-w-none relative">
          {isVideoLoading && <LoadingIcon />}
          <video
            className="pointer-events-none"
            ref={videoRefs[0]}
            tabIndex={-1}
            autoPlay
            muted
            playsInline
            key={videoSrc}
            onCanPlayThrough={() => setIsVideoLoading(false)}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
      <div
        ref={ctaRef}
        className="flex flex-col items-center opacity-0 translate-y-20 mt-10 common-padding-x"
      >
        <a
          href="#highlights"
          className="btn"
          onClick={(e) => handleScrollIntoView(e, navRef, highlightsRef)}
        >
          Buy
        </a>
        <h2 className="font-normal text-lg sm:text-xl text-center">
          From <strong className="font-normal">$199/month</strong> or{" "}
          <strong className="font-normal">$999</strong>
        </h2>
      </div>
    </section>
  );
};

export default Hero;
