export const buildFilterStrings = state_filters => {
  let indexes = Object.keys(state_filters);
  let string_filters = {};

  for (let index of indexes) {
    const filter = state_filters[index];

    const filterApllied = it => {
      return it.applied === true;
    };
    const filtredItems = filter.filter(filterApllied);

    if (filtredItems.length > 0) {
      const reducer = (acc, curr, idx, src) => {
        if (acc === "") {
          return `${curr.value}`;
        } else {
          return `${acc},${curr.value}`;
        }
      };
      string_filters[index] = filtredItems.reduce(reducer, "");
    }
  }

  return string_filters;
};
