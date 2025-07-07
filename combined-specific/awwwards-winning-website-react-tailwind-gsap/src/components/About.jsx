import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedTitle from "./AnimatedTitle";
import { useRef } from "react";
import { generateTitle } from "../utils/generateTitle";

const About = ({ scrollRef }) => {
  const clipRef = useRef(null);
  useGSAP(
    () => {
      const clipAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: clipRef.current,
          start: "top top",
          end: "+=1200 center",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      });

      clipAnimation.to("#about-preview", {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
      });
    },
    {
      scope: clipRef,
      dependencies: [],
    }
  );

  const title = "Disc(o)ver the world's<br />l(a)rgest shared adventure";

  return (
    <section
      id="about"
      className="min-h-dvh w-full chk"
      aria-labelledby="about-heading"
      ref={scrollRef}
    >
      <div className=" mt-36 flex flex-col items-center gap-5 text-center relative">
        <header className="flex flex-col gap-5 w-full">
          <h2
            id="about-heading"
            className="font-general text-sm uppercase md:text-base"
          >
            Welcome to Zentry
          </h2>
          <AnimatedTitle
            title={generateTitle(title)}
            containerClass="text-black mt-5 text-center"
          />
        </header>

        <div className="h-dvh w-full" id="clip" ref={clipRef}>
          <div className="mask-clip-path about-image" id="about-preview">
            <img
              src="./img/about.webp"
              alt="Zentry background"
              className="absolute left-0 top-0 size-full object-cover"
            />
          </div>
          <p className="pt-[63vh] px-10">
            <span className="block">
              The Game of Games begins—your life, now an epic MMORPG
            </span>
            <span className="block">
              Zentry unites every player from countless games and platforms
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
