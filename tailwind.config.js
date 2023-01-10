/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'valorant-red': '#FF4654',
                'valorant-blue': '#0F1923',
                'valorant-mud': '#111111',
            },
            fontFamily: {
                'work-sans': ['Work Sans', 'sans-serif'],
            },
            fontSize: {
                'display-large': '64px',
                'display-medium': '48px',
                'display-small': '40px',
                'headline-large': '32px',
                'headline-medium': '28px',
                'headline-small': '24px',
                'title-large': '22px',
                'title-medium': '16px',
                'title-small': '14px',
                'label-large': '16px',
                'label-medium': '14px',
                'label-small': '12px',
                'body-large': '16px',
                'body-medium': '14px',
                'body small': '12px',
            },
        },
    },
    plugins: [],
};
