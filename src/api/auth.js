import { bux, extend } from '@/utils';
import { getToken, setToken, setUser } from '@/utils/local';

let TOKEN = getToken();

const BASE = {
	'Content-Type': 'application/json;charset=UTF-8',
	'Accept': 'application/json, text/plain, */*'
};

export function headers() {
	let obj = extend({}, BASE);
	TOKEN && extend(obj, { Authorization:`Token ${TOKEN}` });
	return obj;
}

export function login(res) {
	let user = res.user;
	console.log('> user', user);
	setToken(TOKEN=user.token);
	setUser(user);
	bus.emit('auth:change', user);
}
}