import { Link } from 'preact-router';
import { h, Component } from 'preact';
import { serialize, toErrors } from '@/utils';
import { login } from '@/api/auth';
import { post } from '@/api';

export default class Register extends Component {
	state = { loading:false, errors:[] }

	onSubmit = ev => {
		ev.preventDefault();
		let user = serialize(ev.target);
		this.setState({ loading:true }, _ => {
			post('users', { user }).then(login).then(console.log).catch(err => {
				this.setState({
					loading: false,
					errors: toErrors(err.errors)
				});
			})
		});
	}

	render(props, state) {
		return (
			<div class="auth-page">
				<div class="container page">
					<div class="row">
						<div class="col-md-6 offset-md-3 col-xs-12">
							<h1 class="text-xs-center">Sign up</h1>

							<p class="text-xs-center">
								<Link href="/login">Have an account?</Link>
							</p>

							<ul class="error-messages">
								{ state.errors.map(str => <li>{str}</li>) }
							</ul>

							<form onsubmit={ this.onSubmit }>
								<fieldset class="form-group">
									<input class="form-control form-control-lg"
										type="text" placeholder="Username" name="username"
										disabled={state.loading} />
								</fieldset>

								<fieldset class="form-group">
									<input class="form-control form-control-lg"
										type="text" placeholder="Email" name="email"
										disabled={state.loading} />
								</fieldset>

								<fieldset class="form-group">
									<input class="form-control form-control-lg"
										type="password" placeholder="Password" name="password"
										disabled={state.loading} />
								</fieldset>

								<button class="btn btn-lg btn-primary pull-xs-right" disabled={state.loading}>Sign up</button>
							</form>
						</div>

					</div>
				</div>
			</div>
		)
	}
}