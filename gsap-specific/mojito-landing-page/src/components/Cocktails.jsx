import { useMediaQuery } from "react-responsive";
import { cocktailLists, mockTailLists } from "../constants";
import extractPriceValue from "../utils/extractPriceValue";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Cocktails = ({ scrollRef }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const startValue = isMobile ? "10% 30%" : "top 30%";
  const endValue = isMobile ? "80% 50%" : "bottom 80%";

  useGSAP(() => {
    const parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#cocktails",
        start: startValue,
        end: endValue,
        scrub: true,
      },
    });

    parallaxTimeline
      .from("#c-left-leaf", {
        x: -100,
        y: 100,
      })
      .from("#c-right-leaf", {
        x: 100,
        y: 100,
      });

    return () => {
      if (parallaxTimeline) parallaxTimeline.kill();
    };
  }, []);

  return (
    <section
      aria-labelledby="cocktails-menu-heading"
      id="cocktails"
      ref={scrollRef}
      className="noisy"
    >
      <h2 className="sr-only" id="cocktails-menu-heading">
        Crafted for Taste, Served with Style
      </h2>
      <img
        src="./images/cocktail-left-leaf.png"
        alt="left leaf"
        id="c-left-leaf"
      />
      <img
        src="./images/cocktail-right-leaf.png"
        alt="right leaf"
        id="c-right-leaf"
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
