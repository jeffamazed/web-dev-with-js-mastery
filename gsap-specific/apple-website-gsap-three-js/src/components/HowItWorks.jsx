import { useRef } from "react";
import { chipImg, frameImg, frameVideo } from "../utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animateWithGsap, videoAnimation } from "../utils/animations";

const HowItWorks = ({ responsive, videoRefs, howItWorksRef }) => {
  const chipContainerRef = useRef(null);
  const textContainerRef = useRef(null);

  useGSAP(
    () => {
      const chipContainer = chipContainerRef.current;
      const texts = howItWorksRef.current.querySelectorAll(".g_fadeIn");
      const textContainer = textContainerRef.current;
      const howItWorksVideo = videoRefs[2].current;
      if (
        !chipContainer ||
        !texts ||
        !texts.length ||
        !textContainer ||
        !howItWorksVideo
      )
        return;

      const triggerIds = [
        "chip-trigger",
        "texts-trigger-2",
        "how-it-works-video-trigger",
      ];

      // fresh scrolltrigger
      triggerIds.forEach((id) => {
        ScrollTrigger.getById(id)?.kill();
      });

      // clear prev styles
      gsap.set(chipContainer, { clearProps: "all" });
      gsap.set(texts, { clearProps: "all" });

      // animate chip image
      gsap.from(chipContainer, {
        scrollTrigger: {
          trigger: chipContainer,
          start: "20% bottom",
          id: "chip-trigger",
        },
        opacity: 0,
        scale: 2,
        duration: 1,
        ease: "power2.inOut",
      });

      // animate texts
      animateWithGsap(
        texts,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        textContainer,
        { id: "texts-trigger-2" }
      );

      // animate video
      videoAnimation(
        howItWorksVideo,
        "how-it-works-video-trigger",
        "top bottom",
        "bottom top"
      );
    },
    {
      scope: howItWorksRef,
      dependencies: [responsive.width, responsive.height],
    }
  );
  return (
    <section ref={howItWorksRef} className="common-padding">
      <div className="container mx-auto">
        <div ref={chipContainerRef} className="flex-center w-full my-20">
          <img src={chipImg} alt="iPhone chip" width={180} height={180} />
        </div>

        <div className="flex flex-col items-center ">
          <h2 className="hiw-title">
            <span className="block">A17 Pro chip.</span>
            <span className="block">A monster win for gaming.</span>
          </h2>

          <p className="hiw-subtitle">
            The time has come. The biggest redesign in the history of Apple
            GPUs.
          </p>
        </div>

        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex-center">
            <div className="overflow-hidden">
              <img
                src={frameImg}
                alt="iPhone frame"
                className="bg-transparent relative z-10"
              />
            </div>
            {/* video */}
            <div className="hiw-video">
              <video
                ref={videoRefs[2]}
                className="pointer-events-none size-full"
                playsInline
                preload="none"
                muted
                autoPlay
                tabIndex={-1}
              >
                <source src={frameVideo} type="video/mp4" />
              </video>
            </div>
          </div>
          <p className="text-gray font-semibold text-center mt-3">
            Honkai: Star Rail
          </p>

          <div className="hiw-text-container" ref={textContainerRef}>
            {/* first para */}
            <div className="flex flex-1 justify-center flex-col gap-8">
              <p className="hiw-text g_fadeIn">
                A17 Pro is an entirely new class of iPhone chip that delivers
                our{" "}
                <span className="text-custom-white">
                  best graphic performance by far.
                </span>
              </p>
              {/* second para */}
              <p className="hiw-text g_fadeIn">
                Mobile{" "}
                <span className="text-custom-white">
                  games will look and feel so immersive,{" "}
                </span>
                with incredibly detailed environments and characters and more
                realistic characters. And with industry-leading speed and
                efficiency, A17 Pro takes fast and runs with it.
              </p>
            </div>

            <div className="flex-1 flex justify-center flex-col g_fadeIn w-full">
              <p className="md:text-end">
                <span className="block hiw-text">New</span>
                <span className="block hiw-bigtext">Pro-class GPU</span>
                <span className="block hiw-text">with 6 cores</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
