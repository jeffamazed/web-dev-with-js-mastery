import { useMediaQuery } from "react-responsive";
import { featureLists, goodLists } from "../constants/index";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Art = ({ scrollRef }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const start = isMobile ? "top 20%" : "top top";

    const maskTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#art",
        start,
        end: "bottom center",
        scrub: 1.5,
        pin: true,
      },
    });

    if (!isMobile) {
      maskTimeline.to(".will-fade", {
        opacity: 0,
        stagger: 0.2,
        ease: "power1.inOut",
        onUpdate: () => {
          document.querySelectorAll(".will-fade").forEach((el) => {
            const opacity = parseFloat(getComputedStyle(el).opacity);
            el.setAttribute("aria-hidden", opacity < 0.05 ? "true" : "false");
          });
        },
      });
    }

    maskTimeline.to(".masked-img", {
      scale: 1.3,
      maskPosition: "center",
      maskSize: "400%",
      duration: 1,
      ease: "power1.inOut",
    });
    if (!isMobile) {
      maskTimeline.to("#masked-content", {
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
      });
    }
  });

  return (
    <section ref={scrollRef} aria-labelledby="art-heading" id="art">
      <div className="container mx-auto pt-20">
        <h2 id="art-heading" className="will-fade">
          The ART
        </h2>

        <div className="content">
          <div className="pl-[15%] sm:pl-[0%]">
            <h3 className="will-fade mb-4 text-xl">Why We Stand Out</h3>
            <ul className="space-y-4 will-fade">
              {goodLists.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <img src="./images/check.png" alt="check" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="cocktail-img">
            <img
              src="./images/under-img.jpg"
              alt="cocktail"
              className="abs-center masked-img size-full object-contain"
            />
          </div>

          <div className="pl-[15%] sm:pl-[0%]">
            <h3 className="will-fade mb-4 text-xl">What We Offer</h3>
            <ul className="space-y-4 will-fade">
              {featureLists.map((feature, i) => (
                <li key={i} className="flex items-center justify-start gap-2">
                  <img
                    src="./images/check.png"
                    alt="check"
                    aria-hidden="true"
                  />
                  <span className="md:w-fit w-60">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="masked-container">
          <h3 className={`will-fade ${!isMobile ? "block" : "hidden"}`}>
            Sip-Worthy Perfection
          </h3>
          <div
            id="masked-content"
            className={`flex flex-col items-center ${
              !isMobile ? "opacity-0 absolute -translate-x-1/2" : "mt-10"
            }`}
          >
            <h3>Made with Craft, Poured with Passion</h3>
            <p>
              This isn't just a drink. It's a carefully crafted moment made just
              for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Art;
