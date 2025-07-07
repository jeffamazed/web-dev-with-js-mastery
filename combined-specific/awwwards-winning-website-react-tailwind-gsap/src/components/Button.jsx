const Button = ({ id, title, rightIcon, leftIcon, containerClass }) => {
  return (
    <button
      id={id}
      className={`relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-6 py-2.5 text-black transition-colors duration-200 ease-in outline-none focus:ring-2 focus:ring-violet-darker ring-offset-2 ring-offset-white text-xs 2xl:text-sm ${containerClass}`}
      type="button"
    >
      {leftIcon}

      <span className="relative overflow-hidden font-general uppercase">
        {title}
      </span>

      {rightIcon}
    </button>
  );
};

export default Button;
