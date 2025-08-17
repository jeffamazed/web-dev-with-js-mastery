import { star } from "../assets/icons";

const ReviewCard = ({ imgURL, customerName, rating, feedback }) => {
  return (
    <article className="flex justify-center items-center flex-col">
      <img
        src={imgURL}
        alt="customer"
        className="rounded-full object-cover w-[120px] h-[120px]"
        loading="lazy"
      />
      <blockquote>
        <p className="mt-6 max-w-sm text-center info-text">{feedback}</p>
      </blockquote>
      <div className="mt-3 flex justify-center items-center gap-2.5">
        <img
          src={star}
          alt="star"
          width={24}
          height={24}
          className="object-contain m-0"
          loading="lazy"
        />
        <p className="text-xl font-montserrat text-slate-gray leading-0">
          ({rating})
        </p>
      </div>
      <h3 className="mt-1 font-palanquin text-3xl text-center font-bold">
        {customerName}
      </h3>
    </article>
  );
};

export default ReviewCard;
