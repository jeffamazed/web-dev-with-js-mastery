import Button from "../components/Button";

const Subscribe = () => {
  return (
    <section
      className="max-container flex justify-between items-center max-lg:flex-col gap-10"
      id="contact-us"
      aria-labelledby="subscribe-heading"
    >
      <h2
        id="subscribe-heading"
        className="text-4xl leading-[68px] lg:max-w-md font-palanquin font-bold max-lg:text-center"
      >
        Sign Up for <span className="text-coral-red">Updates </span>& Newsletter
      </h2>
      <div className="lg:max-w-[40vw] sm:w-full flex items-center max-sm:flex-col gap-5 p-2.5 sm:border sm:border-slate-gray rounded-full ">
        <label className="sr-only" htmlFor="subscribe">
          Subscribe for more info
        </label>
        <input
          type="text"
          placeholder="subscribe@nike.com"
          id="subscribe"
          className="input"
        />
        <div className="flex max-sm:justify-end items-center max-sm:w-full">
          <Button label="Sign Up" fullWidth />
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
