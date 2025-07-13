const CustomizedAnchor = ({
  ref,
  href,
  id,
  title,
  rightIcon,
  leftIcon,
  containerClass,
  ariaLabel,
  tabIndex,
}) => {
  return (
    <a
      ref={ref}
      href={href}
      id={id}
      className={`relative z-10 w-fit cursor-pointer overflow-hidden rounded-full px-4 py-2 lg:px-5 lg:py-2.5 text-custom-black transition-colors duration-200 ease-in custom-ring text-xs 2xl:text-sm ${containerClass}`}
      aria-label={ariaLabel}
      rel="noopener noreferrer"
      target="_blank"
      tabIndex={tabIndex}
    >
      {leftIcon}

      <span className="relative overflow-hidden font-general uppercase">
        {title}
      </span>

      {rightIcon}
    </a>
  );
};

export default CustomizedAnchor;
