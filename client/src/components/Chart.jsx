import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function PieChart({expenses}) {
    console.log(expenses)

    const totalExpenses = expenses;
    const dailyExpenses = expenses?.filter(expense=>expense.period=='daily');
    const weeklyExpenses = expenses?.filter(expense=>expense.period=='weekly');
    const monthlyExpenses = expenses?.filter(expense=>expense.period=='monthly');
    const Expenses = {
        totalExpenses,dailyExpenses,weeklyExpenses,monthlyExpenses
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


      function getData(expenses){
          return {
            labels: expenses?.map((expense) => expense?.category),
            datasets: [
              {
                title: {
                    display: true,
                    text: 'Custom Chart Title'
                },
                label: "Users Gained",
                data: expenses?.map((expense) => expense?.amount),
                backgroundColor: [
                  ...expenses?.map(ex=>getRandomColor())
                ],
                borderColor: "black",
                borderWidth: 2,
              },
            ],
          }
      }

      function getOptions(title){
          return {
            plugins: {
                title: {
                display: true,
                text: title,
                align: "center",
                },
            },
            }
      }
  return <div className="flex gap-5 px-10 justify-center flex-wrap">
        {
            Object.keys(Expenses)?.map(key=>{
                return <div key={key}>
                    <button className="btn" onClick={()=>document.getElementById(key).showModal()}>show {key}</button>
                    <dialog id={key} className="modal">
                        <div className="modal-box text-center" >
                            <Pie options={getOptions(key)} data={getData(Expenses[key])} />
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
            })
        }
    </div>
}

export default PieChart;









/* 
import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
export default function Chart({expenses}) {

    const Expenses = {
        totalExpenses : expenses,
        dailyExpenses : expenses.filter(expense=>expense.period=='daily'),
        weeklyExpenses : expenses.filter(expense=>expense.period=='weekly'),
        monthlyExpenses : expenses.filter(expense=>expense.period=='monthly')
    }
    const dailyExpenses = expenses.filter(expense=>expense.period=='daily');
    const weeklyExpenses = expenses.filter(expense=>expense.period=='weekly');
    const monthlyExpenses = expenses.filter(expense=>expense.period=='monthly');

    function getDataPoinst(expenses){
        let totalAmount = getTotalAmount(expenses);
        return expenses.map(expense=>{
            console.log(typeof expense.amount,totalAmount);
            let y = Math.floor((expense.amount/totalAmount)*100);
            console.log(y)
            return { y  ,label : expense.category};
        })
    }

    function getTotalAmount(expenses){
        let amount = 0;
        expenses.map(expense=>{
            amount += expense.amount;
        });
        return amount;
    }
    const dataPointsForTotalCost = getDataPoinst(expenses);
    const dataPointsForDailyExpenses = getDataPoinst(dailyExpenses);
    const dataPointsForWeeklyExpenses = getDataPoinst(weeklyExpenses);
    const dataPointsForMonthlyExpenses = getDataPoinst(monthlyExpenses);

    function getOptions(dataPoints,text){
        return {
            animationEnabled: true,
            exportEnabled: true,
            theme: "dark1", // "light1", "dark1", "dark2"
            title:{
                text
            },
            data: [{
                type: "pie",
                indexLabel: "{label}: {y}%",		
                startAngle: -90,
                dataPoints
            }]
        }
    }
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark1", // "light1", "dark1", "dark2"
        title:{
            text: "Expenses"
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}%",		
            startAngle: -90,
            dataPoints:dataPointsForTotalCost
        }]
    }
    
    return (
    <div className="flex flex-wrap justify-center gap-5">

        <div>
            <button className="btn" onClick={()=>document.getElementById('showTotalExpenses').showModal()}>showTotalExpenses</button>
            <dialog id="showTotalExpenses" className="modal">
                <div className="modal-box">
                    <CanvasJSChart options = {getOptions(dataPointsForTotalCost,"Total Expenses")} 
                    /* onRef={ref => this.chart = ref} 
                    />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>


        <div>
            <button className="btn" onClick={()=>document.getElementById('showDailyExpenses').showModal()}>showDailyExpenses</button>
            <dialog id="showDailyExpenses" className="modal">
                <div className="modal-box">
                <CanvasJSChart options = {getOptions(dataPointsForDailyExpenses,"Daily Expenses")} 
                    /* onRef={ref => this.chart = ref} 
                />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>

        <div>
            <button className="btn" onClick={()=>document.getElementById('showWeeklyExpenses').showModal()}>showWeeklyExpenses</button>
            <dialog id="showWeeklyExpenses" className="modal">
                <div className="modal-box">      
                    <CanvasJSChart options = {getOptions(dataPointsForWeeklyExpenses,"Weekly Expenses")} 
                        /* onRef={ref => this.chart = ref} 
                    />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>

        <div>
            <button className="btn" onClick={()=>document.getElementById('showMonthlyExpenses').showModal()}>showMonthlyExpenses</button>
            <dialog id="showMonthlyExpenses" className="modal">
                <div className="modal-box">
                <CanvasJSChart options = {getOptions(dataPointsForMonthlyExpenses,"Monthly Expenses")} 
                    /* onRef={ref => this.chart = ref} 
                />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>

        

        
    </div>
    );
}

*/