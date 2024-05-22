export const numberParser = (value: number) => {
  return Number(value.toString().replace(/,/, "."));
};
