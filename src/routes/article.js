import translate from 'snarkdown';
import { h, Component } from 'preact';
import { route, Link } from 'preact-router';
import Comment from '@/components/article-comment';
import Meta from '@/components/article-meta';
import { getUser } from '@/utils/local';
import { del, get, post } from '@/api';

export default class Article extends Component {
	state = {
		loading: true,
		user: getUser(),
		comments: [],
		item: {}
	}

	onDelete = _ => {
		del(`articles/${this.state.item.slug}`).then(_ => {
			route('/'); // back to home/dashboard
		});
	}

	onFollow = _ => {
		let item = this.state.item;
		let func = item.author.following ? del : post;
		func(`profiles/${item.author.username}/follow`).then(res => {
			item.author = res.profile;
			this.setState({ item });
		});
	}

	onFavorite = _ => {
		let item = this.state.item;
		let func = item.favorited ? del : post;
		func(`articles/${item.slug}/favorite`).then(res => {
			this.setState({ item:res.article });
		});
	}

	getItem(slug) {
		slug = slug || this.props.title;

		get(`articles/${slug}`).then(res => {
			let item = res.article;
			item.body = translate(item.body);
			this.setState({ loading:false, item });
		}).catch(err => {
			if (err.status === '404') {
				console.warn(`(404) Not found for '/articles/${slug}'...Back to safety!`);
				route('/', true);
			}
		});

		get(`articles/${slug}/comments`).then(res => {
			this.setState({ comments:res.comments });
		});
	}

	componentWillMount() {
		this.getItem();
	}

	componentWillReceiveProps(nxt) {
		this.getItem(nxt.title);
	}

	render(_, state) {
		let me = state.user;
		let article = state.item;
		let isOwner = me && me.username === (article.author || {}).username;

		let meta = h(Meta, {
			article, isOwner,
			onDelete: this.onDelete,
			onFavorite: this.onFavorite,
			onFollow: this.onFollow
		});

		return (
			<div class="article-page">
				<div class="banner">
					<div class="container">
						<h1>{ article.title }</h1>
						{ meta }
					</div>
				</div>

				<div class="container page">
					<div class="row article-content">
						<div class="col-md-12" dangerouslySetInnerHTML={{ __html:article.body }} />
					</div>

					<hr />

					<div class="article-actions">{ meta }</div>

					<div class="row">
						<div class="col-xs-12 col-md-8 offset-md-2">
							<form class="card comment-form">
								<div class="card-block">
									<textarea class="form-control" placeholder="Write a comment..." rows="3" />
								</div>
								<div class="card-footer">
									<img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
									<button class="btn btn-sm btn-primary">Post Comment</button>
								</div>
							</form>

							{
								state.comments.map(obj => {
									let isMine = me && me.username === obj.author.username;
									return h(Comment, { key:obj.id, comment:obj, isMine });
								})
							}
						</div>

					</div>

				</div>

			</div>
		);
	}
}