import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedTitle from "./AnimatedTitle";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });

    return () => {
      clipAnimation.scrollTrigger?.kill();
      clipAnimation.kill();
    };
  }, []);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    window.addEventListener("orientationchange", refresh);

    return () => {
      window.removeEventListener("resize", refresh);
      window.removeEventListener("orientationchange", refresh);
    };
  }, []);

  return (
    <section
      id="about"
      className="min-h-dvh w-full"
      aria-labelledby="about-heading"
    >
      <div className=" mt-36 flex flex-col items-center gap-5 text-center relative">
        <header className="flex flex-col gap-5 px-2">
          <h2
            id="about-heading"
            className="font-general text-sm uppercase md:text-base"
          >
            Welcome to Zentry
          </h2>
          <AnimatedTitle
            title={
              <>
                <span className="block">
                  Disc<b>o</b>ver the world's
                </span>
                <span className="block">
                  l<b>a</b>rgest shared adventure
                </span>
              </>
            }
          />
        </header>

        <div className="about-subtext"></div>

        <div className="h-dvh w-full chk" id="clip">
          <div className="mask-clip-path about-image chk" id="about-preview">
            <img
              src="./img/about.webp"
              alt="Zentry background"
              className="absolute left-0 top-0 size-full object-cover"
            />
          </div>
          <p className="pt-[63vh] px-2">
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
