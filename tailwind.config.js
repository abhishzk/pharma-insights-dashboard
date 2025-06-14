/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f5fc',
          100: '#cceaf8',
          200: '#99d5f2',
          300: '#66c1eb',
          400: '#33ace5',
          500: '#0093d0', // Pfizer blue
          600: '#0076a6',
          700: '#00587d',
          800: '#003b53',
          900: '#001d2a',
        },
        secondary: {
          50: '#f0f2fc',
          100: '#e1e5f9',
          200: '#c3cbf3',
          300: '#a5b1ec',
          400: '#8798e6',
          500: '#5c72dc',
          600: '#4a5bb0',
          700: '#374484',
          800: '#252e58',
          900: '#12172c',
        },
        accent: {
          50: '#e6fbfa',
          100: '#ccf8f5',
          200: '#99f1ec',
          300: '#66eae2',
          400: '#33e3d9',
          500: '#00ccc0',
          600: '#00a39a',
          700: '#007a73',
          800: '#00524d',
          900: '#002926',
        },
        success: {
          50: '#edf9f0',
          100: '#dbf4e2',
          200: '#b7e9c5',
          300: '#93dda8',
          400: '#6fd28b',
          500: '#4bc66e',
          600: '#3c9e58',
          700: '#2d7742',
          800: '#1e4f2c',
          900: '#0f2816',
        },
        warning: {
          50: '#fef8e7',
          100: '#fdf1cf',
          200: '#fbe39f',
          300: '#f9d56f',
          400: '#f7c73f',
          500: '#f5b90f',
          600: '#c4940c',
          700: '#936f09',
          800: '#624a06',
          900: '#312503',
        },
        error: {
          50: '#fceded',
          100: '#f9dcdc',
          200: '#f3b9b9',
          300: '#ed9595',
          400: '#e77272',
          500: '#e14f4f',
          600: '#b43f3f',
          700: '#872f2f',
          800: '#5a2020',
          900: '#2d1010',
        },
        neutral: {
          50: '#f7f7f8',
          100: '#eeeef1',
          200: '#dddde2',
          300: '#ccced4',
          400: '#bbbec5',
          500: '#aaaeb7',
          600: '#888b92',
          700: '#66686e',
          800: '#444649',
          900: '#222325',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
};