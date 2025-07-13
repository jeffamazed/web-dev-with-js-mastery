import {
  About,
  Hero,
  Navbar,
  Features,
  Story,
  Gallery,
  Contact,
  Footer,
} from "./components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, createRef } from "react";
import { navItems } from "./constants";
import useResponsiveAnim from "./customHooks/useResponsiveAnim";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  // handle scroll positions
  const sectionRef = useRef(
    Object.fromEntries(navItems.map(({ target }) => [target, createRef()])),
  ).current;

  const windowSize = useResponsiveAnim();

  return (
    <>
      <Navbar sectionRef={sectionRef} />
      <main className="relative min-h-dvh w-full overflow-x-hidden">
        <Hero scrollRef={sectionRef.nexus} />
        <About scrollRef={sectionRef.about} windowSize={windowSize} />
        <Features scrollRef={sectionRef.features} />
        <Story scrollRef={sectionRef.prologue} windowSize={windowSize} />
        <Gallery windowSize={windowSize} />
        <Contact scrollRef={sectionRef.contact} windowSize={windowSize} />
        <Footer />
      </main>
    </>
  );
};

export default App;
