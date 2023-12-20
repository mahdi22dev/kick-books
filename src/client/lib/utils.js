export const convertToSelectOptions = (array) => {
  return array.map((item) => ({
    label: item.name,
    value: item.id,
  }));
};
