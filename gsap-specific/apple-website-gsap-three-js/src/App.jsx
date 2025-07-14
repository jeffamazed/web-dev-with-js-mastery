import { useRef, createRef } from "react";
import { Navbar, Hero, Highlights } from "./components";
import { navItems } from "./constants";
import useResponsive from "./customHooks/useResponsive";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const sectionRef = useRef(
    Object.fromEntries(navItems.map(({ target }) => [target, createRef()]))
  ).current;
  const responsive = useResponsive();

  return (
    <>
      <Navbar sectionRef={sectionRef} responsive={responsive} />
      <main className="w-full overflow-x-hidden">
        <Hero responsive={responsive} />
        <Highlights />
        <div className="h-dvh"></div>
      </main>
    </>
  );
};

export default App;
