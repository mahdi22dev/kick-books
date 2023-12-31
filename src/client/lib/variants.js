export const ScaleVariants = {
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 230,
      damping: 25,
      velocity: 10,
      duration: 0.2,
      opacity: { duration: 0.9 },
    },
  },
  initial: {
    opacity: 0,
    scale: 0.1,
    transition: { duration: 0.6 },
  },
  exit: {
    opacity: 0,
    scale: 0.1,
    transition: { duration: 0.3, stiffness: 500 },
  },
};
export const EditVariants = {
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 230,
      damping: 25,
      velocity: 10,
      duration: 0.2,
      opacity: { duration: 0.7 },
    },
  },
  initial: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.7 },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.4 },
  },
};
