import React, { useEffect, useState } from 'react'
import './xpense.css';
import ExpenseModal from './Components/ExpenseModal';
import IncomeModal from './Components/IncomeModal';
import { IoPizzaOutline, IoGiftOutline } from "react-icons/io5";
import { CiRollingSuitcase } from "react-icons/ci";
import { ImCancelCircle } from "react-icons/im";
import { MdOutlineEdit } from "react-icons/md";
import { useSnackbar } from 'notistack';
import ExpensePieChart from './Components/ExpensePieChart';
import TopExpenseBarChart from './Components/TopExpenseBarChart';



const Xpense = () => {
  const [open, setOpen] = useState(false);
  const [incomeOpen, setIncomeOpen] = useState(false);
  const [balance, setBalance] = useState(Number(localStorage.getItem("balance")) || 5000);
  const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem("expenses")) || []);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleIncomeOpen = () => setIncomeOpen(true);
  const handleIncomeClose = () => setIncomeOpen(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const handleAddIncome = (amount) => {
      const newBalance = balance + Number(amount);
      setBalance(newBalance);
      localStorage.setItem("balance", newBalance);
    };

    const handleAddExpense = (data) => {

      if(data.price > balance){
        enqueueSnackbar("You cannot spend more than your wallet balance!",{variant:"warning"});
        return;
      }

      const updatedExpenses = [...expenses, data];
      setExpenses(updatedExpenses);
      
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      
      const newBalance = balance - Number(data.price);
      setBalance(newBalance);
      localStorage.setItem("balance", newBalance);
    };

    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.price, 0);

    const getCategoryIcon = (category) => {
      if(category === "Food"){
        return <IoPizzaOutline size={22} className="category-icon"/>;
      }
      else if(category === "Entertainment"){
        return <IoGiftOutline size={22} className="category-icon" />
      }
      else if(category === "Travel"){
        return <CiRollingSuitcase size={22} className="category-icon" />
      }
    }

    const categoryTotals = expenses.reduce(
      (acc, exp) => {
        acc[exp.category] += Number(exp.price);
        return acc;
      },
      { Food: 0, Entertainment: 0, Travel: 0 }
    );

    const chartData = [
      { name: "Food", value: categoryTotals.Food },
      { name: "Entertainment", value: categoryTotals.Entertainment },
      { name: "Travel", value: categoryTotals.Travel },
    ];

    const barData = [
      { name: "Food", value: categoryTotals.Food },
      { name: "Entertainment", value: categoryTotals.Entertainment },
      { name: "Travel", value: categoryTotals.Travel },
    ];

    const handleDeleteExpense = (id, price) => {
          const updatedExpenses = expenses.filter((exp) => exp.id !== id);

          setExpenses(updatedExpenses);
          localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

          const newBalance = balance + Number(price);
          setBalance(newBalance);
          localStorage.setItem("balance", newBalance);
        };


  return (
    <div>
      <h1>Expense Tracker</h1>
      <div className='outside-container'>
        <div className="card">
          <h2>Wallet Balance: <span className="balance">₹{balance}</span></h2>
          <button className="btn income-btn" onClick={handleIncomeOpen}>+ Add Income</button>
        </div>

       
        <div className="card">
          <h2>Expenses: <span className="expense">₹{totalExpenses}</span></h2>
          <button className="btn expense-btn" onClick={handleOpen}>
            + Add Expense
          </button>
        </div>
        
         <div className="legend-row">
            <div className="pie-chart-box">
              <ExpensePieChart data={chartData} />         
            </div>
            <div className="legend">
              <span className="dot food"></span>Food
              <span className="dot ent"></span>Entertainment
              <span className="dot trv"></span>Travel
           </div>
        </div>
      </div>
            

      <div className="middle-section">

        <div className="mid-box expense-list">
          <h2 className="section-title">Recent Transactions</h2>
              <div className="content-card no-trans">
          {expenses.length > 0 ? (
            expenses.map((exp) => (
              <div key={exp.id} className="transaction-item">
                      <div className="left-section">
                        <div className="icon-circle">{getCategoryIcon(exp.category)}</div>

                          <div className="text-group">
                            <p className="title">{exp.title}</p>
                            <p className="date">{exp.date}</p>
                          </div>
                    </div>               
                    <div className="right-section">
                      <p className="amount">₹{exp.price}</p>
                      <div className="btn-group">
                        <button className="delete-btn"onClick={() => handleDeleteExpense(exp.id, exp.price)}><ImCancelCircle /></button>
                        <button className="edit-btn"><MdOutlineEdit /></button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-trans">No recent transactions</p>
              )}
            </div>

        </div>

        <div className="mid-box">
          <h2 className="section-title">Top Expenses</h2>
          <div className="content-card ">
           <TopExpenseBarChart data={barData}/>
          </div>
        </div>

      </div>
      <ExpenseModal 
        open={open} 
        handleClose={handleClose} 
        handleAddExpense={handleAddExpense} 
      />
      <IncomeModal 
        incomeOpen={incomeOpen} 
        handleIncomeClose={handleIncomeClose} 
        handleAddIncome={handleAddIncome}/>
    </div>
  );
}

export default Xpense
