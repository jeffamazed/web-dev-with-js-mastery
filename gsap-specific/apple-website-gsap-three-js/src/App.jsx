import { useRef, createRef } from "react";
import { Navbar, Hero, Highlights } from "./components";
import { navItems } from "./constants";

const App = () => {
  const sectionRef = useRef(
    Object.fromEntries(navItems.map(({ target }) => [target, createRef()]))
  ).current;

  return (
    <>
      <Navbar sectionRef={sectionRef} />
      <main>
        <Hero />
        {/* <Highlights /> */}
      </main>
    </>
  );
};

export default App;
