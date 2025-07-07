import { useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";
import { navItems } from "../constants";

const Navbar = ({ sectionRef }) => {
  const navContainer = useRef(null);

  const handleScrollIntoView = (e, target) => {
    const section = sectionRef[target].current;
    if (!section) return;
    e.preventDefault();
    const nav = navContainer.current;
    const navOffset = nav.getBoundingClientRect().bottom;
    const sectionTop = section.getBoundingClientRect().top + scrollY;

    window.scrollTo({ top: sectionTop - navOffset, behavior: "smooth" });
  };

  return (
    <div
      ref={navContainer}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6 bg-black/50"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src="./img/logo.png" alt="logo" className="w-10" />
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1 hover:bg-blue-75 focus:bg-blue-100"
            />
          </div>

          {/* nav links */}
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map(({ name, target }) => (
                <a
                  key={name}
                  className="nav-hover-btn"
                  href={`#${target}`}
                  onClick={(e) => handleScrollIntoView(e, target)}
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
