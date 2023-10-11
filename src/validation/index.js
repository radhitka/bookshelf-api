const isNull = (field) => {
  return field == null || field == '';
};

const validateIsBiggerThan = (first, second) => {
  return first > second;
};

export { isNull, validateIsBiggerThan };
