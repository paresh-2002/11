import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeForm = () => {
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
  });
  const params = useParams();
  const navigate = useNavigate();
  const [isNew, setIsNew] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:8080/record/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(record);
    }
    fetchData();
    return;
  }, [params.id, navigate]);
  const onSubmit = async (e) => {
    e.preventDefault();
    const person = {...form}
    try {
      const response = await fetch(`http://localhost:8080/record/${params.id ? "/" + params.id : ""}`,{
        method:`${params.id ? "PATCH" : "POST"}`,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(person)
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log('client Side add', error)
    }finally{
      setForm({name:'', position:'', level:''})
      navigate('/')
    }

  };
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  return (
    <div className="w-1/3 m-auto rounded-md mt-24">
      <h2 className="text-3xl text-slate-400 text-center">Employee Details</h2>
      <form onSubmit={onSubmit} className="m-3 p-2">
        <label htmlFor="" className="text-slate-500">
          Employee Name
        </label>
        <input
          type="text"
          placeholder="Enter Name..."
          className="w-full py-2 px-4 drop-shadow-2xl my-3 rounded-xl focus:outline-none "
          value={form.name}
          onChange={(e) => updateForm({ name: e.target.value })}
        />
        <label htmlFor="" className="text-slate-500">
          Employee Position
        </label>
        <input
          type="text"
          placeholder="Enter Name..."
          className="w-full py-2 px-4 drop-shadow-2xl my-3 rounded-xl focus:outline-none"
          value={form.position}
          onChange={(e) => updateForm({ position: e.target.value })}
        />
        <label htmlFor="" className="text-slate-500">
          Intern
        </label>
        <input
          type="radio"
          className="mx-2  drop-shadow-2xl focus:outline-none"
          value="Intern"
          checked={form.level === "Intern"}
          onChange={(e) => updateForm({ level: e.target.value })}
        />
        <label htmlFor="" className="text-slate-500">
          Junior
        </label>
        <input
          type="radio"
          className="mx-2 drop-shadow-2xl focus:outline-none"
          value='Junior'
          checked={form.level === "Junior"}
          onChange={(e) => updateForm({ level: e.target.value })}
        />
        <label htmlFor="" className="text-slate-500">
          Senior
        </label>
        <input
          type="radio"
          className="mx-2 drop-shadow-2xl focus:outline-none"
          value='Senior'
          checked={form.level === "Senior"}
          onChange={(e) => updateForm({ level: e.target.value })}
        />
        <br />
        <button className="w-1/2 bg-slate-500 py-2 px-5 text-white hover:bg-white drop-shadow-2xl hover:text-slate-500 mt-4 rounded-xl">
          Add
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
