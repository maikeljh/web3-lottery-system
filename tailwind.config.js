/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-1-100": "#F3F8EF",
        "primary-1-200": "#D1E5C0",
        "primary-1-300": "#AED191",
        "primary-1-400": "#8CBD62",
        "primary-1-500": "#628545",
        "primary-1-600": "#384C27",
        "primary-1-700": "#0E130A",
        "primary-2-100": "#FFF9F0",
        "primary-2-200": "#FFE6C3",
        "primary-2-300": "#FFD396",
        "primary-2-400": "#FFC16A",
        "primary-2-500": "#B3874A",
        "primary-2-600": "#664D2A",
        "primary-2-700": "#1A140B",
        "primary-3-100": "#FFFEFD",
        "primary-3-200": "#FFFCF7",
        "primary-3-300": "#FFF9F2",
        "primary-3-400": "#FFF7EC",
        "primary-3-500": "#B3ADA6",
        "primary-3-600": "#66635E",
        "primary-3-700": "#1A1918",
        "primary-4-100": "#FEFCFA",
        "primary-4-200": "#FBF5EC",
        "primary-4-300": "#F9EDDD",
        "primary-4-400": "#F6E6CF",
        "primary-4-500": "#ADA191",
        "primary-4-600": "#625C53",
        "primary-4-700": "#191715",
        danger: "#D33333",
      },
    },
  },
  plugins: [],
};
