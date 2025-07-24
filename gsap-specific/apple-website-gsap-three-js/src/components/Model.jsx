import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import ModelView from "./ModelView";
import { yellowImg } from "../utils";
import { Group } from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants/index";
import { animateWithGsapTimeline, headingTimeline } from "../utils/animations";

const Model = ({ isMobile, modelRef }) => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE789", "#6F6C64"],
    colorName: ["Natural Titanium", "Warm Alloy", "Earth Titanium"],
    img: yellowImg,
  });
  const [isLoading, setIsLoading] = useState(true);

  // ref for views
  const view1Ref = useRef(null);
  const view2Ref = useRef(null);

  // camera control for model view
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  // model
  const small = useRef(new Group());
  const large = useRef(new Group());

  // rotation value for each model
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const headingRef = useRef(null);

  // animation for changing iphone size
  const tl = gsap.timeline();

  useEffect(() => {
    if (size === "large") {
      animateWithGsapTimeline(tl, small, smallRotation, view1Ref, view2Ref, {
        transform: "translateX(-100%)",
        duration: 2,
      });
    }

    if (size === "small") {
      animateWithGsapTimeline(tl, large, largeRotation, view2Ref, view1Ref, {
        transform: "translateX(0)",
        duration: 2,
      });
    }
  }, [size, largeRotation, smallRotation, tl]);

  // animation for heading
  useGSAP(
    () => {
      const heading = headingRef.current;
      const model = modelRef.current;
      if (!heading || !model) return;
      ScrollTrigger.getById("model-trigger")?.kill();

      const startValue = isMobile ? "top 70%" : "top 50%";

      const tl = headingTimeline(model, "model-trigger", startValue);

      tl.to(heading, { y: 0, opacity: 1 });
    },
    { scope: modelRef, dependencies: [isMobile] },
  );

  return (
    <section id="iphone" className="common-padding" ref={modelRef}>
      <div className="container mx-auto">
        {/* instruction for sr users */}
        <div
          role="region"
          aria-label="3D model viewer status"
          className="sr-only"
          aria-live="polite"
        >
          {isLoading
            ? "3D model is loading. Please wait."
            : `3D model loaded: ${model.title}. You may rotate it using mouse or touch.`}
        </div>

        <h2 ref={headingRef} className="section-heading">
          Take a closer look.
        </h2>

        <article className="flex flex-col items-center mt-5">
          {/* CHANGE TO VH IF PROBLEM ARISE */}
          <div className="w-full h-[75dvh] md:h-[90dvh] relative overflow-hidden">
            <ModelView
              index={1}
              groupRef={small}
              viewRef={view1Ref}
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
              onLoaded={() => setIsLoading(false)}
            />
            <ModelView
              index={2}
              groupRef={large}
              viewRef={view2Ref}
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
              onLoaded={() => setIsLoading(false)}
            />

            <Canvas
              className="size-full"
              style={{
                position: "fixed",
                overflow: "hidden",
                inset: 0,
              }}
              eventSource={document.getElementById("root")}
            >
              <View.Port />
            </Canvas>
          </div>

          {/* bottom section */}
          <div className="mx-auto w-full">
            <h3 className="text-sm font-light text-center mb-5">
              {model.title}
            </h3>

            {/* CHECK THE BUTTON SEMANTICS */}
            <div
              className="flex-center gap-3"
              role="group"
              aria-label="Choose model options"
            >
              <ul className="color-container" role="radiogroup">
                {models.map((item, i) => (
                  <li key={i} className="flex-center">
                    <button
                      type="button"
                      className="w-6 h-6 rounded-full cursor-pointer hover:animate-bop focus-visible:animate-bop active:scale-90"
                      style={{
                        backgroundColor: item.color[0],
                      }}
                      onClick={() => setModel(item)}
                      aria-label={item.colorName[0]}
                      aria-checked={item.title === model.title}
                      role="radio"
                    />
                  </li>
                ))}
              </ul>

              <ul className="size-btn-container" role="radiogroup">
                {sizes.map(({ label, value }) => (
                  <li key={label}>
                    <button
                      type="button"
                      className={`size-btn ${
                        size === value
                          ? "bg-custom-white text-black"
                          : "bg-transparent text-custom-white"
                      }`}
                      role="radio"
                      aria-checked={size === value}
                      onClick={() => setSize(value)}
                      aria-label={
                        value === "small" ? "6 point 1 inch" : "6 point 7 inch"
                      }
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Model;
