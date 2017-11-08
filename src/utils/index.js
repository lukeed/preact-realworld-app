export function extend(tar, src) {
	for (let i in src) {
		tar[i] = src[i];
	}
}
