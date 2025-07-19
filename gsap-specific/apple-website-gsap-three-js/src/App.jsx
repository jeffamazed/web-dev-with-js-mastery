import { useRef, createRef } from "react";
import { Navbar, Hero, Highlights } from "./components";
import { navItems } from "./constants";
import useResponsive from "./customHooks/useResponsive";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import useVisibilityChange from "./customHooks/useVisibilityChange";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  // for handling sectionRef for linking purposes
  const sectionRef = useRef(
    Object.fromEntries(navItems.map(({ target }) => [target, createRef()]))
  ).current;

  // for responsiveness of gsap animation
  const responsive = useResponsive();
  const navRef = useRef(null);
  const highlightsRef = useRef(null);

  // for handling multiple video refs for later use
  const totalVideos = 5;
  const videosRef = useRef(
    Array.from({ length: totalVideos }, () => createRef())
  ).current;
  useVisibilityChange(videosRef);

  // parent level isMobile
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      <Navbar
        sectionRef={sectionRef}
        responsive={responsive}
        navRef={navRef}
        isMobile={isMobile}
      />
      <main className="w-full overflow-x-hidden">
        <Hero
          responsive={responsive}
          navRef={navRef}
          highlightsRef={highlightsRef}
          videosRef={videosRef}
        />
        <Highlights highlightsRef={highlightsRef} responsive={responsive} />
        <div className="h-dvh"></div>
      </main>
    </>
  );
};

export default App;
