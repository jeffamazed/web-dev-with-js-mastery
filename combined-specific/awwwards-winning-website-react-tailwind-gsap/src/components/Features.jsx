const Features = () => {
  return (
    <section
      aria-labelledby="features-heading"
      className="bg-custom-black pb-52"
    >
      <div className="mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <h2
            className="font-circular-web text-lg text-blue-50 mb-1"
            id="features-heading"
          >
            Into the Metagame Layer
          </h2>
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Enter a boundless and ever-evolving universe where a dynamic
            constellation of products fuses into an intelligent overlay on your
            world.
          </p>
        </div>
        <div className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]"></div>
      </div>
    </section>
  );
};

export default Features;
