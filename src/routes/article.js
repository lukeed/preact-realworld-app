import translate from 'snarkdown';
import { Link } from 'preact-router';
import { h, Component } from 'preact';
import Meta from '@/components/article-meta';
import { getUser } from '@/utils/local';
import { del, get, post } from '@/api';

export default class Article extends Component {
	state = { loading:true, user:getUser(), item:{} }

	onFollow = _ => {
		let item = this.state.item;
		let func = item.author.following ? del : post;
		func(`profiles/${item.author.username}/follow`).then(res => {
			item.author = res.profile;
			this.setState({ item });
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
		let data = state.item;
		let author = data.author || {};
		let isAuthor = me && me.username === author.username;

		return (
			<div class="article-page">
				<div class="banner">
					<div class="container">
						<h1>{ data.title }</h1>
						<Meta isOwner={ isAuthor } article={ data } onFollow={ this.onFollow } />
					</div>
				</div>

				<div class="container page">
					<div class="row article-content">
						<div class="col-md-12" dangerouslySetInnerHTML={{ __html:data.body }} />
					</div>

					<hr />

					<div class="article-actions">
						<Meta isOwner={ isAuthor } article={ data } onFollow={ this.onFollow } />
					</div>

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