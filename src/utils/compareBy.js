export const compareBy = key => {
  return function(a, b) {
    if (a[key].toLowerCase() < b[key].toLowerCase()) return -1;
    if (a[key].toLowerCase() > b[key].toLowerCase()) return 1;
    return 0;
  };
};

export const compareByAssignmentName = (a, b) => {
  if (a.Assignment.name.toLowerCase() < b.Assignment.name.toLowerCase()) return -1;
  if (a.Assignment.name.toLowerCase() > b.Assignment.name.toLowerCase()) return 1;
  return 0;
};
