import { useState } from "react";
import AuthForm from "./AuthForm";

interface AuthComponentProps {
	handleLoginSuccess: () => void;
}
const AuthComponent: React.FC<AuthComponentProps> = ({
	handleLoginSuccess,
}) => {
	const [authOption, setAuthOption] = useState<"login" | "register" | null>(
		null
	);
	const handleResetAuthType = () => {
		setAuthOption(null);
	};
	return (
		<div className="flex flex-col align-middle my-16 mx-auto w-1/2">
			{!authOption ? (
				<>
					<button
						className="p-2 w-1/2 mx-auto rounded mt-24 m-4 bg-amber-50"
						onClick={() => setAuthOption("login")}
					>
						Log In
					</button>
					<button
						className="p-2 w-1/2 rounded mx-auto m-4 bg-amber-50"
						onClick={() => setAuthOption("register")}
					>
						Sign Up
					</button>
				</>
			) : (
				<AuthForm
					handleLoginSuccess={handleLoginSuccess}
					authType={authOption}
					handleResetAuthType={handleResetAuthType}
				/>
			)}
		</div>
	);
};

export default AuthComponent;
