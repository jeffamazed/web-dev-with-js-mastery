import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown,
} from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import CustomizedAnchor from "./CustomizedAnchor";
import { useWindowScroll } from "react-use";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { audioButtonLines, navCollapseDuration, navItems } from "../constants";

const Navbar = ({ sectionRef }) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setisNavVisible] = useState(true);
  const [isUserClickNav, setIsUserClickNav] = useState(false);
  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);
  const collapseBtnRef = useRef(null);
  const expandBtnRef = useRef(null);
  const userTogglingNav = useRef(false);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const { y: currentScrollY } = useWindowScroll();

  // handling nav visibility
  useEffect(() => {
    const nav = navContainerRef.current;
    if (currentScrollY === 0) {
      setisNavVisible(true);
      nav.classList.remove("bg-custom-black");
    } else if (currentScrollY > lastScrollY) {
      setisNavVisible(false);
      nav.classList.remove("bg-custom-black");

      if (isMobile) setIsNavExpanded(false);
    } else if (currentScrollY < lastScrollY) {
      setisNavVisible(true);
      nav.classList.add("bg-custom-black");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY, isMobile]);

  // handling nav expanded when switching from mobile to desktop
  useEffect(() => {
    if (!isMobile) setIsNavExpanded(true);
    else setIsNavExpanded(false);
  }, [isMobile]);

  // handle audio
  useEffect(() => {
    if (isAudioPlaying) audioElementRef.current.play();
    else audioElementRef.current.pause();
  }, [isAudioPlaying]);

  // handle keyboard focus when nav is expanded
  useEffect(() => {
    if (!userTogglingNav.current) return;
    userTogglingNav.current = false;

    if (isNavExpanded && isMobile && collapseBtnRef.current) {
      collapseBtnRef.current.focus();
    } else if (!isNavExpanded && isMobile && expandBtnRef.current) {
      expandBtnRef.current.focus();
    }
  }, [isNavExpanded, isMobile]);

  // handle use click nav
  useEffect(() => {
    if (isMobile && isUserClickNav) setIsNavExpanded(false);
    setIsUserClickNav(false);
  }, [isUserClickNav, isMobile]);

  useGSAP(
    () => {
      const nav = navContainerRef.current;
      if (!nav) return;

      const movement = isNavVisible ? "0" : "-110%";
      gsap.to(nav, {
        y: movement,
        opacity: isNavVisible ? 1 : 0,
        duration: navCollapseDuration / 1000,
      });
    },
    { scope: navContainerRef, dependencies: [isNavVisible] },
  );

  const handleScrollIntoView = (e, target) => {
    const section = sectionRef[target].current;
    if (!section) return;
    e.preventDefault();
    setIsUserClickNav(true);

    const nav = navContainerRef.current;
    const navOffset = nav.getBoundingClientRect().bottom;
    const sectionTop = section.getBoundingClientRect().top + scrollY;

    window.scrollTo({ top: sectionTop - navOffset, behavior: "smooth" });
  };

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  const handleExpandNav = () => {
    setIsNavExpanded((prev) => !prev);
    userTogglingNav.current = true;
  };
  const handleTabIndex = isNavExpanded && isNavVisible ? 0 : -1;
  const navAnchorTabIndex = !isMobile
    ? 1
    : !isNavExpanded && isNavVisible
      ? 1
      : -1;

  return (
    <div
      ref={navContainerRef}
      className="fixed top-4 z-50 h-16 transition-all duration-700 inset-x-2 sm:inset-x-6 rounded-lg"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2 h-16 overflow-hidden">
        <nav className="flex size-full items-center justify-between p-4">
          {/* for sr users */}
          <span className="sr-only">
            This site uses a scroll-sensitive navigation bar. The navigation
            will reappear when scrolling up.
          </span>

          {/* nav links */}
          <div className="flex items-center justify-between w-full h-16">
            <div className="flex items-center gap-7">
              <img src="./img/logo.png" alt="logo" className="w-10" />
              <CustomizedAnchor
                id="product-button"
                href="#"
                title="Products"
                rightIcon={<TiLocationArrow aria-hidden="true" />}
                containerClass="bg-violet-50 flex-center gap-1 hover:bg-blue-75 focus-visible:bg-blue-75"
                tabIndex={navAnchorTabIndex}
              />
            </div>
            {/* toggle button */}
            {isMobile && !isNavExpanded && (
              <button
                ref={expandBtnRef}
                type="button"
                className="nav-toggle-button"
                onClick={handleExpandNav}
                aria-controls="mobile-nav"
                aria-expanded="false"
                aria-label="Expand navigation menu"
                tabIndex={isNavVisible ? 1 : -1}
              >
                <MdKeyboardDoubleArrowDown aria-hidden="true" />
              </button>
            )}

            <ul
              id="mobile-nav"
              className={`flex items-center justify-between p-4 h-16 rounded-lg absolute top-0 left-0 z-10 transition-transform duration-${navCollapseDuration} w-full bg-custom-black ${
                isNavExpanded ? "translate-y-0" : "-translate-y-full"
              } md:static md:w-fit md:gap-10 md:bg-transparent md:p-0`}
              aria-hidden={!isNavExpanded}
            >
              {navItems.map(({ name, target }) => (
                <li key={name} className="flex items-center">
                  <a
                    className="nav-hover-btn custom-ring"
                    href={`#${target}`}
                    onClick={(e) => handleScrollIntoView(e, target)}
                    tabIndex={handleTabIndex}
                  >
                    {name}
                  </a>
                </li>
              ))}
              {/* audio button */}
              <li>
                <button
                  type="button"
                  className="flex items-center space-x-0.5 cursor-pointer py-[12px] custom-ring"
                  onClick={toggleAudioIndicator}
                  aria-label={
                    isAudioPlaying
                      ? "Turn off background music"
                      : "Turn on background music"
                  }
                  tabIndex={handleTabIndex}
                >
                  <audio
                    ref={audioElementRef}
                    src="./audio/loop.mp3"
                    className="hidden"
                    loop
                    preload="auto"
                  />
                  {audioButtonLines.map((bar) => (
                    <div
                      key={bar}
                      aria-hidden="true"
                      className={`indicator-line ${
                        isIndicatorActive ? "bgm-active" : ""
                      }`}
                      style={{ animationDelay: `${bar * 0.1}s` }}
                    />
                  ))}
                </button>
              </li>
              {/* toggle button */}

              {isMobile && (
                <li>
                  <button
                    ref={collapseBtnRef}
                    type="button"
                    className="nav-toggle-button"
                    onClick={handleExpandNav}
                    aria-controls="mobile-nav"
                    aria-expanded="true"
                    aria-label="Collapse navigation menu"
                    tabIndex={handleTabIndex}
                  >
                    <MdKeyboardDoubleArrowUp aria-hidden="true" />
                  </button>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
