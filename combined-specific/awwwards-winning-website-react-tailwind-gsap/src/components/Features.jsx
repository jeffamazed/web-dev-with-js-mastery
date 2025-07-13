import { TiLocationArrow } from "react-icons/ti";
import { featuresData } from "../constants";
import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import CustomizedAnchor from "./CustomizedAnchor";
import useAutoPauseVideo from "../customHooks/useAutoPauseVideo";

const BentoTilt = ({ children, className = "", as = "div" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);
  const Tag = as;
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handlePointerMove = (e) => {
    if (!itemRef.current) return;
    itemRef.current.blur();

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltPower = 10;
    const tiltX = (relativeY - 0.5) * tiltPower;
    const tiltY = (relativeX - 0.5) * -tiltPower;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3D(0.97, 0.97, 0.97)`;
    setTransformStyle(newTransform);
  };

  const handlePointerLeave = () => {
    setTransformStyle("");
  };

  return (
    <Tag
      ref={itemRef}
      {...(!isMobile && {
        onPointerMove: handlePointerMove,
        onPointerLeave: handlePointerLeave,
      })}
      className={`will-change-transform ${className} ${
        isMobile ? "bento-bop-mobile" : "bento-bop-desktop"
      } custom-ring`}
      style={{
        transform: isMobile ? "" : transformStyle,
        transformStyle: "preserve-3d",
        WebkitFontSmoothing: "antialiased",
        backfaceVisibility: "hidden",
      }}
      tabIndex="0"
    >
      {children}
    </Tag>
  );
};

const BentoCard = ({ src, title, description }) => {
  const videoRef = useAutoPauseVideo({ threshold: 0 });

  return (
    <article className="relative size-full">
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        autoPlay
        playsInline
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div className="">
          <h3 className="bento-title special-font">{title}</h3>
          {description && (
            <p className="mt-3 max-w-64 text-xs lg:text-sm backdrop-blur-xs bg-black/30 py-1.5 px-2 rounded-md">
              {description}
            </p>
          )}
        </div>
        <CustomizedAnchor
          href="#"
          title="coming soon"
          leftIcon={<TiLocationArrow aria-hidden="true" />}
          containerClass="flex-center gap-1 bg-custom-black !text-blue-50 bento-button-effect"
        />
      </div>
    </article>
  );
};

const Features = ({ scrollRef }) => {
  const videoRef = useAutoPauseVideo({ threshold: 0 });
  return (
    <section
      className="bg-custom-black pb-42 md:pb-48"
      ref={scrollRef}
      id="features"
    >
      <div className="mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <h2 className="font-circular-web text-lg lg:text-xl text-blue-50 mb-1">
            Into the Metagame Layer
          </h2>
          <p className="max-w-md font-circular-web text-sm lg:text-base text-blue-50 opacity-50">
            Enter a boundless and ever-evolving universe where a dynamic
            constellation of products fuses into an intelligent overlay on your
            world.
          </p>
        </div>
        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src={featuresData[0].src}
            title={featuresData[0].title}
            description={featuresData[0].description}
          />
        </BentoTilt>

        <div className="grid h-[142vh] sm:h-[135vh] grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 row-span-1 sm:col-span-1 sm:row-span-2">
            <BentoCard
              src={featuresData[1].src}
              title={featuresData[1].title}
              description={featuresData[1].description}
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1 ms-14 sm:col-span-1 sm:ms-0">
            <BentoCard
              src={featuresData[2].src}
              title={featuresData[2].title}
              description={featuresData[2].description}
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 me-14 sm:col-span-1 sm:me-0">
            <BentoCard
              src={featuresData[3].src}
              title={featuresData[3].title}
              description={featuresData[3].description}
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <div
              as="aside"
              className="flex size-full flex-col justify-between bg-violet-300 p-5"
            >
              <h3 className="bento-title special-font text-custom-black">
                More coming soon<b className="pl-1.5">!</b>
              </h3>

              <TiLocationArrow
                className="m-5 self-end scale-[3] md:scale-[4] lg:scale-[5]"
                aria-hidden="true"
              />
            </div>
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <video
              ref={videoRef}
              src="videos/feature-5.mp4"
              loop
              muted
              autoPlay
              playsInline
              className="size-full object-cover object-center"
            ></video>
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
