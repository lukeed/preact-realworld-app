import { getToken, setToken, setUser } from '@/utils/local';

let TOKEN = getToken();

export function headers() {
	return {
    'Authorization': `Token ${TOKEN}`,
    'Content-Type': 'application/json'
  };
}

export function login(res) {
	let user = res.user;
	console.log('> user', user);
	setToken(TOKEN=user.token);
	setUser(user);
}