/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  theme: {
    extend: {
      textColor: {
        skin: {
          primary100: 'var(--primary-100)',
          primary200: 'var(--primary-200)',
          primary300: 'var(--primary-300)',
          accent100: 'var(--accent-100)',
          accent200: 'var(--accent-200)',
          text100: 'var(--text-100)',
          text200: 'var(--text-200)',
        },
      },
      backgroundColor: {
        skin: {
          primary100: 'var(--primary-100)',
          primary200: 'var(--primary-200)',
          primary300: 'var(--primary-300)',
          accent100: 'var(--accent-100)',
          accent200: 'var(--accent-200)',
          bg100: 'var(--bg-100)',
          bg200: 'var(--bg-200)',
          bg300: 'var(--bg-300)',
        },
      },
    },
  },
  plugins: [],
}

