import gsap from "gsap";
import { navLinks } from "../constants";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const Navbar = ({ sectionRef }) => {
  const navRef = useRef(null);
  useGSAP(
    () => {
      const navTween = gsap.timeline({
        scrollTrigger: {
          trigger: navRef.current,
          start: "bottom top",
        },
      });

      navTween.fromTo(
        navRef.current,
        { backgroundColor: "transparent" },
        {
          backgroundColor: "#00000050",
          backdropFilter: "blur(10px)",
          duration: 1,
          ease: "power1.inOut",
        }
      );
    },
    {
      scope: navRef,
      dependencies: [],
    }
  );

  const handleScrollIntoView = (e, target) => {
    const section = sectionRef[target];
    if (!section?.current) return;
    e.preventDefault();

    const sectionTop =
      section.current.getBoundingClientRect().top + window.scrollY;
    const navHeight = navRef.current.getBoundingClientRect().height;

    window.scrollTo({ top: sectionTop - navHeight, behavior: "smooth" });
  };
  return (
    <header>
      <nav ref={navRef}>
        <div>
          <a href="#hero" className="flex items-center gap-2">
            <img src="./images/logo.png" alt="Velvet Pour Logo" />
            <span>Velvet Pour</span>
          </a>
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleScrollIntoView(e, link.id)}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
