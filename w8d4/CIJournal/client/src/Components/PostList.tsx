import PostComponent from "./PostComponent";
import { Post } from "../App";

interface PostListProps {
	posts: Post[];
	handleEditPost: (post: Post) => void;
	handleDeletePost: (post: Post) => void;
}

const PostList: React.FC<PostListProps> = ({
	posts,
	handleDeletePost,
	handleEditPost,
}) => {
	return (
		<ul className="overflow-auto py-12 w-1/2 ">
			{posts.map((post, i) => (
				<li
					key={i}
					className="rounded bg-amber-50 mt-4 mr-12 pb-8 flex flex-row"
				>
					<PostComponent
						handleEditPost={handleEditPost}
						handleDeletePost={handleDeletePost}
						post={post}
					/>
				</li>
			))}
		</ul>
	);
};

export default PostList;
