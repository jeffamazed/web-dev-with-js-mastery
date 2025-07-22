import { useRef, createRef } from "react";
import {
  Navbar,
  Hero,
  Highlights,
  Model,
  Features,
  HowItWorks,
  Footer,
} from "./components";
import { navItems } from "./constants";
import useResponsive from "./customHooks/useResponsive";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import useVisibilityChange from "./customHooks/useVisibilityChange";
import { useMediaQuery } from "react-responsive";
import useAutoPauseVideo from "./customHooks/useAutoPauseVideo";

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
  const videoRefs = useRef(
    Array.from({ length: totalVideos }, () => createRef())
  ).current;

  // handle pausing the video when tab is out of focus
  useVisibilityChange(videoRefs);

  // handle pausing the video when out of sight
  useAutoPauseVideo({ videoRefs, threshold: 0, responsive });

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
          videoRefs={videoRefs}
        />
        <Highlights
          highlightsRef={highlightsRef}
          responsive={responsive}
          isMobile={isMobile}
        />
        <Model isMobile={isMobile} />
        <Features
          isMobile={isMobile}
          videoRefs={videoRefs}
          responsive={responsive}
        />
        <HowItWorks responsive={responsive} videoRefs={videoRefs} />
        <Footer />
      </main>
    </>
  );
};

export default App;
