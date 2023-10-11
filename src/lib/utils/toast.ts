import { store_toasts } from './stores.js';
import SVG_success from '$lib/svg/success.svelte';
import SVG_error from '$lib/svg/error.svelte';
import SVG_warning from '$lib/svg/warning.svelte';

const colors = {
	success: {
		primary: '#0D853B',
		secondary: '#EAFBF3'
	},
	error: {
		primary: '#FF1E06',
		secondary: '#FED9D9'
	},
	warning: {
		primary: '#FF8C00',
		secondary: '#FFF6E6'
	}
};

export class toast {
	static id = 0;

	static success = (message: string) => {
		store_toasts.add({
			id: (toast.id++).toString(),
			timeout: 5000,
			text: message,
			colors: colors.success,
			icon: SVG_success
		});
	};

	static error = (message: string) => {
		store_toasts.add({
			id: (toast.id++).toString(),
			timeout: 5000,
			text: message,
			colors: colors.error,
			icon: SVG_error
		});
	};

	static warning = (message: string) => {};
}
