import React, { useContext, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import { GlobalContext } from "../context/GlobalState";

const ExpenseList = () => {
  const { expenseLists } = useContext(GlobalContext);

  const [expenseItem, setExpenseItem] = useState('');
  const findExpense = expenseLists.filter(expense => (
      expense?.name?.toLowerCase().includes(expenseItem.toLowerCase())
  ))
  
  
  const handleSearch = (e) => {
      setExpenseItem(e.target.value);    
      console.log(findExpense);
    };
  return (
    <>
      <input
        type="text"
        className="form-control mb-2 mr-sm-2"
        placeholder="Type to search..."
        onChange={handleSearch}
      />
      {
        findExpense <= 0 ?<div className="alert ">
        ExpenseItem Not Found
      </div>:
     
      <ul className="list-group mt-3 mb-3">
        {findExpense.map((expenseList) => (
          <ExpenseItem key={expenseList.id} expenseList={expenseList} />
        ))}
      </ul>
       }
    </>
  );
};

export default ExpenseList;
