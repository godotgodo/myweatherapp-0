/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'clouds': "url('/public/img/clouds.jpg')",
        'clear': "url('/public/img/clear.jpg')",
        'mist': "url('/public/img/mist.jpg')",
        'snow': "url('/public/img/snow.jpg')",
        'rain': "url('/public/img/rain.png')",
        'drizzle': "url('/public/img/drizzle.jpg')",
        'thunderstorm': "url('/public/img/thunderstorm.jpg')",
    }
    },
  },
  plugins: [],
}
