import { IPost } from "@/models";
import './style.scss';
import { useCallback } from "react";
import { displayPrettyNumber } from "@/utils";

interface IProps {
	post: IPost
}

export const PostsListItem: React.FC<IProps> = ({post}) => {
	const onLikeClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		alert("Like!");
	}, []);

	const onCommentsClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		alert("comments!");
	}, []);

	const onSaveClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		alert("save!");
	}, []);

	return (
		<div className="PostsList-PostsListItem">
			<div className="post-details">
				{post.description}
			</div>
			<video
				src={post.resource.url}
				className="resource"
				loop
				autoPlay
				muted
				preload="metadata"
				disablePictureInPicture
				disableRemotePlayback
			/>
			<ul className="post-actions no-styling text-center">
				<li>
					<a href="#" className="no-styling" onClick={onLikeClick}>
						<i className="bi bi-heart-fill fs-2"></i>
						<div>
							{post.stats.likes === false ? 'Like' : displayPrettyNumber(post.stats.likes)}
						</div>
					</a>
				</li>
				<li>
					<a href="#" className="no-styling" onClick={onCommentsClick}>
						<i className="bi bi-chat fs-2"></i>
						<div>
							{post.stats.comments === false ? 'Comment' : displayPrettyNumber(post.stats.comments)}
						</div>
					</a>
				</li>
				<li>
					<a href="#" className="no-styling" onClick={onSaveClick}>
						<i className="bi bi-bookmark-fill fs-2"></i>
						<div>
							{post.stats.saves === false ? 'Save' : displayPrettyNumber(post.stats.saves)}
						</div>
					</a>
				</li>
			</ul>
		</div>
	);
}
