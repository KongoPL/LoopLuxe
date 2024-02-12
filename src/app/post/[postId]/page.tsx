interface IParams {
	params: {
		postId: string;
	}
}

export default function PostDetailsPage({params: {postId}}: IParams) {
	return <div>Display post: {postId}</div>;
}
