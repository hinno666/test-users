export const searchUserBy = (searchItem, limit = 3) => {
  return searchItem
    .split(",")
    .map((item) => {
      if (!isNaN(+item)) {
        return `id=${item.trim()}`;
      } else {
        return `username_like=${item.trim()}&_limit=${limit}`;
      }
    })
    .join("&");
};
