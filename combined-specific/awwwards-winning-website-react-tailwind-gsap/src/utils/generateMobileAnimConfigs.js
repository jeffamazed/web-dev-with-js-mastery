const generateMobileAnimConfigs = (qty) => {
  const config = Array.from({ length: qty }, () => {
    const randomDx = Math.random() * 200 - 100;
    const randomDy = Math.random() * 200 - 100;

    return {
      from: { x: randomDx, y: randomDy, opacity: 0, scale: 0.1 },
      to: {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
      },
    };
  });
  return config;
};

export default generateMobileAnimConfigs;
