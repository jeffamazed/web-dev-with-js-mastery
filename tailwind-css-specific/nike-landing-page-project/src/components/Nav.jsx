import { headerLogo } from "../assets/images";
import { hamburger } from "../assets/icons";
import { navLinks } from "../constants";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

const Nav = ({ sectionRef }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isNavClicked, setIsNavClicked] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const headerRef = useRef(null);

  useEffect(() => {
    if (isNavClicked) setIsExpanded(false);
    setIsNavClicked(false);
  }, [isNavClicked]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsExpanded(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScrollIntoView = (e, target) => {
    const section = sectionRef[target];
    if (!section?.current) return;

    e.preventDefault();

    const headerHeight = headerRef.current.getBoundingClientRect().height;
    const sectionTop =
      section.current.getBoundingClientRect().top + window.scrollY;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: sectionTop - headerHeight,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const handleTabIndex = !isMobile ? 1 : isExpanded ? 1 : -1;

  return (
    <header
      ref={headerRef}
      className={`padding-x py-8 fixed z-50 w-full bg-transparent hover:bg-white-400 transition-colors duration-200 ease-in hover:drop-shadow-xl ${
        isExpanded ? "bg-white-400" : ""
      }`}
    >
      <nav className="flex justify-between items-center max-container">
        <a href="/">
          <img src={headerLogo} alt="Logo" width={130} height={29} />
        </a>
        <ul
          className={`flex-1 flex nav-below-md nav-above-md w-full nav-transition ${
            isExpanded
              ? "h-[13.75rem] bg-white-400"
              : "h-0 overflow-hidden bg-transparent"
          }`}
          id="nav-ul"
          aria-hidden={!isMobile ? false : !isExpanded ? true : false}
        >
          {navLinks.map((link) => (
            <li key={link.label} className="px-4 py-2 text-center">
              <a
                href={`#${link.target}`}
                className="font-montserrat leading-normal text-lg text-slate-gray cursor-pointer hover:text-black transition-colors duration-200"
                onClick={(e) => {
                  handleScrollIntoView(e, link.target);
                  setIsNavClicked(true);
                }}
                tabIndex={handleTabIndex}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden max-md:block">
          <button
            type="button"
            className="cursor-pointer"
            aria-label={`${
              isExpanded ? "Collapse Navigation" : "Expand Navigation"
            }`}
            onClick={() => {
              setIsExpanded((prev) => !prev);
              setIsAriaHidden((prev) => !prev);
            }}
            aria-expanded={isExpanded}
            aria-controls="nav-ul"
          >
            <img src={hamburger} alt="Hamburger" width={25} height={25} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
