import { h } from 'preact';
import { Link } from 'preact-router';

export default function (props) {
	let d = props.comment;
	let author = d.author;
	let onClick = props.isMine && props.onDelete(d.id);

	return (
		<div class="card">
			<div class="card-block">
				<p class="card-text">{ d.body }</p>
			</div>

			<div class="card-footer">
				<Link href={ `/@${author.username}` } class="comment-author">
					<img src={ author.image } class="comment-author-img" />
				</Link>

				&nbsp;

				<Link href={ `/@${author.username}` } class="comment-author">
					{ author.username }
				</Link>

				<span class="date-posted">{ new Date(d.createdAt).toDateString() }</span>

				{ props.isMine && (
					<span class="mod-options" onclick={ onClick }>
						<i class="ion-trash-a" />
					</span>
				 ) }
			</div>
		</div>
	)
}