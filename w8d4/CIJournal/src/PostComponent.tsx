import { Post } from "./App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

interface PostComponentProps {
	post: Post;
	handleEditPost: (post: Post) => void;
	handleDeletePost: (post: Post) => void;
}

const PostComponent: React.FC<PostComponentProps> = ({
	post,
	handleDeletePost,
	handleEditPost,
}) => {
	return (
		<>
			<div className="ml-4">
				<p className="font-bold my-4">{post.title}</p>
				<p>{post.body}</p>
			</div>
			<div className="absolute right-4 my-4 mx-12 text-lg">
				<FontAwesomeIcon icon={faEdit} onClick={() => handleEditPost(post)} />
				<FontAwesomeIcon
					className="pl-4"
					icon={faTrash}
					onClick={() => handleDeletePost(post)}
				/>
			</div>
		</>
	);
};

export default PostComponent;
