import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({ userName, email, password }) => {
		const success = handleInputErrors({ userName, email, password });
		if (!success) return;

		setLoading(true);

		try {
			const res = await fetch("/api/user/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userName, email, password }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("auth-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};

export default useSignup;

function handleInputErrors({ userName, email, password }) {
	if (!userName || !email || !password) {
		toast.error("Please fill in all fields");
		return false;
	}


	if (password.length < 5) {
		toast.error("Password must be at least 5 characters");
		return false;
	}

	return true;
}