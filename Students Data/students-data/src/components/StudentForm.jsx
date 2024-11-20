import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StudentForm = () => {
  const [sData, setSData] = useState({
    name: "",
    city: "",
    category: "",
  });
  const params = useParams();
  const [isNew, setIsNew] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5000/students/${params.id.toString()}`
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
      setSData(record);
    }
    fetchData();
    return;
  }, [params.id, isNew, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const person = { ...sData };
    try {
      const response = await fetch(
        `http://localhost:5000/students/${params.id ? "/" + params.id : ""}`,
        {
          method: `${params.id ? "PATCH" : "POST"}`,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(person),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log("client Side add", error);
    } finally {
      setSData({ name: "", city: "", category: "" });
      navigate("/");
    }
  };
  function updateSData(value) {
    return setSData((prev) => {
      return { ...prev, ...value };
    });
  }
  return (
    <div className="w-1/2 rounded-lg shadow-sm h-3/4 m-auto p-10 mt-4">
      <h2 className="text-center text-4xl text-slate-500">Student Details</h2>
      <form className="m-auto p-2 w-2/3 mt-5" onSubmit={onSubmit}>
        <label htmlFor="name" className="text-slate-500 text-lg">
          Name
        </label>
        <input
          type="text"
          placeholder="Student Name..."
          className="w-full px-3 py-3 shadow-lg rounded-lg mb-3 focus:outline-none"
          value={sData.name}
          required
          onChange={(e) => updateSData({ name: e.target.value })}
        />

        <label htmlFor="name" className="text-slate-500 text-lg">
          City
        </label>
        <input
          type="text"
          placeholder="Student City..."
          className="w-full px-3 py-3 shadow-lg rounded-lg mb-3 focus:outline-none"
          value={sData.city}
          required
          onChange={(e) => updateSData({ city: e.target.value })}
        />

        <label htmlFor="name" className="text-slate-500 text-lg">
          Category
        </label>
        <input
          type="list"
          placeholder="Student Category..."
          className="w-full px-3 py-3 shadow-lg rounded-lg mb-3 focus:outline-none"
          value={sData.category}
          required
          onChange={(e) => updateSData({ category: e.target.value })}
        />
        <button className="w-1/3 py-2 mt-4  rounded-lg bg-slate-400 text-center hover:bg-transparent hover:shadow-lg">
          SAVE
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
