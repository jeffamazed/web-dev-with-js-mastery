import { generateTitle } from "../utils/generateTitle";
import AnimatedTitle from "./AnimatedTitle";

const Story = ({ windowSize }) => {
  const title = "The St(o)ry of<br />the Hidden Real(m)";
  return (
    <section
      id="story"
      className="min-h-[2000px] w-full bg-custom-black text-blue-50"
    >
      <div className="flex size-full flex-col items-center py-10 pb-24 text-center">
        <header className="flex flex-col gap-5 w-full">
          <h2 className="font-general text-xs uppercase lg:text-sm">
            the multiversal ip world
          </h2>
          <AnimatedTitle
            title={generateTitle(title)}
            containerClass="text-blue-50"
            id="story-title"
            windowSize={windowSize}
          />
        </header>
      </div>
    </section>
  );
};

export default Story;
