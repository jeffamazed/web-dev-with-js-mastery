import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(
    () => {
      let heroSplit;
      let paragraphSplit;

      document.fonts.ready.then(() => {
        heroSplit = new SplitText(titleRef.current, {
          type: "chars, words",
        });
        paragraphSplit = new SplitText(".subtitle", { type: "lines" });

        // applying class to each char because animating each char
        heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

        gsap.from(heroSplit.chars, {
          yPercent: 100,
          duration: 1.8,
          ease: "expo.out",
          stagger: 0.06,
        });

        gsap.from(paragraphSplit.lines, {
          opacity: 0,
          yPercent: 100,
          duration: 1.8,
          ease: "expo.out",
          stagger: 0.06,
          delay: 1,
        });
      });
      // animate leaves
      gsap
        .timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
        .to(".right-leaf", { y: 200 }, 0)
        .to(".left-leaf", { y: -200 }, 0);

      const startValue = isMobile ? "top 50%" : "center 60%";
      const endValue = isMobile ? "120% top" : "bottom top";

      // video timeline
      const videoTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: videoRef.current,
          start: startValue,
          end: endValue,
          scrub: true,
          pin: true,
        },
      });

      videoRef.current.onloadedmetadata = () => {
        const video = videoRef.current;
        if (video.duration > 0) {
          videoTimeline.to(video, {
            currentTime: video.duration,
          });
        }
      };

      return () => {
        if (heroSplit) heroSplit.revert();
        if (paragraphSplit) paragraphSplit.revert();
      };
    },
    { scope: heroRef, dependencies: [] }
  );

  return (
    <>
      <section
        id="hero"
        className="noisy"
        aria-labelledby="title-heading"
        ref={heroRef}
      >
        <h1 id="title-heading" className="title" ref={titleRef}>
          MOJITO
        </h1>

        <img
          src="./images/hero-left-leaf.png"
          alt="left leaf"
          className="left-leaf"
        />
        <img
          src="./images/hero-right-leaf.png"
          alt="right leaf"
          className="right-leaf"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle">
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
        />
      </div>
    </>
  );
};

export default Hero;
