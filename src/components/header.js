import { h } from 'preact';
import { Link } from 'preact-router/match';

const isUser = [
	{ icon:'compose', text:'New Post', href:'/editor' },
	{ icon:'gear-a', text:'Settings', href:'/settings' }
];

const isVisitor = [
	{ text:'Sign In', href:'/login' },
	{ text:'Sign Up', href:'/register' }
];

function Item(props) {
	return (
		<li class="nav-item">
			<Link href={ props.href } activeClassName="active" class="nav-link">
				{ props.icon && h('i', { class:`ion-${props.icon}`, style:'padding-right:3px' }) }
				{ props.text }
			</Link>
		</li>
	);
}

export default function Header(props) {
	let user = props.user;
	let links = [{ href:'/', text:'Home' }].concat(user ? isUser : isVisitor);

	return (
		<nav class="navbar navbar-light">
      <div class="container">
				<Link class="navbar-brand" href="/">conduit</Link>
        <ul class="nav navbar-nav pull-xs-right">
					{ links.map(Item) }
					{
						user && (
						<li class="nav-item">
							<Link href={ `/@${user.username}` } activeClassName="active" class="nav-link">
								<img src={ user.image } /> { user.username }
							</Link>
						</li>
						)
					}
        </ul>
      </div>
    </nav>
	)
}
