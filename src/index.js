import { h, Component } from 'preact';
import { createHashHistory } from 'history';
import { Router } from 'preact-router';

import Header from '@/components/header';
import Profile from '@/routes/profile';
import Login from '@/routes/login';
import Home from '@/routes/home';

const history = createHashHistory();

export default class App extends Component {
	onRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Header />
				<Router history={ history } onChange={ this.onRoute }>
					<Home path="/" />
					<Login path="/login" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
				</Router>
			</div>
		);
	}
}
