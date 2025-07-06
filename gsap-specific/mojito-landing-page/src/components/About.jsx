import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";
import gsap from "gsap";

const About = ({ scrollRef }) => {
  useGSAP(() => {
    const ctx = gsap.context(() => {
      let titleSplit;
      document.fonts.ready.then(() => {
        titleSplit = new SplitText("#about h2", { type: "words" });

        const titleTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: "#about",
            start: "top center",
          },
        });

        titleTimeline.from(titleSplit.words, {
          opacity: 0,
          duration: 1,
          yPercent: 100,
          ease: "expo.out",
          stagger: 0.02,
        });

        ctx.add(() => titleSplit.revert());
      });

      const gridTimeline = gsap.timeline({
        delay: 0.5,
        scrollTrigger: {
          trigger: "#about",
          start: "top center +=100",
        },
      });

      gridTimeline.from(".top-grid div, .bottom-grid div", {
        opacity: 0,
        duration: 1.5,
        ease: "power1.inOut",
        stagger: 0.04,
      });
    });

    //cleanup
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scrollRef} id="about" aria-labelledby="about-heading">
      <div className="mb-16 md:px-0 px-5">
        <div className="content">
          <header className="lg:col-span-8">
            <span className="badge">Best Cocktails</span>
            <h2 id="about-heading">
              Where craftsmanship meets elegance{" "}
              <span className="text-white">—</span> from muddle to garnish
            </h2>
          </header>
          <div className="sub-content">
            <p>
              Every cocktail we serve is a testament to uncompromising
              craftsmanship — meticulously curated from the first muddle to the
              final flourish. It's this devotion to detail that elevates a drink
              into a true experience.
            </p>

            <aside aria-label="Customer rating">
              <p className="md:text-3xl text-xl font-bold">
                <span>4.5</span>/5
              </p>
              <p className="text-sm text-white-100">
                <strong className="font-semibold">
                  More than +20000 customers
                </strong>
              </p>
            </aside>
          </div>
        </div>
      </div>
      <div className="top-grid">
        <div className="lg:col-span-3 w-full">
          {/* overlay */}
          <div className="noisy" />
          <img src="./images/abt1.png" alt="Bartender bartending" />
        </div>

        <div className="lg:col-span-6">
          {/* overlay */}
          <div className="noisy" />
          <img src="./images/abt2.png" alt="People having fun" />
        </div>

        <div className="lg:col-span-3">
          {/* overlay */}
          <div className="noisy" />
          <img src="./images/abt5.png" alt="Pro bartender styling" />
        </div>
      </div>

      <div className="bottom-grid">
        <div className="lg:col-span-8">
          {/* overlay */}
          <div className="noisy" />
          <img src="./images/abt3.png" alt="Drinks in style" />
        </div>

        <div className="lg:col-span-4">
          {/* overlay */}
          <div className="noisy" />
          <img src="./images/abt4.png" alt="Favorite cocktail" />
        </div>
      </div>
    </section>
  );
};

export default About;
