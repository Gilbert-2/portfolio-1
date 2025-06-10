/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1A365D',     // Rich Navy Blue
          accent1: '#28A745',     // Emerald Green
          accent2: '#FBC02D',     // Warm Yellow
          textColor: '#F1F5F9',   // Light Gray
          bgColor: '#F8F9FA',     // Soft White
          secondary: '#6B7280',   // Slate Gray
          success: '#81C784',     // Light Green
          highlight: '#4FC3F7',   // Sky Blue Tint
        },
        fontFamily: {
          sans: ['Poppins', 'Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
    corePlugins: {
      preflight: false, // This is needed when working with Ant Design
    },
  }