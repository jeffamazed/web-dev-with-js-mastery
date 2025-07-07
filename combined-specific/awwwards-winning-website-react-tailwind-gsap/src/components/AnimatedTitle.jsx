import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center bottom",
          toggleActions: "play none none reverse",
        },
      });
      titleAnimation.to(
        ".animated-word",
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.inOut",
          stagger: 0.02,
        },
        0
      );
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <p ref={containerRef} className={`${containerClass} animated-title`}>
      {title}
    </p>
  );
};

export default AnimatedTitle;
