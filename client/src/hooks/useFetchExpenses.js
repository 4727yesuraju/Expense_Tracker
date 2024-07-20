import { useState } from "react";
import { useExpenseContext } from "../context/ExpenseContext";
import toast from "react-hot-toast";

const useFetchExpenses = ()=>{
    const [loading, setLoading] = useState(false);
	const { setExpenses } = useExpenseContext();

	const fetchExpenses = async (email, password) => {
		setLoading(true);
		try {
			const res = await fetch("/api/expense/", {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.setItem("expenses", JSON.stringify(data));
			setExpenses(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, fetchExpenses };
}

export default useFetchExpenses;