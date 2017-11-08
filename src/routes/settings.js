import { h, Component } from 'preact';
import { logout } from '@/api/auth';
import Input from '@/components/input';

export default class Settings extends Component {
	state = { loading:false };

	logout = logout;

	render(props, state) {
		return (
			<div class="settings-page">
				<div class="container page">
					<div class="row">

						<div class="col-md-6 offset-md-3 col-xs-12">
							<h1 class="text-xs-center">Your Settings</h1>

							<form>
								<fieldset>
									<Input placeholder="URL of profile picture" name="image" value={ user.image } />

									<Input lg placeholder="Username" name="username" value={ user.username } />

									<Input textarea lg placeholder="Short bio about you" rows="8" name="bio" value={ user.bio } />

									<Input lg placeholder="Email" type="email" name="email" value={ user.email } />

									<Input lg placeholder="New Password" type="password" name="password" value={ user.password } />

									<button class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
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