export const animateWithGsapTimeline = (
  tl,
  rotationRef,
  rotationState,
  firstTarget,
  secondTarget,
  animationProps
) => {
  tl.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: "power2.inOut",
  });

  tl.to(
    firstTarget.current,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<"
  );

  tl.to(
    secondTarget.current,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<"
  );
};
