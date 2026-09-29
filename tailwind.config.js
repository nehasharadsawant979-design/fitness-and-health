/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10b981", // emerald-500
        secondary: "#0f172a", // slate-900
      },
    },
  },
  plugins: [],
}
