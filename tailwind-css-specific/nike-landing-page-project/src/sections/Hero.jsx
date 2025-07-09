import { useState } from "react";
import { arrowRight } from "../assets/icons";
import { bigShoe1 } from "../assets/images";

import Button from "../components/Button";
import ShoeCard from "../components/ShoeCard";
import { shoes, statistics } from "../constants";

const Hero = () => {
  const [bigShoeImage, setBigShoeImage] = useState(bigShoe1);

  return (
    <div
      id="home"
      className="flex flex-col xl:flex-row justify-center min-h-screen gap-10 max-container w-full"
    >
      <section
        aria-labelledby="hero-heading"
        className="w-full pt-45 relative xl:w-2/5 flex flex-col justify-center items-start px-8 sm:px-16 xl:px-0"
      >
        <p className="text-xl font-montserrat text-coral-red">
          Our Summer Collection
        </p>
        <h1
          id="hero-heading"
          className="mt-10 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-[82px] font-bold"
        >
          <span className="block xl:bg-white xl:whitespace-nowrap relative z-10 pr-10">
            The New Arrival
          </span>
          <span className="block text-coral-red mt-3">Nike</span> Shoes
        </h1>
        <p className="font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm">
          Discover stylish Nike arrivals, quality comfort, and innovation for
          your active life.
        </p>
        <Button label="Shop now" iconURL={arrowRight} />
        <section
          aria-labelledby="statistics-heading"
          className="flex justify-start items-start flex-wrap mt-20 gap-16"
        >
          <h2 id="statistics-heading" className="sr-only">
            Our Statistics
          </h2>
          {statistics.map((stat) => (
            <dl key={stat.label}>
              <dt className="text-4xl font-palanquin ">
                <strong>{stat.value}</strong>
              </dt>
              <dd className="leading-7 font-montserrat text-slate-gray">
                {stat.label}
              </dd>
            </dl>
          ))}
        </section>
      </section>

      <section
        aria-labelledby="showcase-heading"
        className="relative flex-1 flex justify-center items-center max-xl:py-40 bg-primary bg-hero bg-cover bg-center"
      >
        <h2 id="showcase-heading" className="sr-only">
          Shoe Showcase
        </h2>
        <img
          src={bigShoeImage}
          alt="shoe collection"
          width={610}
          height={500}
          className="object-contain relative z-10"
        />

        <div
          role="group"
          aria-label="Select a shoe"
          className="flex sm:gap-6 gap-4 absolute -bottom-[5%] px-6"
        >
          {shoes.map((shoe) => (
            <ShoeCard
              key={shoe.id}
              ariaLabel={shoe.name}
              imgURL={shoe}
              changeBigShoeImage={(shoe) => {
                setBigShoeImage(shoe);
              }}
              bigShoeImage={bigShoeImage}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hero;
