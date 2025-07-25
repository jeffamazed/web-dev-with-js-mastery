const Button = ({
  label,
  iconURL,
  backgroundColor,
  textColor,
  borderColor,
  fullWidth,
}) => {
  return (
    <button
      type="button"
      className={`flex justify-center items-center gap-4 px-7 py-4 border font-montserrat text-lg leading-none rounded-full cursor-pointer ${
        fullWidth && "w-full"
      }
        ${
          backgroundColor
            ? `${backgroundColor} ${textColor} ${borderColor}`
            : "bg-coral-red  text-white border-coral-red"
        }
      `}
    >
      {label}
      {iconURL && (
        <img
          src={iconURL}
          alt="arrow right icon"
          className="rounded-full w-5 h-5"
        />
      )}
    </button>
  );
};

export default Button;
