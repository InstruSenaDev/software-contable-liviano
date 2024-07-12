/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontSize: {
        xxs: ["0.7rem", { lineHeight: "0.95rem" }], 
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.5rem" }],
        base: ["1rem", { lineHeight: "1.75rem" }],
        lg: ["1.125rem", { lineHeight: "2rem" }],
        xl: ["1.25rem", { lineHeight: "2rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["2rem", { lineHeight: "2.5rem" }],
        "4xl": ["2.5rem", { lineHeight: "3.5rem" }],
        "5xl": ["3rem", { lineHeight: "3.5rem" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1.1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },
      colors: {
        black: "#121212",
        'blue-baby': '#9BBFE4',
        'blue-baby2': '#2CECB4',
        'blue-baby3': '#004AAD',
        'blue-baby4': '#172E73',
        'grisesito':'#E9E9E9',
        'grisinpu':'#D1D1D1',
        'grisfont':'#646464',
        accent: {
          50: "#EBEDFF",
          100: "#D6DAFF",
          200: "#A8B1FF",
          300: "#808CFF",
          400: "#5263FF",
          500: "#283CFF",
          600: "#0017EB",
          700: "#0012B3",
          800: "#000C75",
          900: "#00063D",
        },
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        display: ["Bricolage Grotesque", ...defaultTheme.fontFamily.sans],
        inter: ['Inter', 'sans-serif'],
      },

      spacing: {
        "section-margin-bottom": "0", 
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "0.75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "7": "1.75rem",
        "8": "2rem",
        "9": "2.25rem",
        "10": "2.5rem",
        "11": "2.75rem",
        "12": "3rem",
        "14": "3.5rem",
        "16": "4rem",
      },
      width: {
        "1/7": "14.2857143%",
        "2/7": "28.5714286%",
        "3/7": "42.8571429%",
        "4/7": "57.1428571%",
        "5/7": "71.4285714%",
        "6/7": "85.7142857%",
        "1/8": "12.5%",
        "2/8": "25%",
        "3/8": "37.5%",
        "4/8": "50%",
        "5/8": "62.5%",
        "6/8": "75%",
        "7/8": "87.5%",
        "1/9": "11.1111111%",
        "2/9": "22.2222222%",
        "3/9": "33.3333333%",
        "4/9": "44.4444444%",
        "5/9": "55.5555556%",
        "6/9": "66.6666667%",
        "7/9": "77.7777778%",
        "8/9": "88.8888889%",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
