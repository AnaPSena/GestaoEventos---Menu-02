import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        astronaut: {
          50: '#f1f6fd',
          100: '#e0ebf9',
          200: '#c9dbf4',
          300: '#a3c5ed',
          400: '#78a6e2',
          500: '#5887d9',
          600: '#436ccd',
          700: '#3a5abb',
          800: '#344b99',
          900: '#2b3c70',
          950: '#20294b',
        },
        pizazz: {
          50: '#fffbec',
          100: '#fff7d4',
          200: '#ffeaa8',
          300: '#ffda70',
          400: '#ffbe37',
          500: '#ffa710',
          600: '#f88f06',
          700: '#c76a07',
          800: '#9e520e',
          900: '#7f450f',
          950: '#452105',
        },

      },
    },
  },
  plugins: [],
};
export default config;
