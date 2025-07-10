import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedTitle from "./AnimatedTitle";
import { useRef, useMemo } from "react";
import { generateTitle } from "../utils/generateTitle";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";

const About = ({ scrollRef }) => {
  const clipRef = useRef(null);
  const aboutPreviewRef = useRef(null);

  const bp1 = useMediaQuery({ minWidth: 640 });
  const bp2 = useMediaQuery({ minWidth: 768 });
  const bp3 = useMediaQuery({ minWidth: 1080 });
  const imgWidth = useMemo(
    () => (bp3 ? "40%" : bp2 ? "50%" : bp1 ? "55%" : "90%"),
    [bp1, bp2, bp3]
  );
  const imgHeight = "60%";

  useGSAP(
    () => {
      const about = aboutPreviewRef.current;
      const clip = clipRef.current;
      if (!about || !clip) return;

      // kill previous scrolltrigger and twens to prevent duplicates
      gsap.killTweensOf(about);
      ScrollTrigger.getById("about-trigger")?.kill();

      const timeline = gsap.timeline({
        scrollTrigger: {
          id: "about-trigger",
          trigger: clip,
          start: "top top",
          end: "+=800 center",
          scrub: 1,
          pin: true,
          pinSpacing: true,
        },
      });

      timeline.fromTo(
        about,
        {
          height: imgHeight,
          width: imgWidth,
          borderRadius: "16px",
        },
        {
          width: "100%",
          height: "100%",
          borderRadius: 0,
        }
      );
    },

    {
      scope: clipRef,
      dependencies: [imgWidth, imgHeight],
    }
  );

  const title = "Disc(o)ver the world's<br />l(a)rgest shared adventure";

  return (
    <section id="about" className="min-h-dvh w-full" ref={scrollRef}>
      <div className="mt-36 flex flex-col items-center gap-6 text-center relative">
        <header className="flex flex-col gap-5 w-full">
          <h2 className="font-general text-sm uppercase md:text-base text-custom-black">
            Welcome to Zentry
          </h2>
          <AnimatedTitle
            title={generateTitle(title)}
            containerClass="text-custom-black mt-5 text-center"
          />
        </header>

        <figure className="h-dvh w-dvw" id="clip" ref={clipRef}>
          <div className={`mask-clip-path about-image`} ref={aboutPreviewRef}>
            <img
              src="./img/about.webp"
              alt="Zentry background"
              className="absolute left-0 top-0 size-full object-cover"
            />
          </div>
          <figcaption className="pt-[63dvh] max-w-2xl mx-auto text-custom-black text-sm lg:text-base px-8">
            <span className="block">
              The Game of Games begins—your life, now an epic MMORPG.
            </span>
            <span className="block opacity-55">
              Zentry unites every player from countless games and platforms,
              both digital and physical, into a unified Play Economy.
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default About;
