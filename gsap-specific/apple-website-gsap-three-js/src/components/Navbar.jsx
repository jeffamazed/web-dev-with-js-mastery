import { useMediaQuery } from "react-responsive";
import { navItems } from "../constants";
import { appleImg, bagImg, searchImg } from "../utils";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Navbar = ({ sectionRef, responsive }) => {
  const [isNavExpanded, setIsNavExpanded] = useState(
    responsive.width > 768 ? true : false
  );
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const navRef = useRef(null);
  const ulContainerRef = useRef(null);

  useEffect(() => {
    if (!isMobile) setIsNavExpanded(true);
    else setIsNavExpanded(false);
  }, [isMobile]);

  const handleNavExpand = () => {
    setIsNavExpanded((prev) => !prev);
  };

  const handleScrollIntoView = (e, target) => {
    const section = sectionRef[target].current;
    if (!section) return;
    e.preventDefault();
  };

  useGSAP(
    () => {
      const nav = navRef.current;
      const ul = ulContainerRef.current;
      if (!nav || !ul) return;

      ScrollTrigger.getById("nav-trigger")?.kill();

      gsap.fromTo(
        [nav, ul],
        {
          backdropFilter: "blur(0px)",
        },
        {
          backdropFilter: "blur(4px)",

          scrollTrigger: {
            id: "nav-trigger",
            trigger: nav,
            start: "bottom top",
            toggleActions: "play none none reverse",
            duration: 0.2,
          },
        }
      );
    },
    { scope: navRef, dependencies: [responsive] }
  );

  const headerBg = !isMobile
    ? "bg-transparent"
    : isNavExpanded
    ? "bg-black"
    : "";
  return (
    <header
      ref={navRef}
      className={`w-full px-5 sm:px-10 flex-center fixed z-50 ${headerBg} transition-colors duration-200`}
    >
      <nav className="flex items-center justify-between w-full container py-5">
        <div className="block flex-1">
          <a
            href="https://www.apple.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Apple"
            className="block w-fit"
          >
            <img src={appleImg} alt="Apple logo" width={14} height={18} />
          </a>
        </div>

        <div
          ref={ulContainerRef}
          className={`absolute top-[100%] -z-10 size-full left-0 flex-center transition-all duration-200 flex-1 ${
            isNavExpanded ? "translate-y-0 bg-black" : "-translate-y-[100%]"
          } ${!isMobile && "static w-fit z-auto bg-transparent"}`}
        >
          <ul
            id="nav-ul"
            className={`flex justify-evenly gap-5 md:gap-10 transition-opacity duration-75 w-full ${
              isNavExpanded ? "opacity-100" : "opacity-0"
            } ${!isMobile && "opacity-100"}`}
            aria-hidden={!isNavExpanded}
          >
            {navItems.map(({ name, target }) => (
              <li key={name}>
                <a
                  href={`#${target}`}
                  onClick={(e) => handleScrollIntoView(e, target)}
                  className="text-sm text-gray hover:text-custom-white focus-visible:text-custom-white transition-all duration-200 ease-in"
                  tabIndex={isNavExpanded ? 1 : -1}
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
          {isMobile && (
            <button
              type="button"
              aria-expanded={isNavExpanded}
              aria-controls="nav-ul"
              aria-label={
                isNavExpanded ? "Collapse navigation" : "Expand navigation"
              }
              className="nav-expand-btn"
              onClick={handleNavExpand}
            >
              {isNavExpanded ? (
                <MdOutlineKeyboardArrowUp aria-hidden="true" />
              ) : (
                <MdOutlineKeyboardArrowDown aria-hidden="true" />
              )}
            </button>
          )}
        </div>

        <div className="flex justify-end gap-7 flex-1">
          <img
            src={searchImg}
            alt="search"
            width={18}
            height={18}
            className="cursor-pointer custom-ring block"
            tabIndex={1}
          />
          <img
            src={bagImg}
            alt="bag"
            width={18}
            height={18}
            className="cursor-pointer custom-ring block"
            tabIndex={1}
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
