const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./popup.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});