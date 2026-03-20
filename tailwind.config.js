/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],

  safelist: [
    "bg-blue-200","border-blue-400",
    "bg-green-200","border-green-400",
    "bg-purple-200","border-purple-400",
    "bg-yellow-200","border-yellow-400",
    "bg-pink-200","border-pink-400",
    "bg-indigo-200","border-indigo-400",

    "bg-red-200","border-red-400",
    "bg-orange-200","border-orange-400",
    "bg-teal-200","border-teal-400",
    "bg-cyan-200","border-cyan-400",
    "bg-lime-200","border-lime-400",
    "bg-emerald-200","border-emerald-400",
    "bg-violet-200","border-violet-400",
    "bg-rose-200","border-rose-400",
    "bg-sky-200","border-sky-400",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};