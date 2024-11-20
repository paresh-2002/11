import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    const { userName, email, password, role } = userData;
    e.preventDefault();
    fetch("http://localhost:5000/signup", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userName,
        email,
        password,
        role,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          alert("Registration Successful");
          navigate("/login");
        } else {
          alert("Something went wrong");
        }
      });
  };

  function updateUser(value) {
    return setUserData((prev) => {
      return { ...prev, ...value };
    });
  }
  return (
    <div className="w-full max-w-xl rounded-lg shadow-sm h-3/4 m-auto p-10 mt-4">
      <img src="student.jpeg" alt="student Logo" className="h-24 text-center w-24 m-auto" />
      <h2 className="text-center text-4xl text-slate-500">Register</h2>
      <form className="m-auto p-2 w-2/3 mt-5" onSubmit={onSubmit}>
        <label htmlFor="name" className="text-slate-500 text-lg">
          UserName
        </label>
        <input
          type="text"
          placeholder="UserName Name..."
          className="w-full px-3 py-3 shadow-lg rounded-lg mb-3 focus:outline-none"
          value={userData.userName}
          required
          onChange={(e) => updateUser({ userName: e.target.value })}
        />

        <label htmlFor="name" className="text-slate-500 text-lg">
          Email
        </label>
        <input
          type="email"
          placeholder="Email..."
          className="w-full px-3 py-3 shadow-lg rounded-lg mb-3 focus:outline-none"
          value={userData.email}
          required
          onChange={(e) => updateUser({ email: e.target.value })}
        />

        <label htmlFor="name" className="text-slate-500 text-lg">
          Password
        </label>
        <input
          type="password"
          placeholder="Password..."
          className="w-full px-3 py-3 shadow-lg rounded-lg mb-3 focus:outline-none"
          value={userData.password}
          required
          onChange={(e) => updateUser({ password: e.target.value })}
        />
        <button className="w-1/2 py-2 mt-4 rounded-lg bg-slate-500 text-center hover:bg-transparent hover:shadow-lg">
          Login
        </button>
        <br/>
        <NavLink to = '/login' className="w-full text-sm text-blue-300 cursor-pointer hover:underline self-end text-center"><span >Login here...</span></NavLink>
      </form>
      </div>
  );
};

export default SignUp;
