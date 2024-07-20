import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
    },
    category : {
        required : [true,"category is required"],
        type : String,
    },
    description : {
        required : [true,"description is required"],
        type : String,
    },
    amount : {
        required : [true,"amount is required"],
        type : Number,
    },
    period : {
        required : [true,'period is required'],
        type : String,
    },
    date : {
        required : [true,"date is required"],
        type : Date,
    },
},{
    timestamps : true
});

const Expense = mongoose.model("Expense",expenseSchema);

export default Expense;
