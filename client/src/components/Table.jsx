import React from 'react'
import { useExpenseContext } from '../context/ExpenseContext';
import { GrUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import toast from 'react-hot-toast';
import UpdateExpenses from './updateExpenses';

export default function Table({setTrackChange}) {
    
  const {expenses} = useExpenseContext();

  async function deleteExpense(id){
    try {
        const res = await fetch(`/api/expense/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }
        console.log(data);
    } catch (error) {
        toast.error(error.message);
    } finally{
        setTrackChange(prev=>!prev);
    }
  }
  return (
    <div className="overflow-x-auto">
        <table className="table">
                    <tr>
                    {
                        ["","category","description","period","amount","date","update","delete"].map((col,ind)=>{
                            return <th key={ind}>
                                {col}
                            </th>
                        })
                        }
                        </tr>
                    {
                 expenses?.map((expense,ind)=>{
                    return <tr key={ind}>
                        <td>{ind+1}</td>
                        <td>{expense.category}</td>
                        <td>{expense.description}</td>
                        <td>{expense.period}</td>
                        <td>{expense.amount}</td>
                        <td>{expense.date.slice(0,expense.date.indexOf('T'))}</td>
                        <td><UpdateExpenses expense = {expense} setTrackChange = {setTrackChange} /></td>
                        <td><MdDeleteForever  className="text-2xl" onClick={()=>deleteExpense(expense._id)}/></td>
                    </tr>
                 })
               }
        </table>
    </div>
  )
}
