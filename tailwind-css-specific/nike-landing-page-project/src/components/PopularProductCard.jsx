import { star } from "../assets/icons";

const PopularProductCard = ({ imgURL, name, price, rating }) => {
  return (
    <article className="flex flex-1 flex-col border-2 border-transparent hover:border-coral-red duration-200 transition-colors ease-in cursor-pointer p-3 rounded-lg ">
      <img src={imgURL} alt={name} className="" />
      <div className="mt-8 flex justify-start items-center gap-2.5">
        <img src={star} alt="rating" width={24} height={24} loading="lazy" />
        <p className="font-monserrat text-xl text-slate-gray leading-0">
          ({rating})
        </p>
      </div>
      <h3 className="mt-2 text-2xl leading-normal font-semibold font-palanquin">
        {name}
      </h3>
      <p className="mt-2 font-semibold font-montserrat text-coral-red text-2xl leading-normal">
        {price}
      </p>
    </article>
  );
};

export default PopularProductCard;
