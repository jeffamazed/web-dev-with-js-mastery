import About from "./components/About";
import Hero from "./components/Hero";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, createRef } from "react";
import Navbar from "./components/Navbar";
import { navItems } from "./constants";

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
        <div className="h-dvh bg-green-200"></div>
      </main>
    </>
  );
};

export default App;
