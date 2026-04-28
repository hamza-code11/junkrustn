// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         jru: {
//           yellow: "#FFE11A",
//           "yellow-hover": "#FFD700",
//           purple: "#4A154B",
//           "purple-light": "#6B2F6D",
//         },
//       },
//     },
//   },
//   plugins: [],
// };



/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',  // ← Add this line
  theme: {
    extend: {},
  },
  plugins: [],
}