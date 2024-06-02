import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'selector',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    extend: {
      fontFamily: {
        app: ['Montserrat', 'sans-serif'],
        instagram: ['Lobster Two', 'sans-serif'],
      },
      colors: {
        black: '#000000',
        white: '#ffffff',
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      spacing: {
        '128': '32rem',
      },
      boxShadow: {
        'lg-white': '0 10px 15px -3px rgb(255 255 255 / 0.3), 0 4px 6px -4px rgb(255 255 255 / 0.3)',
      },
    },
  },
  plugins: [],
};
export default config;
