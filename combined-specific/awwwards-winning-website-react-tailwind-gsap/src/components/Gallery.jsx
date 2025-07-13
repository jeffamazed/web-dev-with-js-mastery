import { generateTitle } from "../utils/generateTitle";
import AnimatedTitle from "./AnimatedTitle";
import { galleryImg } from "../constants";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import generateMobileAnimConfigs from "../utils/generateMobileAnimConfigs";
import generateDesktopAnimConfigs from "../utils/generateDesktopAnimConfigs";

const Gallery = ({ windowSize }) => {
  const galleryRef = useRef(null);
  const title = "Zen(t)ry at a glanc(e)";
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useGSAP(
    () => {
      const gallery = galleryRef.current;
      const children = galleryRef.current.querySelectorAll(".gallery-child");
      if (!gallery || !children || !children.length) return;

      // kill previous scrolltrigger and tweens to prevent duplicates
      gsap.killTweensOf(gallery);
      ScrollTrigger.getById("gallery-trigger")?.kill();
      ScrollTrigger.getById("gallery-trigger-2")?.kill();
      gsap.set(children, { clearProps: "all" });

      const startValue = isMobile ? "40% bottom" : "top 70%";
      const endValue = isMobile ? "bottom bottom" : "40% 50%";
      const firstTl = gsap.timeline({
        scrollTrigger: {
          id: "gallery-trigger",
          trigger: gallery,
          start: startValue,
          end: endValue,
          scrub: true,
        },
      });

      const animationConfig = isMobile
        ? generateMobileAnimConfigs(children.length)
        : generateDesktopAnimConfigs(children, gallery);

      children.forEach((child, i) => {
        const { from, to } = animationConfig[i];
        firstTl.fromTo(child, from, to);
      });

      if (!isMobile) {
        // next scrolltrigger
        const secondTl = gsap.timeline({
          scrollTrigger: {
            id: "gallery-trigger-2",
            trigger: gallery,
            start: "50% 50%",
            end: "110% center",
            scrub: true,
          },
          ease: "power1.inOut",
        });

        children.forEach((child) => {
          secondTl.fromTo(
            child,
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              rotationY: 0,
              rotation: 0,
            },
            {
              clipPath:
                "polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)",
              rotationY: -80,
              rotation: 90,
              transformOrigin: "center center",
              ease: "power1.out",
              immediateRender: false,
            },
            0,
          );
        });
      }
    },
    { scope: galleryRef, dependencies: [windowSize, isMobile] },
  );

  return (
    <section id="gallery" className="min-h-dvh bg-custom-black w-full py-32">
      <div className="flex flex-col items-center gap-10 container mx-auto">
        <header className="flex flex-col gap-5 w-full text-center">
          <h2 className="font-general text-blue-50 text-xs uppercase lg:text-sm">
            explore zentry
          </h2>
          <AnimatedTitle
            title={generateTitle(title)}
            containerClass="text-blue-50 mix-blend-difference relative z-50"
            id="gallery-title"
            windowSize={windowSize}
          />
        </header>

        <div
          className="flex-center flex-col gap-5 px-3 sm:flex-row sm:flex-wrap mt-5 max-w-7xl"
          ref={galleryRef}
        >
          {galleryImg.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              className="gallery-img-4 gallery-child"
            />
          ))}
        </div>
        <p className="text-blue-50 px-8 max-w-3xl text-center font-circular-web">
          Join us in molding the Nova Universe! Engage in governance and make
          your voice heard as we collaboratively build a dynamic world limited
          only by our collective creativity.
        </p>
      </div>
    </section>
  );
};

export default Gallery;
