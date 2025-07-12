import { useMediaQuery } from "react-responsive";
import { featureLists, goodLists } from "../constants/index";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";

const Art = ({ scrollRef, responsive }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const artRef = useRef(null);
  const maskedContentRef = useRef(null);
  const maskedImageRef = useRef(null);

  useGSAP(
    () => {
      const image = maskedImageRef.current;
      const willFades = artRef.current.querySelectorAll(".will-fade");
      const art = artRef.current;
      const content = maskedContentRef.current;

      if (!image || !willFades || !art || !content) return;

      const runAnimation = () => {
        const start = isMobile ? "top 20%" : "top top";

        const toKill = [art, image, willFades, content];

        gsap.killTweensOf(toKill);
        ScrollTrigger.getById("art-trigger")?.kill();

        const maskTimeline = gsap.timeline({
          scrollTrigger: {
            id: "art-trigger",
            trigger: art,
            start,
            end: "bottom center",
            scrub: 1.5,
            pin: true,
          },
        });

        if (!isMobile) {
          maskTimeline.fromTo(
            willFades,
            {
              opacity: 1,
            },
            {
              opacity: 0,
              stagger: 0.2,
              ease: "power1.inOut",
              onUpdate: () => {
                artRef.current.querySelectorAll(".will-fade").forEach((el) => {
                  const opacity = parseFloat(getComputedStyle(el).opacity);
                  el.setAttribute(
                    "aria-hidden",
                    opacity < 0.05 ? "true" : "false"
                  );
                });
              },
            }
          );
        } else {
          gsap.set(willFades, { opacity: 1 });
        }

        maskTimeline.fromTo(
          image,
          {
            maskSize: "50%",
            maskPosition: "center",
          },
          {
            scale: 1.3,
            maskPosition: "center",
            maskSize: "400%",
            duration: 1,
            ease: "power1.inOut",
          }
        );

        if (!isMobile) {
          maskTimeline.fromTo(
            content,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 1,
              ease: "power1.inOut",
            }
          );
        } else {
          gsap.set(content, { opacity: 1 });
        }
      };

      // to be sure that the image loads properly first before firing off the animation
      if (image?.complete) {
        runAnimation();
      } else {
        image.onload = runAnimation;
      }
    },
    {
      scope: artRef,
      dependencies: [responsive],
    }
  );

  return (
    <section
      ref={(el) => {
        scrollRef.current = el;
        artRef.current = el;
      }}
      id="art"
    >
      <div className="container mx-auto pt-20">
        <h2 className="will-fade">The ART</h2>

        <div className="content">
          <div className="pl-[15%] sm:pl-[0%]">
            <h3 className="mb-4 text-xl will-fade">Why We Stand Out</h3>
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
              ref={maskedImageRef}
            />
          </div>

          <div className="pl-[15%] sm:pl-[0%]">
            <h3 className="mb-4 text-xl will-fade">What We Offer</h3>
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
            ref={maskedContentRef}
            className={`flex flex-col items-center ${
              !isMobile ? "absolute -translate-x-1/2" : "mt-10"
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
