/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
     flowbite.content(),
  ],
  theme: {
    extend: {},
  },

  plugins: [
    flowbite.plugin(),
    // eslint-disable-next-line no-undef
    require("tailwind-scrollbar")]
}