const LoadingIcon = () => {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-10"
      role="status"
    >
      <span className="sr-only">Loading...</span>
      <div
        className="w-6 h-6 border-2 border-custom-white border-t-transparent rounded-full animate-spin"
        aria-hidden="true"
      />
    </div>
  );
};

export default LoadingIcon;
