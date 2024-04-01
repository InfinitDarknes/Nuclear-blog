/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "Javascript/*.js"],
  theme: {
    fontFamily: {
      Title: "ShabnamMD",
      Text: "ShabnamLight",
    },
    extend: {
      colors: {
        white: "#dad6d6",
      },
      spacing: {
        150: "600px",
        75: "300px",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
