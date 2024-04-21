import { Post } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

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
	const [isBeingEdited, setIsBeingEdited] = useState<boolean>(false);

	useEffect(() => {
		setIsBeingEdited(false);
	}, []);
	const toggleEditing = () => {
		console.log("editing post");
		handleEditPost(post);
		setIsBeingEdited(true);
	};

	return (
		<>
			<div className="ml-4">
				<p className="font-bold mt-4 text-xl">
					{isBeingEdited ? "currently editing post" : post.title}
				</p>
				<p className="italic text-sm mb-4">
					{post.date + " : " + post.id ?? "no id"}
				</p>
				<p>{post.body}</p>
			</div>
			<div className="absolute right-4 my-4 mx-12 text-lg">
				<FontAwesomeIcon
					className="cursor-pointer"
					icon={faEdit}
					onClick={() => toggleEditing()}
				/>
				<FontAwesomeIcon
					className="pl-4 cursor-pointer"
					icon={faTrash}
					onClick={() => handleDeletePost(post)}
				/>
			</div>
		</>
	);
};

export default PostComponent;
