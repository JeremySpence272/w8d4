import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useAxiosRequest from "../Hooks/useAxiosRequest";

type Credentials = {
	username: string;
	password: string;
};

interface AuthFormProps {
	authType: "login" | "register";
	handleLoginSuccess: () => void;
	handleResetAuthType: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
	authType,
	handleResetAuthType,
	handleLoginSuccess,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Credentials>();

	const { makeRequest, response, error, isLoading } = useAxiosRequest();

	useEffect(() => {
		if (authType === "register") {
			if (response && !error && !isLoading) handleLoginSuccess();
		} else {
			if (response && !error && !isLoading) {
				if (response.data === "success") {
					handleLoginSuccess();
				} else {
					console.log(response);
				}
			} else {
				console.log(error);
			}
		}
	}, [response]);

	const onSubmit = (data: Credentials) => {
		if (authType === "register") {
			makeRequest({
				url: "http://localhost:3004/register",
				method: "POST",
				data: data,
			});
		} else {
			makeRequest({
				url: "http://localhost:3004/login",
				method: "POST",
				data: data,
			});
		}
	};

	return (
		<>
			<h2 className="text-2xl font-bold text-white text-center py-8">
				{authType[0].toUpperCase() + authType.slice(1)}
			</h2>
			<button
				className="p-2 w-1/2 mx-auto rounded mb-16  bg-amber-50"
				onClick={() => handleResetAuthType()}
			>
				Back
			</button>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col w-1/2 mx-auto "
			>
				<input
					{...register("username", {
						required: "This is required",
					})}
					className="rounded mb-8 p-4 bg-amber-50"
					placeholder="username"
				/>
				<input
					{...register("password", {
						required: "This is required",
					})}
					className="rounded mb-8 p-4 bg-amber-50"
					placeholder="password"
				/>
				<input
					className=" rounded border my-8 p-2 hover:text-zinc-900 cursor-pointer hover:border-zinc-900 hover:bg-amber-50 text-center text-white"
					type="submit"
				/>
			</form>
		</>
	);
};

export default AuthForm;
