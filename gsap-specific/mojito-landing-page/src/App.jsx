import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cocktails from "./components/Cocktails";
import About from "./components/About";
import Art from "./components/Art";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import { useRef } from "react";
import TopLink from "./components/TopLink";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  const scrollRefs = {
    about: useRef(null),
    art: useRef(null),
    cocktails: useRef(null),
    contact: useRef(null),
  };

  return (
    <>
      {/* dummy top */}
      <div id="top" className="sr-only" />

      <TopLink />
      <Navbar scrollRefs={scrollRefs} />
      <main>
        <Hero />
        <Cocktails scrollRef={scrollRefs.cocktails} />
        <About scrollRef={scrollRefs.about} />
        <Art scrollRef={scrollRefs.art} />
        <Menu />
        <Contact scrollRef={scrollRefs.contact} />
      </main>
    </>
  );
};

export default App;
