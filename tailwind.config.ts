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
        brand: {
          50: "#f2f7f6",
          100: "#ddebe8",
          200: "#bfd8d3",
          300: "#93bbb4",
          400: "#61978f",
          500: "#467c75",
          600: "#37645f",
          700: "#2f514e",
          800: "#294341",
          900: "#253938",
          950: "#12211f",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
