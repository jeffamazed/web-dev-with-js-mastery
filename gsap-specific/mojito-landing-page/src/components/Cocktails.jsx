import { useMediaQuery } from "react-responsive";
import { cocktailLists, mockTailLists } from "../constants";
import extractPriceValue from "../utils/extractPriceValue";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const Cocktails = ({ scrollRef }) => {
  const cocktailsRef = useRef(null);
  const cocktailsLeftLeafRef = useRef(null);
  const cocktailsRightLeafRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const startValue = isMobile ? "10% 30%" : "top 30%";
  const endValue = isMobile ? "80% 50%" : "bottom 80%";

  useGSAP(
    () => {
      const parallaxTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: cocktailsRef.current,
          start: startValue,
          end: endValue,
          scrub: true,
        },
      });

      parallaxTimeline
        .from(cocktailsLeftLeafRef.current, {
          x: -100,
          y: 100,
        })
        .from(cocktailsRightLeafRef.current, {
          x: 100,
          y: 100,
        });
    },
    {
      scope: cocktailsRef,
      dependencies: [],
    },
  );

  return (
    <section
      id="cocktails"
      ref={(el) => {
        scrollRef.current = el;
        cocktailsRef.current = el;
      }}
      className="noisy"
    >
      <h2 className="sr-only">Crafted for Taste, Served with Style</h2>
      <img
        src="./images/cocktail-left-leaf.png"
        alt="left leaf"
        id="c-left-leaf"
        ref={cocktailsLeftLeafRef}
      />
      <img
        src="./images/cocktail-right-leaf.png"
        alt="right leaf"
        id="c-right-leaf"
        ref={cocktailsRightLeafRef}
      />
      <div className="list">
        <article className="popular">
          <h3>Must-Try Cocktail Creations</h3>
          <ul>
            {cocktailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="md:me-28">
                  <h4>{name}</h4>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                <data value={extractPriceValue(price)}>— {price}</data>
              </li>
            ))}
          </ul>
        </article>

        <article className="loved">
          <h3>Zero-Proof, Full Flavor</h3>
          <ul>
            {mockTailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="me-28">
                  <h4>{name}</h4>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                <data value={extractPriceValue(price)}>— {price}</data>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
};

export default Cocktails;
