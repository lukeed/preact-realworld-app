export function serialize(elm) {
	let i=0, tmp, arr=elm.elements, out={}
	for (; i < arr.length; i++) {
		tmp = arr[i];
		if (tmp.nodeName === 'INPUT' && tmp.name && tmp.value) {
			out[ tmp.name ] = tmp.value;
		}
	}
	return out;
}

export function extend(tar, src) {
	for (let i in src) {
		tar[i] = src[i];
	}
	return tar;
}

export function toErrors(obj) {
	let k, arr=[];
	for (k in obj) {
		arr.push(`${k} ${obj[k]}`);
	}
	return arr;
}