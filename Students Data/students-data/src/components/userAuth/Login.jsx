import React, {  useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
const Login = () => {
    const [userData,setUserData] = useState({
        email: '',
        password: '',
    })
    
    const navigate = useNavigate()
    
    const onSubmit = async (e) => {
      const {email, password} = userData
        e.preventDefault()
        fetch("http://localhost:5000/login", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userRegister");
            if (data.status === "ok") {
              console.log(data.userType);
              alert("login successful");
              navigate('/')
            }
          });
    }
    function loginUser(value) {
        return setUserData((prev) => {
          return { ...prev, ...value };
        });
      }
  return (
    <div className="w-full max-w-xl rounded-lg shadow-sm h-3/4 m-auto p-10 mt-4">
      <img src="student.jpeg" alt="student Logo" className="h-24 text-center w-24 m-auto" />
      <h2 className="text-center text-4xl text-slate-500">Login</h2>
      <form className="m-auto p-2 w-2/3 mt-5" onSubmit={onSubmit}>
        <label htmlFor="name" className="text-slate-500 text-lg">
          Email
        </label>
        <input
          type="email"
          placeholder="Email..."
          className="w-full px-3 py-3 shadow-lg rounded-lg mb-3 focus:outline-none"
          value={userData.email}
          required
          onChange={(e) => loginUser({ email: e.target.value })}
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
          onChange={(e) => loginUser({ password: e.target.value })}
        />
        <button className="w-1/2 py-2 mt-4 rounded-lg bg-slate-500 text-center hover:bg-transparent hover:shadow-lg">
          Login
        </button>
        <br/>
        <NavLink to = '/signup' className="w-full text-sm text-blue-300 cursor-pointer hover:underline self-end text-center "><span >SignUp here...</span></NavLink>
      </form>
    </div>
  )
}

export default Login