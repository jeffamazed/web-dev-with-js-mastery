const generateDesktopAnimConfigs = (children, gallery) => {
  const galleryRect = gallery.getBoundingClientRect();
  const galleryCenterX = galleryRect.width / 2;
  const galleryCenterY = galleryRect.height / 2;

  const total = children.length;

  const config = Array.from(children).map((child, i) => {
    const childRect = child.getBoundingClientRect();
    const childX = childRect.left - galleryRect.left + childRect.width / 2;
    const childY = childRect.top - galleryRect.top + childRect.height / 2;

    const angle = (i / total) * Math.PI * 2;
    const radius = 150;
    const offsetX = Math.cos(angle) * radius;
    const offsetY = Math.sin(angle) * radius;

    const dx = galleryCenterX - childX + offsetX;
    const dy = galleryCenterY - childY + offsetY;

    return {
      from: { x: dx, y: dy },
      to: { x: 0, y: 0, ease: "power1.out" },
    };
  });
  return config;
};

export default generateDesktopAnimConfigs;
