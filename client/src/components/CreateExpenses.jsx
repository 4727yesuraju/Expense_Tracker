import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';

export default function CreateExpenses({setTrackChange}) {
  const [formData,setFormData] = useState({});

  function handleChange(e){
    e.preventDefault();
    setFormData(prev=>{return {...prev,[e.target.id] : e.target.value}})
  }

  const {authUser} = useAuthContext();
  async function handleSubmit(e){
    try {
			const res = await fetch("/api/expense/create", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({...formData,userId : authUser._id}),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
		} catch (error) {
			toast.error(error.message);
		}finally{
      setFormData({});
      setTrackChange(prev=>!prev);
    }
  }

  console.log(formData);
  return (
    <div>
      <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>create new Expense</button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog" className="flex flex-col gap-2 pt-5 px-4" >
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <input type="text" placeholder="category" id="category" value={formData.category || ""} onChange={handleChange} className="outline-none border-slate-500 border-b text-center" autoComplete="off"/>
            <input type="text" placeholder="description" id="description" value={formData.description || ""} onChange={handleChange} className="outline-none border-slate-500 border-b text-center" autoComplete="off"/>
            <input type="number" placeholder="amount" id="amount" value={formData.amount || ""} onChange={handleChange} className="outline-none border-slate-500 border-b text-center" autoComplete="off"/>
            <input type="date"  id="date" min={new Date().toISOString().split("T")[0]}  value={formData.date || ""} onChange={handleChange} className="bg-transparent mx-auto"/>
            <select className="select select-info w-full max-w-xs mx-auto" id="period" onChange={handleChange}>
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
