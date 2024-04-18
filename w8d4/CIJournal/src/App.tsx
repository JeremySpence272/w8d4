import { useState } from "react";
import Form from "./Form";
import PostList from "./PostList";

export type Post = {
	title: string;
	body: string;
};

const App: React.FC = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [postToEdit, setPostToEdit] = useState<Post | null>(null);

	const handleAddNewPost = (post: Post): void => {
		setPosts((prevPosts) => [...prevPosts, post]);
		setPostToEdit(null);
	};

	const handleEditPost = (post: Post): void => {
		setPostToEdit(post);
		handleDeletePost(post);
	};

	const handleDeletePost = (postToDelete: Post): void => {
		const filteredPosts = posts.filter(
			(post) => post.title !== postToDelete.title
		);
		setPosts(filteredPosts);
	};

	return (
		<main className="font-mono min-h-screen bg-zinc-900">
			<h1 className="text-2xl font-bold text-white text-center py-8">
				CI Journal
			</h1>
			<div className="flex flex-row">
				<Form postToEdit={postToEdit} handleAddNewPost={handleAddNewPost} />
				<PostList
					handleEditPost={handleEditPost}
					handleDeletePost={handleDeletePost}
					posts={posts}
				/>
			</div>
		</main>
	);
};

export default App;
