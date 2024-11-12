import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import EditBudget from "./EditBudget ";
import ViewBudget from "./ViewBudget";

const Budget = () => {
    const [isEditing, setIsEditing] = useState(false)
    const { budget,editExpense } = useContext(GlobalContext);
    const openEditBudget= ()=> {
        setIsEditing(true);
    }
    const handleSaveClick = (value) => {
      editExpense(value)
        setIsEditing(false);
    }
    
  return (
    <div className='alert alert-secondary p-3 d-flex align-items-center justify-content-between'>
			{isEditing ? (
				<EditBudget budget={budget} editBudget={handleSaveClick}/>
			) : (
				<ViewBudget budget={budget} handleEditClick={openEditBudget}/>
			)}
		</div>
  );
};

export default Budget;
