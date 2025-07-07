import { useMediaQuery } from "react-responsive";
import { featureLists, goodLists } from "../constants/index";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const Art = ({ scrollRef }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const artRef = useRef(null);
  const maskedContentRef = useRef(null);
  const maskedImageRef = useRef(null);
  const willFadeRef = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  useGSAP(
    () => {
      const start = isMobile ? "top 20%" : "top top";

      const maskTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: artRef.current,
          start,
          end: "bottom center",
          scrub: 1.5,
          pin: true,
        },
      });

      if (!isMobile) {
        maskTimeline.to(
          willFadeRef.map((ref) => ref.current),
          {
            opacity: 0,
            stagger: 0.2,
            ease: "power1.inOut",
            onUpdate: () => {
              // handling aria-hidden
              willFadeRef.forEach((ref) => {
                const opacity = parseFloat(
                  getComputedStyle(ref.current).opacity
                );
                ref.current.setAttribute(
                  "aria-hidden",
                  opacity < 0.05 ? "true" : "false"
                );
              });
            },
          }
        );
      }

      maskTimeline.to(maskedImageRef.current, {
        scale: 1.3,
        maskPosition: "center",
        maskSize: "400%",
        duration: 1,
        ease: "power1.inOut",
      });
      if (!isMobile) {
        maskTimeline.to(maskedContentRef.current, {
          opacity: 1,
          duration: 1,
          ease: "power1.inOut",
        });
      }
    },
    {
      scope: artRef,
      dependencies: [],
    }
  );

  return (
    <section
      ref={(el) => {
        scrollRef.current = el;
        artRef.current = el;
      }}
      aria-labelledby="art-heading"
      id="art"
    >
      <div className="container mx-auto pt-20">
        <h2 id="art-heading" ref={willFadeRef[0]}>
          The ART
        </h2>

        <div className="content">
          <div className="pl-[15%] sm:pl-[0%]">
            <h3 ref={willFadeRef[1]} className="mb-4 text-xl">
              Why We Stand Out
            </h3>
            <ul ref={willFadeRef[2]} className="space-y-4">
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
            <h3 ref={willFadeRef[3]} className="mb-4 text-xl">
              What We Offer
            </h3>
            <ul ref={willFadeRef[4]} className="space-y-4">
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
          <h3
            ref={willFadeRef[5]}
            className={`${!isMobile ? "block" : "hidden"}`}
          >
            Sip-Worthy Perfection
          </h3>
          <div
            id="masked-content"
            ref={maskedContentRef}
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
