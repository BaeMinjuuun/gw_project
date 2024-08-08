export const enterKeyDown = (e, callback) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
  if (callback && typeof callback === "function") {
    callback();
  }
};
