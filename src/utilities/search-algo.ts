export const search = (input: string, flatData: any[], searchIn: string) => {
  if (!input) {
    return flatData;
  }

  return flatData.filter((data) => {
    const postName = data[searchIn].toLowerCase();
    return postName.includes(input.toLowerCase());
  });
};
