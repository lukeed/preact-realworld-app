import { h, Component } from 'preact';
import Input from '@/components/input';
import { getUser } from  '@/utils/local';
import { login, logout } from '@/api/auth';
import { serialize } from  '@/utils';
import { put } from '@/api';

export default class Settings extends Component {
	state = { loading:false, user:getUser() };

	logout = logout;

	onSubmit = ev => {
		ev.preventDefault();
		let user = serialize(ev.target);
		this.setState({ loading:true }, _ => {
			put('user', { user }).then(login).catch(err => {
				this.setState({ loading:false });
			})
		});
	}

	render(_, { user, loading }) {
		return (
			<div class="settings-page">
				<div class="container page">
					<div class="row">

						<div class="col-md-6 offset-md-3 col-xs-12">
							<h1 class="text-xs-center">Your Settings</h1>

							<form onsubmit={ this.onSubmit }>
								<fieldset>
									<Input name="image" disabled={ loading }
										placeholder="URL of profile picture" value={ user.image } />

									<Input lg name="username" disabled={ loading }
										placeholder="Username" value={ user.username } />

									<Input textarea lg rows="8" name="bio" disabled={ loading }
										placeholder="Short bio about you" value={ user.bio } />

									<Input lg type="email" name="email" disabled={ loading }
										placeholder="Email" value={ user.email } />

									<Input lg type="password" name="password" disabled={ loading }
										placeholder="New Password" value={ user.password } />

									<button class="btn btn-lg btn-primary pull-xs-right" disabled={ loading }>
										Update Settings
									</button>
								</fieldset>
							</form>

							<hr/>

							<button class="btn btn-outline-danger" onclick={ this.logout }>
								Or click here to logout.
							</button>
						</div>

					</div>
				</div>
			</div>
		)
	}
}