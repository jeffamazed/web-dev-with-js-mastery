import { headerLogo } from "../assets/images";
import { hamburger } from "../assets/icons";
import { navLinks } from "../constants";
import { useEffect, useState } from "react";

const Nav = ({ sectionRefs }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAriaHidden, setIsAriaHidden] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsExpanded(false);
        setIsAriaHidden(false);
      } else {
        setIsAriaHidden(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const handleScrollIntoView = (target) => {
    const sectionRef = sectionRefs[target];
    sectionRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`padding-x py-8 fixed z-50 w-full bg-transparent hover:bg-white-400 transition-colors duration-200 ease-in hover:drop-shadow-xl ${
        isExpanded ? "bg-white-400" : ""
      }`}
    >
      <nav className="flex justify-between items-center max-container">
        <a href="/">
          <img src={headerLogo} alt="Logo" width={130} height={29} />
        </a>
        <ul
          className={`flex-1 flex nav-below-lg nav-above-lg w-full nav-transition ${
            isExpanded
              ? "h-[13.75rem] bg-white-400"
              : "h-0 overflow-hidden bg-transparent"
          }`}
          aria-hidden={isAriaHidden}
        >
          {navLinks.map((link) => (
            <li key={link.label} className="px-4 py-2 text-center">
              <button
                type="button"
                className="font-montserrat leading-normal text-lg text-slate-gray cursor-pointer hover:text-black transition-colors duration-200"
                onClick={() => handleScrollIntoView(link.target)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="hidden max-lg:block">
          <button
            type="button"
            className="cursor-pointer"
            aria-label="Expand hamburger"
            onClick={() => {
              setIsExpanded((prev) => !prev);
              setIsAriaHidden((prev) => !prev);
            }}
            aria-expanded={isExpanded}
          >
            <img src={hamburger} alt="Hamburger" width={25} height={25} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
