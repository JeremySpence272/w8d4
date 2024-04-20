import { useState } from "react";
import Form from "./Components/Form";
import PostList from "./Components/PostList";
import useAxiosRequest from "./Hooks/useAxiosRequest";

export type Post = {
	id?: number;
	date: string;
	title: string;
	body: string;
};

const App: React.FC = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [postToEdit, setPostToEdit] = useState<Post | null>(null);

	const { makeRequest, response, error, isLoading } = useAxiosRequest();

	const handleAddNewPost = (post: Post) => {
		if (!post.id) {
			post.id = posts.length > 0 ? posts[posts.length - 1].id! + 1 : 1;
		}
		makeRequest({
			url: "http://localhost:3004/new",
			method: "post",
			data: post,
		});
		setPosts((prevPosts) => [...prevPosts, post]);
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
			{isLoading && <p className="ml-16 text-yellow-500">Loading...</p>}
			{error && <p className="ml-16 text-red-500">Error: {error.message}</p>}
			{response && (
				<p className="ml-16 text-green-500">
					Success: {JSON.stringify(response).slice(0, 33)}...
				</p>
			)}
		</main>
	);
};

export default App;
