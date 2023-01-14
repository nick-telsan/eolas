/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mint: '#ADE3AD',
        chocolate: '#161215',
        'whip-cream': '#ead7d7',
        matcha: '#4d6436',
      },
    },
    fontFamily: {
      overlock: ['Overlock', 'ui-sans-serif', 'system-ui'],
      barlow: ['Barlow', 'ui-sans-serif', 'system-ui'],
    },
  },
  plugins: [],
}
