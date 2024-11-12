import React, { useState } from "react";
const EditBudget = ({ budget,editBudget }) => {
  const [value, setValue] = useState(budget);
  
  return (
    <>
      <input
        required="required"
        type="number"
        id="name"
        className="form-control mr-3"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="btn btn-primary" type="button" onClick={() => editBudget(value)}>
        Save
      </button>
    </>
  );
};

export default EditBudget;
