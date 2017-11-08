import translate from 'snarkdown';
import { h, Component } from 'preact';
import { route, Link } from 'preact-router';
import Meta from '@/components/article-meta';
import { getUser } from '@/utils/local';
import { del, get, post } from '@/api';

export default class Article extends Component {
	state = { loading:true, user:getUser(), item:{} }

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

							<div class="card">
								<div class="card-block">
									<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
								</div>
								<div class="card-footer">
									<a href="" class="comment-author">
										<img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
									</a>
									&nbsp;
									<a href="" class="comment-author">Jacob Schmidt</a>
									<span class="date-posted">Dec 29th</span>
								</div>
							</div>

							<div class="card">
								<div class="card-block">
									<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
								</div>
								<div class="card-footer">
									<a href="" class="comment-author">
										<img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
									</a>
									&nbsp;
									<a href="" class="comment-author">Jacob Schmidt</a>
									<span class="date-posted">Dec 29th</span>
									<span class="mod-options">
										<i class="ion-edit" />
										<i class="ion-trash-a" />
									</span>
								</div>
							</div>

						</div>

					</div>

				</div>

			</div>
		);
	}
}