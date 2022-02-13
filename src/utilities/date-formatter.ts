export const formattedDate = (date: string | Date, pattern = "dd/mm/yyyy") => {
  // return `${new Date(date).getDate()}.${new Date(date).getMonth()}.${new Date(date).getFullYear()}`;
  return pattern
    .replace("dd", String(new Date(date).getDate()))
    .replace("mm", String(new Date(date).getMonth()))
    .replace("yyyy", String(new Date(date).getFullYear()));
};
