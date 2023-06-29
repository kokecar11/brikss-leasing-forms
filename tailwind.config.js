/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  // theme: {
  //   extend: {},
  // },
  daisyui: {
    themes: [
      {
        mytheme: {
          accent: "#171735",
          secondary: "#909db2",
          primary: "#1900FE",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/typography'),
  ],
}
