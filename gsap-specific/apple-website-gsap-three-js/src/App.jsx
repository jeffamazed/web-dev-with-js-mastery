import { useRef, createRef } from "react";
import { Navbar, Hero, Highlights } from "./components";
import { navItems } from "./constants";
import useResponsive from "./customHooks/useResponsive";

const App = () => {
  const sectionRef = useRef(
    Object.fromEntries(navItems.map(({ target }) => [target, createRef()]))
  ).current;
  const responsive = useResponsive();
  console.log(responsive);

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
