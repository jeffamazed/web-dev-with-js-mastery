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

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  const sectionRef = useRef(
    Object.fromEntries(navLinks.map(({ id }) => [id, createRef()]))
  ).current;

  return (
    <>
      {/* dummy top */}
      <div id="top" className="sr-only" />

      <TopLink />
      <Navbar sectionRef={sectionRef} />
      <main>
        <Hero />
        <Cocktails scrollRef={sectionRef.cocktails} />
        <About scrollRef={sectionRef.about} />
        <Art scrollRef={sectionRef.art} />
        <Menu />
        <Contact scrollRef={sectionRef.contact} />
      </main>
    </>
  );
};

export default App;
