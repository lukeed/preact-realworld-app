import { h, Component } from 'preact';
import { Link } from 'preact-router';
import translate from 'snarkdown';
import { get } from '@/api';

export default class Article extends Component {
	state = { loading:true, item:{} }

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
		let data = state.item;
		let author = data.author || {};

		return (
			<div class="article-page">
				<div class="banner">
					<div class="container">

						<h1>{ data.title }</h1>

						<div class="article-meta">
							<Link href={ `/@${author.username}` }>
								<img src={ author.image } />
							</Link>

							<div class="info">
								<Link class="author" href={ `/@${author.username}` }>{ author.username }</Link>
								<span class="date">{ new Date(data.createdAt).toDateString() }</span>
							</div>

							<button class="btn btn-sm btn-outline-secondary">
								<i class="ion-plus-round" />
								&nbsp;
								Follow Eric Simons <span class="counter">(10)</span>
							</button>
							&nbsp;&nbsp;
							<button class="btn btn-sm btn-outline-primary">
								<i class="ion-heart" />
								&nbsp;
								Favorite Post <span class="counter">(29)</span>
							</button>
						</div>

					</div>
				</div>

				<div class="container page">
					<div class="row article-content">
						<div class="col-md-12" dangerouslySetInnerHTML={{ __html:data.body }} />
					</div>

					<hr />

					<div class="article-actions">
						<div class="article-meta">
							<a href="profile.html">
								<img src="http://i.imgur.com/Qr71crq.jpg" />
							</a>

							<div class="info">
								<a href="" class="author">Eric Simons</a>
								<span class="date">January 20th</span>
							</div>

							<button class="btn btn-sm btn-outline-secondary">
								<i class="ion-plus-round" />
								&nbsp;
								Follow Eric Simons <span class="counter">(10)</span>
							</button>
							&nbsp;
							<button class="btn btn-sm btn-outline-primary">
								<i class="ion-heart" />
								&nbsp;
								Favorite Post <span class="counter">(29)</span>
							</button>
						</div>
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