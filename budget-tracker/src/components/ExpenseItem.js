import React, { useContext } from "react";
import { TiDelete } from "react-icons/ti";
import { GlobalContext } from "../context/GlobalState";

const ExpenseItem = ({ expenseList }) => {
  const { deleteExpense } = useContext(GlobalContext);
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {expenseList.name}
      <div>
        <span className="badge text-bg-primary badge-pill mr-3">
          £{expenseList.cost}
        </span>
        <TiDelete size="1.5em" onClick={() => deleteExpense(expenseList.id)} />
      </div>
    </li>
  );
};

export default ExpenseItem;
