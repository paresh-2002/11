import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const SpentSoFar = () => {
    const {expenseLists} = useContext(GlobalContext)
    const totalExpenses = expenseLists.reduce((acc, item) => (acc += item.cost), 0).toFixed(2)
  return (
    <div className="alert alert-primary">
      <span>Spent so far : £{totalExpenses}</span>
    </div>
  );
};

export default SpentSoFar;
