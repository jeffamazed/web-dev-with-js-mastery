const ShoeCard = ({ ariaLabel, imgURL, changeBigShoeImage, bigShoeImage }) => {
  const handleClick = () => {
    // this checks if the current img is not the same as this img url
    if (bigShoeImage !== imgURL.bigShoe) {
      changeBigShoeImage(imgURL.bigShoe);
    }
  };

  return (
    <button
      className={`block border-2 rounded-xl ${
        bigShoeImage === imgURL.bigShoe
          ? "border-coral-red"
          : "border-transparent"
      } cursor-pointer max-sm:flex-1`}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-pressed={bigShoeImage === imgURL.bigShoe}
    >
      <div className="flex justify-center items-center bg-card bg-center bg-cover rounded-xl p-4 max-w-35 lg:max-w-40">
        <img
          src={imgURL.thumbnail}
          alt="shoe collection"
          width={127}
          height={103}
          className="object-contain aspect-square"
        />
      </div>
    </button>
  );
};

export default ShoeCard;
