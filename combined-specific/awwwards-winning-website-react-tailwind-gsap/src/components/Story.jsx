import { useRef } from "react";
import { generateTitle } from "../utils/generateTitle";
import AnimatedTitle from "./AnimatedTitle";
import gsap from "gsap";
import RoundedCorners from "./RoundedCorners";
import CustomizedAnchor from "./CustomizedAnchor";
import isTouchDevice from "../utils/isTouchDevice";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

const Story = ({ windowSize, scrollRef }) => {
  const frameRef = useRef(null);
  const storyRef = useRef(null);
  const paraRef = useRef(null);
  const anchorRef = useRef(null);

  useGSAP(
    () => {
      const story = storyRef.current;
      const para = paraRef.current;
      const anchor = anchorRef.current;
      const toKill = [story, para, anchor];
      if (!story || !para || !anchor) return;

      // kill previous scrolltrigger and tweens to prevent duplicates
      gsap.killTweensOf(toKill);
      ScrollTrigger.getById("story-trigger")?.kill();

      const tl = gsap.timeline({
        defaults: { ease: "power1.inOut" },
        scrollTrigger: {
          id: "story-trigger",
          trigger: story,
          start: "bottom 80%",
          end: "bottom 45%",
          scrub: true,
        },
      });

      tl.fromTo(
        story,
        { backgroundColor: "#0a0a0a" },
        { backgroundColor: "#F6E85D" },
        "start"
      )
        .fromTo(para, { color: "#dfdff0" }, { color: "#0a0a0a" }, "start")
        .fromTo(
          anchor,
          { color: "#0a0a0a", backgroundColor: "#f5f3ff" },
          { color: "#dfdff0", backgroundColor: "#0a0a0a" },
          "start"
        );
    },
    {
      scope: storyRef,
      dependencies: [windowSize],
    }
  );

  const handlePointerLeave = () => {
    const el = frameRef.current;
    if (!el) return;

    gsap.to(el, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      ease: "power1.inOut",
    });
  };

  const handlePointerMove = (e) => {
    const { clientX, clientY } = e;
    const el = frameRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(el, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleTouchStart = () => {
    const el = frameRef.current;
    if (!el) return;

    gsap.to(el, {
      duration: 0.3,
      scale: 1.05,
      ease: "power1.out",
    });
  };

  const handleTouchEnd = () => {
    const el = frameRef.current;
    if (!el) return;

    gsap.to(el, {
      duration: 0.3,
      scale: 1,
      ease: "power1.inOut",
    });
  };

  const title = "The St(o)ry of<br />a Hidden Real(m)";
  return (
    <section
      ref={(el) => {
        storyRef.current = el;
        scrollRef.current = el;
      }}
      id="prologue"
      className="min-h-dvh w-full text-blue-50"
    >
      <div className="flex size-full flex-col items-center py-10 text-center relative">
        <header className="flex flex-col gap-5 w-full">
          <h2 className="font-general text-xs uppercase lg:text-sm">
            the multiversal ip world
          </h2>
          <AnimatedTitle
            title={generateTitle(title)}
            containerClass="text-blue-50 mix-blend-difference relative z-10"
            id="story-title"
            windowSize={windowSize}
          />
        </header>
        <div className="story-img-container">
          <div className="story-img-mask">
            <div className="story-img-content">
              <img
                ref={frameRef}
                onPointerLeave={
                  !isTouchDevice() ? handlePointerLeave : undefined
                }
                onPointerUp={!isTouchDevice() ? handlePointerLeave : undefined}
                onPointerEnter={
                  !isTouchDevice() ? handlePointerLeave : undefined
                }
                onPointerMove={!isTouchDevice() ? handlePointerMove : undefined}
                onTouchStart={isTouchDevice() ? handleTouchStart : undefined}
                onTouchEnd={isTouchDevice() ? handleTouchEnd : undefined}
                src="/img/entrance.webp"
                alt="Entrance"
                className="object-contain"
              />
            </div>
          </div>

          <RoundedCorners />
        </div>

        <div className=" flex w-full justify-center md:justify-end">
          <div className="flex h-full gap-5 w-fit flex-col items-center md:items-start px-8">
            <p
              ref={paraRef}
              className="max-w-sm text-center font-circular-web md:text-start"
            >
              Where realms converge, lies Zentry and the boundless pillar.
              Discover its secrets and shape your fate amidst infinite
              opportunities.
            </p>
            <CustomizedAnchor
              ref={anchorRef}
              href="#"
              id="realm-button"
              title="discover prologue"
              containerClass="hover:bg-blue-75 focus:bg-blue-75"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
