import { useMediaQuery } from "react-responsive";
import { navItems } from "../constants";
import { appleImg, bagImg, searchImg } from "../utils";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useEffect, useState } from "react";

const Navbar = ({ sectionRef }) => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

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

  const headerShadow = !isMobile
    ? "shadow-md shadow-zinc-800/30"
    : isNavExpanded
    ? ""
    : "shadow-md shadow-zinc-800/30";

  return (
    <header
      className={`w-full flex-center fixed z-50 bg-zinc/80 ${headerShadow}`}
    >
      <nav className="flex items-center justify-between w-full screen-max-width py-5 relative">
        <a
          href="https://www.apple.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="block ms-5 sm:ms-10 custom-ring flex-1"
          aria-label="Apple"
        >
          <img src={appleImg} alt="Apple logo" width={14} height={18} />
        </a>

        <div
          className={`absolute top-[100%] -z-10 size-full flex-center transition-transform duration-200 bg-zinc/80 flex-1 ${
            isNavExpanded ? "translate-y-0" : "-translate-y-[100%]"
          } ${!isMobile && "static w-fit z-auto"}`}
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
                  className="custom-ring text-sm text-gray hover:text-custom-white transition-all duration-200"
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
              className="cursor-pointer absolute top-[100%] px-3 text-xs border-2 border-gray-200/10 hover:border-gray-200/40 transition-colors duration-200 rounded-sm custom-ring"
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

        <div className="flex justify-end gap-7 me-5 sm:me-10 flex-1">
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
