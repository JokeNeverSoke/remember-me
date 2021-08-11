export const getDisplacement = ({
  x,
  width,
  windowW,
}: {
  x: number;
  width: number;
  windowW: number;
}) => {
  return {
    x: (x / width) * windowW,
    sceneX: (x / width) * (width - windowW) * -1,
  };
};
