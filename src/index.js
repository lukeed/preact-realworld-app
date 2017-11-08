import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from '@/components/header';
import Profile from '@/routes/profile';
import Home from '@/routes/home';

export default class App extends Component {
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
				</Router>
			</div>
		);
	}
}
