export const sorter = (a: any, b: any) => {
  if (a === b) return 0;
  else if (a === null) return 1;
  else if (b === null) return -1;
  else return a.localeCompare(b);
};
