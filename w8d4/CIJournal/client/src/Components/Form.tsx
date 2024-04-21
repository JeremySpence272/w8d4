import { Post } from "../App";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface handleAddNewPost {
	handleAddNewPost: (post: Post) => void;
	handleUpdatePost: (post: Post) => void;
	postToEdit: Post | null;
}

const Form: React.FC<handleAddNewPost> = ({
	handleAddNewPost,
	handleUpdatePost,
	postToEdit,
}) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Post>();

	useEffect(() => {
		reset({
			title: postToEdit ? postToEdit.title : "",
			date: postToEdit ? postToEdit.date : "",
			body: postToEdit ? postToEdit.body : "",
		});
	}, [postToEdit, reset]);

	const validateDate = (dateStr: string): boolean | string => {
		const splitStr: string[] = dateStr.split("/");
		if (splitStr.length !== 3) return "invalid date format";
		const month: number = parseInt(splitStr[0]) - 1;
		const day: number = parseInt(splitStr[1]);
		const year: number = parseInt(splitStr[2]);

		const dateObj = new Date(year, month, day);

		if (
			dateObj.getFullYear() !== year ||
			dateObj.getMonth() !== month ||
			dateObj.getDate() !== day
		) {
			return "invalid date";
		}

		return true;
	};

	const onSubmit = (data: Post) => {
		const newPost = {
			title: data.title,
			body: data.body,
			date: data.date,
		};
		if (!postToEdit) {
			handleAddNewPost(newPost);
		} else {
			handleUpdatePost({ ...newPost, id: postToEdit.id! });
		}
		reset();
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col w-1/2 mx-auto p-16"
		>
			<input
				{...register("title", {
					required: "This is required",
				})}
				className="rounded mb-8 p-4 bg-amber-50"
				placeholder="title"
			/>
			<input
				{...register("date", {
					required: "This is required",
					validate: validateDate,
				})}
				className="rounded mb-8 p-4 bg-amber-50"
				placeholder="Date (format: MM/DD/YYYY)"
			/>
			<textarea
				{...register("body", {
					required: "This is required",
				})}
				className="rounded p-4 h-32  bg-amber-50"
				placeholder="body"
			/>
			{errors.date && (
				<p className="text-sm mt-4 text-red-500">{errors.date.message}</p>
			)}
			<input
				className=" rounded border my-8 p-2 hover:text-zinc-900 cursor-pointer hover:border-zinc-900 hover:bg-amber-50 text-center text-white"
				type="submit"
			/>
		</form>
	);
};

export default Form;
