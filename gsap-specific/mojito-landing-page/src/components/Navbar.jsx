import gsap from "gsap";
import { navLinks } from "../constants";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { BiCollapseAlt, BiExpandAlt } from "react-icons/bi";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Navbar = ({ sectionRef, responsive }) => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isNavClicked, setIsNavClicked] = useState(false);
  const navRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    if (!isMobile) setIsNavExpanded(true);
    else setIsNavExpanded(false);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile && isNavClicked) setIsNavExpanded(false);
    setIsNavClicked(false);
  }, [isMobile, isNavClicked]);

  useGSAP(
    () => {
      const nav = navRef.current;
      const ul = navRef.current.querySelector("ul");
      if (!nav || !ul) return;

      gsap.killTweensOf([nav, ul]);
      ScrollTrigger.getById("nav-trigger")?.kill();
      if (nav || ul) {
        gsap.set(nav, { clearProps: "all" });
        gsap.set(ul, { clearProps: "backgroundColor, backdropFilter" });
      }

      const navTween = gsap.timeline({
        scrollTrigger: {
          trigger: nav,
          id: "nav-trigger",
          start: "bottom top",
          toggleActions: "play none none reverse",
        },
      });

      const toAnimate = isMobile && ul ? [nav, ul] : [nav];

      navTween.fromTo(
        toAnimate,
        { backgroundColor: "transparent" },
        {
          backgroundColor: "#00000050",
          backdropFilter: "blur(10px)",
          duration: 0.5,
          ease: "power1.inOut",
        },
        0,
      );
    },
    {
      scope: navRef,
      dependencies: [responsive, isMobile],
    },
  );

  const handleScrollIntoView = (e, target) => {
    const section = sectionRef[target];
    if (!section?.current) return;
    e.preventDefault();
    setIsNavClicked(true);

    const sectionTop =
      section.current.getBoundingClientRect().top + window.scrollY;
    const navHeight = navRef.current.getBoundingClientRect().height;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: sectionTop - navHeight,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const handleExpand = () => {
    setIsNavExpanded((prev) => !prev);
  };
  return (
    <header ref={navRef} className="fixed z-50 w-full">
      <nav>
        <div>
          <a href="#hero" className="flex items-center gap-2">
            <img src="./images/logo.png" alt="Velvet Pour Logo" />
            <span>Velvet Pour</span>
          </a>
          {isMobile && (
            <button
              type="button"
              className="cursor-pointer"
              onClick={handleExpand}
              aria-label={`${
                isNavExpanded ? "Collapse navigation" : "Expand navigation"
              }`}
              aria-controls="navbar-menu"
              aria-expanded={isNavExpanded}
            >
              {isNavExpanded ? (
                <BiCollapseAlt aria-hidden="true" />
              ) : (
                <BiExpandAlt aria-hidden="true" />
              )}
            </button>
          )}
        </div>
        <ul
          id="navbar-menu"
          className={`size-full left-0 absolute top-[100%] transition duration-200 ${
            isNavExpanded ? "translate-y-0" : "-translate-y-[100%] opacity-0"
          } md:static md:w-fit`}
          aria-hidden={!isNavExpanded}
        >
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => handleScrollIntoView(e, link.id)}
                tabIndex={isNavExpanded ? "1" : "-1"}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
