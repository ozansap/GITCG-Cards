export function when(condition: boolean, whenTrue: string, whenFalse: string = '') {
	return condition ? whenTrue : whenFalse;
}
