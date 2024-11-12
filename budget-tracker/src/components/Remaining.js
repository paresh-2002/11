import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const Remaining = () => {
    const {expenseLists, budget} = useContext(GlobalContext)
    const total = expenseLists.reduce((acc, expense) => (acc += expense.cost), 0).toFixed(2)
    const alertType = total > budget ? 'alert-danger' : 'alert-success'
    
  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining : £{budget-total}</span>
    </div>
  );
};

export default Remaining;
