export const compareBy = key => {
  return function(a, b) {
    if (a[key].toLowerCase() < b[key].toLowerCase()) return -1;
    if (a[key].toLowerCase() > b[key].toLowerCase()) return 1;
    return 0;
  };
};
