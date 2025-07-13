import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cocktails from "./components/Cocktails";
import About from "./components/About";
import Art from "./components/Art";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import { useRef, createRef } from "react";
import TopLink from "./components/TopLink";
import { navLinks } from "./constants";
import useResponsive from "./customHooks/useResponsive";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  const sectionRef = useRef(
    Object.fromEntries(navLinks.map(({ id }) => [id, createRef()]))
  ).current;
  const responsive = useResponsive();

  return (
    <>
      {/* dummy top */}
      <div id="top" className="sr-only" />

      <TopLink />
      <Navbar sectionRef={sectionRef} responsive={responsive} />
      <main>
        <Hero responsive={responsive} />
        <Cocktails scrollRef={sectionRef.cocktails} />
        <About scrollRef={sectionRef.about} />
        <Art scrollRef={sectionRef.art} responsive={responsive} />
        <Menu />
        <Contact scrollRef={sectionRef.contact} responsive={responsive} />
      </main>
    </>
  );
};

export default App;
