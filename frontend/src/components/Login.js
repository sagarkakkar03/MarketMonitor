import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()
  const handleLogin = async () => {
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "content-type": "application/json" },
    });
    result = await result.json();
    console.log(result)
    if (result.name){
        localStorage.setItem("user", JSON.stringify(result))
        navigate('/')
    }
    else{
        alert("please enter correct details")
    }
  };
  return (
    <div className="text-center justify-center">
      <h1 className="m-6 text-2xl font-bold">Login</h1>
      <input
        className="block border-2 mx-auto my-4 text-center w-4/12 p-1"
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        className="block border-2 mx-auto my-4 text-center w-4/12 p-1"
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button
        className="mx-auto block bg-blue-200 px-3 py-2 my-4 rounded-lg border-2 solid "
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
