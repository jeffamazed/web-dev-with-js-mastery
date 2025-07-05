import { useRef, useState } from "react";
import { allCocktails } from "../constants/index";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

const Menu = () => {
  const contentRef = useRef(null);
  const [currentI, setCurrentI] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // animation
  useGSAP(() => {
    gsap.fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 1 });
    gsap.fromTo(
      ".cocktail img",
      { opacity: 0, xPercent: -100 },
      { xPercent: 0, opacity: 1, duration: 1, ease: "power1.inOut" }
    );
    gsap.fromTo(
      ".details h4, .details p",
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, ease: "power1.inOut" }
    );

    // animate leaves
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#menu",
          start: "top center",
          end: "80% top",
          scrub: true,
        },
      })
      .to("#m-right-leaf", { y: 200 }, 0)
      .to("#m-left-leaf", { scale: 1.4 }, isMobile ? 0.4 : 0.15);
  }, [currentI]);

  const totalCocktails = allCocktails.length;

  const goToSlide = (i) => {
    const newI = (i + totalCocktails) % totalCocktails;

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
    <section id="menu" aria-labelledby="menu-heading">
      <img
        src="./images/slider-left-leaf.png"
        alt="left leaf"
        id="m-left-leaf"
      />
      <img
        src="./images/slider-right-leaf.png"
        alt="right leaf"
        id="m-right-leaf"
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
              onClick={() => goToSlide(i)}
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
            onClick={() => goToSlide(currentI - 1)}
          >
            <span>{prevCocktail.name}</span>
            <img
              src="./images/left-arrow.png"
              alt="left arrow"
              aria-hidden="true"
            />
          </button>

          <button
            className="text-left"
            type="button"
            onClick={() => goToSlide(currentI + 1)}
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
          />
        </div>

        <article className="recipe">
          <header ref={contentRef} className="info">
            <h3 className="text-lg md:text-xl">
              Recipe for:
              <span id="title">{currentCocktail.name}</span>
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
