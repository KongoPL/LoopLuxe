import { IPost } from "@/models"
import { PostsListItem } from "./PostsListItem"

interface IProps {
	posts: IPost[]
}

export const PostsList: React.FC<IProps> = ({posts}) => {
	return <>
		{posts.map(p => <PostsListItem key={p.id} post={p} />)}
	</>
}
