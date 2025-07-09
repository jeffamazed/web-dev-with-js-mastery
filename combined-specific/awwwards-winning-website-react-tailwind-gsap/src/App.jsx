import About from "./components/About";
import Hero from "./components/Hero";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, createRef } from "react";
import Navbar from "./components/Navbar";
import { navItems } from "./constants";
import Features from "./components/Features";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  // handle scroll positions
  const sectionRef = useRef(
    Object.fromEntries(navItems.map(({ target }) => [target, createRef()]))
  ).current;

  // handle scrolltrigger refresh
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
    <>
      <Navbar sectionRef={sectionRef} />
      <main className="relative min-h-dvh w-full overflow-x-hidden">
        <Hero />
        <About scrollRef={sectionRef.about} />
        <Features />
      </main>
    </>
  );
};

export default App;
