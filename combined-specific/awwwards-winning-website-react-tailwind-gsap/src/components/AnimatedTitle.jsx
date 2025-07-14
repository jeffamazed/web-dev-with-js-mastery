import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import ScrollTrigger from "gsap/ScrollTrigger";

const AnimatedTitle = ({ title, containerClass, id, windowSize }) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const animatedWord = container.querySelectorAll(".animated-word");

      if (!animatedWord || !animatedWord.length || !container) return;

      // guard to always use fresh tweens and scrolltrigger
      gsap.killTweensOf(animatedWord);
      ScrollTrigger.getById(id)?.kill();

      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          id,
          trigger: container,
          start: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.fromTo(
        animatedWord,
        {
          opacity: 0,
          transform:
            "translate3d(10px, 51px, -60px) rotateY(60deg) rotateX(-40deg)",
          transformOrigin: "50% 50% -150px",
        },
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          transformOrigin: "50% 50% -150px",
          ease: "power2.inOut",
          stagger: 0.02,
        },
      );
    },
    { scope: containerRef, dependencies: [windowSize] },
  );

  return (
    <p ref={containerRef} className={`${containerClass} animated-title`}>
      {title}
    </p>
  );
};

export default AnimatedTitle;
