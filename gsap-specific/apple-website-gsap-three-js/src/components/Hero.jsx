import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const Hero = () => {
  const heroRef = useRef(null);
  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;
    },
    { scope: heroRef, dependencies: [] }
  );

  return (
    <section ref={heroRef} className="w-full nav-height chk">
      <div className="h-5/6 chk w-full flex-center flex-col">
        <h1 className="hero-title">iPhone 15 Pro</h1>
      </div>
    </section>
  );
};

export default Hero;
