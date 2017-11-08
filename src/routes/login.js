import { Link } from 'preact-router';
import { h, Component } from 'preact';
import Input from '@/components/input';
import { serialize, toErrors } from '@/utils';
import { login } from '@/api';

export default class Login extends Component {
	state = { loading:false, errors:[] }

	onSubmit = ev => {
		ev.preventDefault();
		let user = serialize(ev.target);
		this.setState({ loading:true }, _ => {
			login({ user }).then(console.log).catch(err => {
				this.setState({
					loading: false,
					errors: toErrors(err.errors)
				});
			})
		});
	}

	render(props, state) {
		let loading = state.loading;

		return (
			<div class="auth-page">
				<div class="container page">
					<div class="row">
						<div class="col-md-6 offset-md-3 col-xs-12">
							<h1 class="text-xs-center">Sign In</h1>

							<p class="text-xs-center">
								<Link href="/register">Need an account?</Link>
							</p>

							<ul class="error-messages">
								{ state.errors.map(str => <li>{str}</li>) }
							</ul>

							<form onsubmit={ this.onSubmit }>
								<Input lg name="email" type="email"
									placeholder="Email" disabled={ loading } />

								<Input lg name="password" type="password"
									placeholder="Password" disabled={ loading } />

								<button class="btn btn-lg btn-primary pull-xs-right" disabled={ loading }>Sign In</button>
							</form>
						</div>

					</div>
				</div>
			</div>
		)
	}
}