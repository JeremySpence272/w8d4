import { useForm } from "react-hook-form";
import { Post } from "./App";
import { useEffect } from "react";

interface handleAddNewPost {
	handleAddNewPost: (post: Post) => void;
	postToEdit: Post | null;
}

const Form: React.FC<handleAddNewPost> = ({ handleAddNewPost, postToEdit }) => {
	const { register, handleSubmit, reset } = useForm<Post>();

	useEffect(() => {
		reset({
			title: postToEdit ? postToEdit.title : "",
			body: postToEdit ? postToEdit.body : "",
		});
	}, [postToEdit, reset]);

	return (
		<form
			onSubmit={handleSubmit((data) => {
				handleAddNewPost({
					title: data["title"] as string,
					body: data["body"] as string,
				});
				reset();
			})}
			className="flex flex-col w-1/2 mx-auto p-16"
		>
			<input
				{...register("title")}
				className="rounded mb-8 p-4 bg-amber-50"
				placeholder="title"
			/>
			<textarea
				{...register("body")}
				className="rounded p-4 h-32  bg-amber-50"
				placeholder="body"
			/>
			<input
				className=" rounded border my-8 p-2 hover:bg-amber-50 text-center text-white"
				type="submit"
			/>
		</form>
	);
};

export default Form;
