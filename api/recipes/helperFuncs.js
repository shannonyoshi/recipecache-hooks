

const addProperty = (array, propertyName, propertyValue) => {
  const newArray = array.map((item) => ({
    ...item,
    [propertyName]: propertyValue,
  }));
  return newArray;
};

module.exports = {
  addProperty,
};