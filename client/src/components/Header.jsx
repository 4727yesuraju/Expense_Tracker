import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import LogoutButton from './Logout';

export default function Header() {
    const {authUser} = useAuthContext();
  return (
    <div className="fixed top-0 left-0 w-full bg-black p-5 px-10 flex">  

             {!authUser ? <></> : <div className="flex justify-between w-full">
                  <div className="text-2xl font-bold"><span className="text-red-500">Expense</span> <span className="text-slate-500">Tracker</span></div>
                  <LogoutButton />
             </div>
             }  
    </div>
  )
}
