import CustomizedAnchor from "./CustomizedAnchor";
import AnimatedTitle from "./AnimatedTitle";
import { generateTitle } from "../utils/generateTitle";
import { IoMdCall } from "react-icons/io";

const ImageClipBox = ({ src, alt, clipClass }) => {
  return (
    <div className={clipClass}>
      <img src={src} alt={alt} />
    </div>
  );
};

const Contact = ({ windowSize, scrollRef }) => {
  const title = "Let's b(u)ild<br />a new era (o)f<br />g(a)ming together";
  return (
    <section
      id="contact"
      className="my-20 min-h-96 w-full px-8"
      ref={scrollRef}
    >
      <div className="relative rounded-lg bg-custom-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="./img/contact-1.webp"
            alt="Contact image 1"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="./img/contact-2.webp"
            alt="Contact image 2"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="./img/swordman.webp"
            alt="Contact image 3"
            clipClass="sword-man-clip-path md:scale-125 animate-in-out"
          />
        </div>
        <header className="flex flex-col items-center text-center relative z-50">
          <h2 className="font-general text-xs uppercase lg:text-sm backdrop-blur-sm bg-black/30 py-1.5 px-2 rounded-md sm:backdrop-blur-none sm:bg-transparent sm:py-0 sm:px-0">
            Join Zentry
          </h2>
          <AnimatedTitle
            title={generateTitle(title)}
            id="footer-title"
            windowSize={windowSize}
          />

          <CustomizedAnchor
            href="#"
            title="contact us"
            containerClass="bg-violet-50 hover:bg-blue-75 focus:bg-blue-75 mt-10 flex-center gap-1.5"
            leftIcon={<IoMdCall aria-hidden="true" />}
          />
        </header>
      </div>
    </section>
  );
};

export default Contact;
