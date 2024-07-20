import { createContext, useContext, useState } from "react";

export const ExpenseContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useExpenseContext = () => {
	return useContext(ExpenseContext);
};

export const ExpenseContextProvider = ({ children }) => {
	const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem("expenses")) || null);

	return <ExpenseContext.Provider value={{ expenses, setExpenses }}>{children}</ExpenseContext.Provider>;
};