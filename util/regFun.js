// 1. For serial number
export const SerialIdFunction = (value) => {
  if (value >= 10) {
    return value;
  } else {
    return "0" + value;
  }
};
