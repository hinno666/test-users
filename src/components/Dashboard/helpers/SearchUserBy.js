export const searchUserBy = (searchItem, limit, page) => {
  return searchItem
    .split(",")
    .map((item) => {
      if (!isNaN(+item)) {
        return `id=${item.trim()}`;
      } else {
        return `username_like=${item.trim()}&_limit=${limit}&_page=${page}`;
      }
    })
    .join("&");
};
