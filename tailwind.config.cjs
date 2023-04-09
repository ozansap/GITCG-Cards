/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				color_accent: '#3f3f46',
				color_text: '#71717a',
				cryo: '#9ae7e7',
				hydro: '#57dfff',
				pyro: '#ff9e65',
				electro: '#e7aaff',
				anemo: '#55f1c2',
				geo: '#f0d45d',
				dendro: '#c3e379'
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
