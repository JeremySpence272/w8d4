import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Post } from "../App";

type AxiosHookResponse = {
	initialPosts: Post[] | null;
	initialPostError: AxiosError | null;
	initialPostsLoadingState: boolean;
};

const useFetchAllPosts = (): AxiosHookResponse => {
	const [initialPosts, setInitialPosts] = useState<any | null>(null);
	const [initialPostError, setInitialPostsError] = useState<AxiosError | null>(
		null
	);
	const [initialPostsLoadingState, setInitialPostsLoadingState] =
		useState<boolean>(false);

	useEffect(() => {
		const makeRequest = async (): Promise<void> => {
			try {
				setInitialPostsLoadingState(true);
				setInitialPostsError(null);
				const result: AxiosResponse = await axios.get(
					"http://localhost:3004/posts"
				);
				const data: Post[] = result.data.map((record: any) => ({
					...record,
					id: record._id,
				}));
				setInitialPosts(data);
				setInitialPostsLoadingState(false);
			} catch (error) {
				if (error instanceof AxiosError) {
					setInitialPostsError(error);
					setInitialPostsLoadingState(false);
				}
			}
		};
		makeRequest();
	}, []);

	return { initialPosts, initialPostError, initialPostsLoadingState };
};

export default useFetchAllPosts;
