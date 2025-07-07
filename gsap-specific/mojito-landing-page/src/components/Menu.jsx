import { useRef, useState } from "react";
import { allCocktails } from "../constants/index";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

const Menu = () => {
  const contentRef = useRef(null);
  const directionRef = useRef(null);
  const sourceRef = useRef(null);
  const cockTailImageRef = useRef(null);
  const menuRef = useRef(null);
  const titleRef = useRef(null);
  const menuRightLeafRef = useRef(null);
  const menuLeftLeafRef = useRef(null);
  const totalCocktails = allCocktails.length;

  const [currentI, setCurrentI] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // animation
  useGSAP(
    () => {
      const source = sourceRef.current;
      const direction = directionRef.current;
      const cocktailImg = cockTailImageRef.current;

      if (source === "tab" && !direction) {
        gsap.fromTo(cocktailImg, { opacity: 0 }, { opacity: 1, duration: 0.8 });
      } else if (source === "button") {
        gsap.fromTo(
          cocktailImg,
          { opacity: 0, xPercent: direction === "left" ? -100 : 100 },
          { xPercent: 0, opacity: 1, duration: 0.8, ease: "power1.inOut" }
        );
      }

      gsap.fromTo(
        titleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 }
      );

      gsap.fromTo(
        ".details h4, .details p",
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 0.8, ease: "power1.inOut" }
      );
    },
    {
      scope: menuRef,
      dependencies: [currentI],
    }
  );

  // leaves
  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: menuRef.current,
            start: "top center",
            end: "80% top",
            scrub: true,
          },
        })
        .to(menuRightLeafRef.current, { y: 200 }, 0)
        .to(menuLeftLeafRef.current, { scale: 1.4 }, isMobile ? 0.4 : 0.15);
    },
    {
      scope: menuRef,
      dependencies: [],
    }
  );

  const goToSlide = (i, direction, source) => {
    const newI = (i + totalCocktails) % totalCocktails;

    directionRef.current = direction;
    sourceRef.current = source;

    setCurrentI(newI);
  };

  const getCocktailAt = (indexOffset) => {
    return allCocktails[
      (currentI + indexOffset + totalCocktails) % totalCocktails
    ];
  };

  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);

  return (
    <section ref={menuRef} id="menu" aria-labelledby="menu-heading">
      <img
        src="./images/slider-left-leaf.png"
        alt="left leaf"
        id="m-left-leaf"
        ref={menuLeftLeafRef}
      />
      <img
        src="./images/slider-right-leaf.png"
        alt="right leaf"
        id="m-right-leaf"
        ref={menuRightLeafRef}
      />

      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      <div className="cocktail-tabs" role="tablist" aria-label="Cocktail tabs">
        {allCocktails.map((cocktail, i) => {
          const isActive = i === currentI;

          return (
            <button
              role="tab"
              id={`tab-${cocktail.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${cocktail.id}`}
              className={`${
                isActive
                  ? "text-white border-white"
                  : "text-white/50 border-white/50"
              }`}
              type="button"
              key={cocktail.id}
              onClick={() => goToSlide(i, "", "tab")}
            >
              {cocktail.name}
            </button>
          );
        })}
      </div>

      <div className="content">
        <div className="arrows">
          <button
            className="text-left"
            type="button"
            onClick={() => goToSlide(currentI - 1, "left", "button")}
          >
            <span>{prevCocktail.name}</span>
            <img
              src="./images/left-arrow.png"
              alt="left arrow"
              aria-hidden="true"
            />
          </button>

          <button
            className="flex flex-col items-end text-right"
            type="button"
            onClick={() => goToSlide(currentI + 1, "right", "button")}
          >
            <span>{nextCocktail.name}</span>
            <img
              src="./images/right-arrow.png"
              alt="right arrow"
              aria-hidden="true"
            />
          </button>
        </div>

        <div
          className="cocktail"
          role="tabpanel"
          aria-labelledby={`tab-${currentCocktail.id}`}
          id={`panel-${currentCocktail.id}`}
        >
          <img
            src={currentCocktail.image}
            alt={currentCocktail.name}
            className="object-contain"
            ref={cockTailImageRef}
          />
        </div>

        <article className="recipe">
          <header ref={contentRef} className="info">
            <h3 className="text-lg md:text-xl">
              Recipe for:
              <span ref={titleRef}>{currentCocktail.name}</span>
            </h3>
          </header>

          <section
            aria-labelledby="cocktail-recipe-heading"
            className="details"
          >
            <h4 id="cocktail-recipe-heading">{currentCocktail.title}</h4>
            <p>{currentCocktail.description}</p>
          </section>
        </article>
      </div>
    </section>
  );
};

export default Menu;
