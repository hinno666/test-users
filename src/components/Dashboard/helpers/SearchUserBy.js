export const searchUserBy = (searchItem) => {
  return searchItem
    .split(",")
    .map((item) => {
      if (!isNaN(+item)) {
        return `id=${item.trim()}`;
      } else {
        return `username_like=${item.trim()}`;
      }
    })
    .join("&");
};
