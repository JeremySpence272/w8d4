import { useEffect, useState } from "react";
import Form from "./Components/Form";
import PostList from "./Components/PostList";
import useAxiosRequest from "./Hooks/useAxiosRequest";
import useFetchAllPosts from "./Hooks/useFetchAllPosts";
import AuthComponent from "./Components/AuthComponent";

export type Post = {
	id?: string;
	date: string;
	title: string;
	body: string;
};

type MessageType = {
	type: "error" | "loading" | "success";
	message: string;
};

const App: React.FC = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [postToEdit, setPostToEdit] = useState<Post | null>(null);
	const [showMessage, setShowMessage] = useState<MessageType | null>(null);
	const [postInQueue, setPostInQueue] = useState<Post | null>(null);

	const [isAuth, setIsAuth] = useState<boolean>(false);

	const { makeRequest, response, error, isLoading } = useAxiosRequest();
	const { initialPosts, initialPostError, initialPostsLoadingState } =
		useFetchAllPosts();

	useEffect(() => {
		if (error) {
			setShowMessage({
				type: "error",
				message: `Something went wrong: ${error.message}`,
			});
		}
	}, [error, initialPostError]);

	useEffect(() => {
		if (response) {
			setShowMessage({
				type: "success",
				message: "Successful database operation!",
			});

			if (response.data.newId && postInQueue) {
				postInQueue.id = response.data.newId;
				setPosts((prevPosts) => [...prevPosts, postInQueue]);
			}
		}
	}, [response, initialPosts]);

	useEffect(() => {
		if (isLoading) {
			setShowMessage({
				type: "loading",
				message: "Loading database operation",
			});
		}
	}, [isLoading, initialPostsLoadingState]);

	useEffect(() => {
		if (initialPosts) setPosts(initialPosts);
	}, [initialPosts]);

	useEffect(() => {
		setTimeout(() => {
			setShowMessage(null);
		}, 3000);
	}, [showMessage]);

	const handleAddNewPost = async (post: Post) => {
		await makeRequest({
			url: "http://localhost:3004/new",
			method: "POST",
			data: post,
		});

		setPostInQueue(post);
	};

	const handleEditPost = (post: Post): void => {
		setPostToEdit(post);
	};

	const handleUpdatePost = (newPost: Post): void => {
		makeRequest({
			url: `http://localhost:3004/update/${newPost.id!}`,
			method: "PUT",
			data: newPost,
		});
		const updatedPostList = posts.map((post) => {
			if (post.id === newPost.id) return newPost;
			else return post;
		});
		setPosts(updatedPostList);
		setPostToEdit(null);
	};

	const handleDeletePost = (postToDelete: Post): void => {
		makeRequest({
			url: `http://localhost:3004/delete/${postToDelete.id!}`,
			method: "DELETE",
		});
		const filteredPosts = posts.filter(
			(post) => post.title !== postToDelete.title
		);
		setPosts(filteredPosts);
	};

	const handleLoginSuccess = () => {
		setIsAuth(true);
	};

	const handleLogOut = () => {
		setIsAuth(false);
	};

	if (!isAuth) {
		return (
			<main className="font-mono min-h-screen bg-zinc-900">
				<h1 className="text-2xl font-bold text-white text-center py-8">
					CI Journal
				</h1>
				<AuthComponent handleLoginSuccess={handleLoginSuccess} />;
			</main>
		);
	}

	return (
		<main className="font-mono min-h-screen bg-zinc-900">
			<h1 className="text-2xl font-bold text-white text-center py-8">
				CI Journal
			</h1>

			{showMessage && (
				<p
					className={`${
						showMessage.type === "error"
							? "text-red-500"
							: showMessage.type === "loading"
							? "text-yellow-500"
							: "text-green-500"
					} ml-16 -mb-12 text-sm`}
				>
					{showMessage.message}
				</p>
			)}
			<div className="flex flex-row">
				<Form
					postToEdit={postToEdit}
					handleAddNewPost={handleAddNewPost}
					handleUpdatePost={handleUpdatePost}
				/>

				<PostList
					handleEditPost={handleEditPost}
					handleDeletePost={handleDeletePost}
					posts={posts}
				/>
			</div>
			<button
				className="p-2 w-24 ml-16 rounded mb-16  bg-amber-50"
				onClick={handleLogOut}
			>
				Log Out
			</button>
		</main>
	);
};

export default App;
