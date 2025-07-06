import About from "./components/About";
import Hero from "./components/Hero";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const App = () => {
  return (
    <main className="relative min-h-dvh w-full overflow-x-hidden">
      <Hero />
      <About />
      <div className="h-dvh bg-green-200"></div>
    </main>
  );
};

export default App;
