import { h, Component } from 'preact';
import { createHashHistory } from 'history';
import { Router, route } from 'preact-router';
import { getUser } from '@/utils/local';
import { bus } from '@/utils';

import Header from '@/components/header';
import Profile from '@/routes/profile';

import Settings from '@/routes/settings';
import Register from '@/routes/register';
import Article from '@/routes/article';
import Login from '@/routes/login';
import Home from '@/routes/home';

const history = createHashHistory();

// routes that SHOULD NOT have an auth'd user
const noAuth = ['/login', '/register'];
// routes to NEED an auth'd user
const toAuth = ['/settings', '/editor'];

function nextUrl(uri, isUser) {
	// if is a user & attempting to go to no-auth page
	if (isUser && noAuth.indexOf(uri) !== -1) return '/';
	// if not a user & attemping to go to restricted page
	if (!isUser && toAuth.indexOf(uri) !== -1) return noAuth[0];
	return uri;
}

export default class App extends Component {
	state = { user:getUser() };

	onRoute = e => {
		const cur = e.url;
		const nxt = nextUrl(cur, !!this.state.user);
		if (nxt !== cur) return route(nxt, true);
		console.log('> route was allowed~!', cur);
	};

	componentDidMount() {
		bus.on('auth:change', obj => {
			this.setState({ user:obj }, _ => route(obj ? '/' : noAuth[0]));
		});
	}

	render(_, state) {
		return (
			<div id="app">
				<Header user={ state.user } />
				<Router history={ history } onChange={ this.onRoute }>
					<Home path="/" />
					<Login path="/login" />
					<Register path="/register" />
					<Article path="/article/:title" />
					<Settings path="/settings" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
				</Router>
			</div>
		);
	}
}
