import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import VideoCarousel from "./VideoCarousel";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { headingTimeline } from "../utils/animations";

const Highlights = ({ highlightsRef, responsive, isMobile }) => {
  const titleRef = useRef(null);
  const linkContainerRef = useRef(null);

  // handle animation for titles
  useGSAP(
    () => {
      const title = titleRef.current;
      const highlights = highlightsRef.current;
      const links = linkContainerRef.current.querySelectorAll(".link");
      if (!title || !highlights || !links || !links.length) return;
      // ensures fresh scroll trigger
      ScrollTrigger.getById("highlights-trigger")?.kill();

      const startValue = isMobile ? "top 70%" : "top 50%";

      const tl = headingTimeline(highlights, "highlights-trigger", startValue);

      tl.to(
        title,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power1.inOut",
        },
        0
      ).to(
        links,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power1.inOut",
          stagger: 0.15,
        },
        0
      );
    },
    { scope: titleRef, dependencies: [isMobile] }
  );

  return (
    <section
      id="highlights"
      className="w-full h-full common-padding bg-zinc"
      ref={highlightsRef}
    >
      <div className="container mx-auto">
        <div className="mb-12 w-full md:flex items-center justify-between gap-10">
          <h2 ref={titleRef} className="section-heading">
            Get the highlights.
          </h2>

          <div
            className="flex flex-wrap md:justify-center gap-x-5 gap-y-2"
            ref={linkContainerRef}
          >
            <a href="/" className="link">
              Watch the film
              <FaRegCirclePlay aria-hidden="true" />
            </a>
            <a href="/" className="link">
              Watch the event <MdKeyboardArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <VideoCarousel responsive={responsive} isMobile={isMobile} />
      </div>
    </section>
  );
};

export default Highlights;
