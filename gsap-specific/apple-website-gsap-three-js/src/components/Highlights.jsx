import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const Highlights = () => {
  const highlightsRef = useRef(null);
  const titleRef = useRef(null);
  useGSAP(
    () => {
      const title = titleRef.current;
      if (!title) return;

      gsap.to(title, { opacity: 1, y: 0 });
    },
    { scope: titleRef, dependencies: [] }
  );

  return (
    <section
      id="highlights"
      className="w-full h-full overflow-x-hidden common-padding bg-zinc"
      ref={highlightsRef}
    >
      <div className="container mx-auto chk">
        <div>
          <h2 ref={titleRef} className="section-heading">
            Get the highlights.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
