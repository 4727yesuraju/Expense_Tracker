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
                    <CanvasJSChart options = {getOptions(dataPointsForTotalCost,"Total Expenses")} 
                    /* onRef={ref => this.chart = ref} */
                    />
    </div>
    );
}
