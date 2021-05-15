  let date = new Date().toLocaleDateString("en", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  module.exports = date;

