import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import { GrUpdate } from 'react-icons/gr';
import toast from 'react-hot-toast';

export default function UpdateExpenses({setTrackChange,expense}) {
  const {category,amount,date,period,description} = expense;
  const [form,setForm] = useState({category,amount,date,period,description});

  function handleChange(e){
    e.preventDefault();
    setForm(prev=>{return {...prev,[e.target.id] : e.target.value}})
  }

  async function handleSubmit(e){
    try {
			const res = await fetch(`/api/expense/${expense._id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({...form}),
			});
		} catch (error) {
			toast.error(error.message);
		}finally{
            setForm({});
            setTrackChange(prev=>!prev);
        }
  }

  console.log(form);
  return (
    <div>
      <button  onClick={()=>document.getElementById(expense._id).showModal()}><GrUpdate /></button>
      <dialog id={`${expense._id}`} className="modal">
        <div className="modal-box">
          <form method="dialog" className="flex flex-col gap-2 pt-5 px-4" >
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <input type="text" placeholder="category" id="category" value={form?.category || ""} onChange={handleChange} className="outline-none border-slate-500 border-b text-center" autoComplete="off"/>
            <input type="text" placeholder="description" id="description" value={form?.description || ""} onChange={handleChange} className="outline-none border-slate-500 border-b text-center" autoComplete="off"/>
            <input type="number" placeholder="amount" id="amount" value={form.amount || ""} onChange={handleChange} className="outline-none border-slate-500 border-b text-center" autoComplete="off"/>
            <input type="date"  id="date" min={new Date().toISOString().split("T")[0]}  value={form?.date?.split("T")[0] || ""} onChange={handleChange} className="bg-transparent mx-auto"/>
            <select className="select select-info w-full max-w-xs mx-auto" id="period" onChange={handleChange} value={form.period}>
              <option disabled selected>Select recurring</option>
              {["daily","weekly","monthly",].map((freq,ind)=>(<option key={ind}>{freq}</option>))}
            </select>
            <button className="btn" onClick={handleSubmit}>submit</button>
          </form>
        </div>
      </dialog>
    </div>
  )
}
