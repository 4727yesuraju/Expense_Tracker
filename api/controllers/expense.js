import Expense from "../models/expense.js";


export  async function createExpense(req,res){
     try {
        const expense = await Expense.create(req.body);
        res.json(expense);
     } catch (error) {
        console.log("Error in createExpense controller : ", error.message);
		res.status(500).json({ error: "Internal Server Error" });
     }
}

export  async function updateExpense(req,res){
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ error: "Expense not found" });
        }
        if (req.user.id !== expense.userId.toString()) {
           return  res.status(401).json({ error: "You can only update your own expenses!" });
        }
        const updatedExpense = await Expense.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
        );
        res.status(200).json(updatedExpense);
     } catch (error) {
        console.log("Error in createExpense controller : ", error.message);
		res.status(500).json({ error: error.message });
     }
}

export  async function getExpense(req,res){
    
    try {
         const expense = await Expense.findById(req.params.id);
     
         if (!expense) {
             return res.status(404).json({ error: "Expense not found" });
         }
        res.status(200).json(expense);
     } catch (error) {
        console.log("Error in createExpense controller : ", error.message);
		res.status(500).json({ error: "Internal Server Error" });
     }
}

export  async function getExpenses(req,res){
     try {
        const expenses =await  Expense.find();
        res.status(200).json(expenses);
     } catch (error) {
        console.log("Error in createExpense controller : ", error.message);
		res.status(500).json({ error: "Internal Server Error" });
     }
}

export  async function deleteExpense(req,res){  
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ error: "Expense not found" });
        }
        if (req.user.id !== expense.userId.toString()) {
           return  res.status(401).json({ error: "You can only update your own expenses!" });
        }
        const updatedExpense = await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json("deleted successfully  ");
     } catch (error) {
        console.log("Error in deleteExpense controller : ", error.message);
		res.status(500).json({ error: error.message });
     }
}