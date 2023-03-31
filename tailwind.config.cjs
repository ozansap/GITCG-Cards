/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				color_accent: '#3f3f46',
				color_text: '#71717a'
			},
			boxShadow: {
				DEFAULT: '0 0 6px',
				10: '0 0 10px',
				20: '0 0 20px'
			}
		}
	},
	plugins: []
};
