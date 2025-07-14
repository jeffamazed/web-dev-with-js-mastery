import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { heroVideo, smallHeroVideo } from "../utils";

const Hero = ({ responsive }) => {
  const [videoSrc, setVideoSrc] = useState(
    responsive.width < 768 ? smallHeroVideo : heroVideo
  );
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
      if (!h1) return;

      gsap.to(h1, {
        opacity: 1,
        delay: 1.5,
      });

      gsap.to(cta, {
        opacity: 1,
        y: -80,
        delay: 2,
      });
    },
    { scope: heroRef, dependencies: [] }
  );

  return (
    <section ref={heroRef} className="w-full nav-height container mx-auto">
      <div className="h-5/6 w-full flex-center flex-col">
        <h1 ref={h1Ref} className="hero-title">
          iPhone 15 Pro
        </h1>
        <div className="w-full max-w-xs md:max-w-none">
          <video
            className="pointer-events-none"
            tabIndex={-1}
            autoPlay
            // loop
            muted
            playsInline
            key={videoSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
      <div
        ref={ctaRef}
        className="flex flex-col items-center opacity-0 translate-y-20 mt-10 px-2 md:px-0"
      >
        <a href="#highlights" className="btn">
          Buy
        </a>
        <p className="font-normal text-lg sm:text-xl text-center">
          From $199/month or $999
        </p>
      </div>
    </section>
  );
};

export default Hero;
