import gsap from "gsap";

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

export const headingTimeline = (trigger, id, startValue) => {
  return gsap.timeline({
    scrollTrigger: {
      trigger,
      id,
      start: startValue,
      toggleActions: "play none none reverse",
    },
  });
};

export const animateWithGsap = (
  target,
  animationProps,
  scrollTriggerTarget,
  scrollProps
) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: scrollTriggerTarget,
      toggleActions: "play none none reverse",
      start: "top 85%",
      ...scrollProps,
    },
  });
};
