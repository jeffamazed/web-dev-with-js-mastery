import About from "./components/About";
import Hero from "./components/Hero";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, createRef } from "react";
import Navbar from "./components/Navbar";

import Features from "./components/Features";
import { navItems } from "./constants";
import Story from "./components/Story";
import useScrollTriggerRefresh from "./customHooks/useScrollTriggerRefresh";
import useWindowSize from "./customHooks/useWindowSize";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  // handle scroll positions
  const sectionRef = useRef(
    Object.fromEntries(navItems.map(({ target }) => [target, createRef()]))
  ).current;

  useScrollTriggerRefresh();
  const windowSize = useWindowSize();

  return (
    <>
      <Navbar sectionRef={sectionRef} />
      <main className="relative min-h-dvh w-full overflow-x-hidden">
        <Hero />
        <About scrollRef={sectionRef.about} />
        <Features />
        <Story windowSize={windowSize} />
      </main>
    </>
  );
};

export default App;
