import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Hero = ({ responsive }) => {
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const heroLeftLeafRef = useRef(null);
  const heroRightLeafRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const cocktailsHeight = responsive.cocktailsHeight;
  const paragraphSplitRef = useRef(null);
  const heroSplitRef = useRef(null);

  useGSAP(
    () => {
      const title = titleRef.current;
      const hero = heroRef.current;
      const rightLeaf = heroRightLeafRef.current;
      const leftLeaf = heroLeftLeafRef.current;
      const video = videoRef.current;

      if (
        !title ||
        !hero ||
        !rightLeaf ||
        !leftLeaf ||
        !video ||
        !cocktailsHeight
      )
        return;

      if (paragraphSplitRef.current) paragraphSplitRef.current.revert();
      if (heroSplitRef.current) heroSplitRef.current.revert();

      document.fonts.ready.then(() => {
        heroSplitRef.current = new SplitText(title, {
          type: "chars, words",
        });
        paragraphSplitRef.current = new SplitText(
          hero.querySelectorAll(".subtitle"),
          {
            type: "lines",
          },
        );

        // applying class to each char because animating each char
        heroSplitRef.current.chars.forEach((char) =>
          char.classList.add("text-gradient"),
        );

        gsap.from(heroSplitRef.current.chars, {
          yPercent: 100,
          duration: 1.8,
          ease: "expo.out",
          stagger: 0.06,
        });

        gsap.from(paragraphSplitRef.current.lines, {
          opacity: 0,
          yPercent: 100,
          duration: 1.8,
          ease: "expo.out",
          stagger: 0.06,
          delay: 1,
        });
      });

      // animate leaves

      // fresh scrolltrigger
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.group === "hero-group-trigger") {
          trigger.kill();
        }
      });
      gsap.killTweensOf(video);

      gsap
        .timeline({
          scrollTrigger: {
            group: "hero-group-trigger",
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
        .to(rightLeaf, { y: 200 }, 0)
        .to(leftLeaf, { y: -200 }, 0);

      const startValue = isMobile ? "top 50%" : "center 60%";
      const endValue = `bottom+=${cocktailsHeight} bottom`;

      // video timeline
      const videoTimeline = gsap.timeline({
        scrollTrigger: {
          group: "hero-group-trigger",
          trigger: video,
          start: startValue,
          end: endValue,
          scrub: true,
          pin: true,
        },
      });

      // prevent race condition, bcs video metadata is already loaded
      if (video.readyState >= 1 && video.duration > 0) {
        videoTimeline.to(video, {
          currentTime: video.duration,
        });
      } else {
        video.onloadedmetadata = () => {
          if (video.duration > 0) {
            videoTimeline.to(video, {
              currentTime: video.duration,
            });
          }
        };
      }

      return () => {
        if (heroSplitRef.current) {
          heroSplitRef.current.revert();
          heroSplitRef.current = null;
        }
        if (paragraphSplitRef.current) {
          paragraphSplitRef.current.revert();
          paragraphSplitRef.current = null;
        }
      };
    },
    {
      scope: heroRef,
      dependencies: [responsive, isMobile],
    },
  );

  return (
    <>
      <section id="hero" className="noisy" ref={heroRef}>
        <h1 className="title" ref={titleRef}>
          MOJITO
        </h1>

        <img
          src="./images/hero-left-leaf.png"
          alt="left leaf"
          className="left-leaf"
          ref={heroLeftLeafRef}
        />
        <img
          src="./images/hero-right-leaf.png"
          alt="right leaf"
          className="right-leaf"
          ref={heroRightLeafRef}
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                <span className="block">Sip the Spirit</span>
                <span className="block">of Summer</span>
              </p>
            </div>
            <div className="view-cocktails">
              <p className={`subtitle mx-auto w-fit md:w-full`}>
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipe — designed to delight your
                senses.
              </p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          src="./videos/output.mp4"
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>
    </>
  );
};

export default Hero;
