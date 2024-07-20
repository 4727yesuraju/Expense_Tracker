import React, { useEffect, useState } from 'react'
import useFetchExpenses from '../hooks/useFetchExpenses';
import { useExpenseContext } from '../context/ExpenseContext';
import {  useAuthContext } from '../context/AuthContext';
import Table from '../components/Table';
import CreateExpenses from '../components/CreateExpenses';
import CsvDownloadButton from 'react-json-to-csv'
import Chart from '../components/Chart';

export default function Home() {

  const { loading, fetchExpenses } = useFetchExpenses();
  const {expenses} = useExpenseContext();

  const [trackChange,setTrackChange] = useState(true);
  const [totalAmount,setTotalAmount] = useState(0);

  useEffect(()=>{
     fetchExpenses();
  },[trackChange]);

  useEffect(()=>{
    let amount = 0;
     expenses?.map(expense=>{
         amount += expense.amount;
     })
     setTotalAmount(amount);
  },[expenses]);

  return (
    <div className="">
      {loading ? <span className='loading loading-spinner '></span> : <div className="flex flex-col gap-5">
          <div className="w-full text-center flex justify-between px-8 items-center">
            <CreateExpenses setTrackChange={setTrackChange}/>
            <div>Total Expense : {totalAmount}</div>
            <CsvDownloadButton data={expenses} />
          </div>
          <Table setTrackChange={setTrackChange}/>
          <Chart expenses ={expenses}/>
      </div>
      }
    </div>
  )
}
