import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData,setFormData] = useState({email : "",password : ""});

  const navigate = useNavigate();

  function HandleChange(e){
    const {name,value} = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name] : value,
    }));
  }

  const handleLogin = async(e) => {
    e.preventDefault();

    try{
      const res = await fetch("http://localhost:4000/api/v1/login",{
        method : "POST",
        headers:{
          "Content-type" : "application/json",
        },
        body : JSON.stringify(formData),
      })
      console.log(res);

      const data = await res.json();
      if(!data){
        console.log("error");
      }
      else{
        console.log(data);
      }

      if(data.success){
        alert("Login Successful");
        localStorage.setItem("email",formData.email);
        navigate("/dashboard");
      }
      else{
        alert("Login Failed.")
      }
    }
    catch(e){
      console.log(e);
    }
  }

  return (
    <div className=" w-screen h-screen flex flex-col justify-center items-center gap-5">
      <div>Login</div>
        <form className='flex flex-col gap-10' onSubmit={handleLogin}>
            <div className="flex flex-col">
                <label>Email :</label>
                <input
                name = "email"
                type = "email"
                placeholder='Enter the email'
                required
                value={formData.email}
                onChange={HandleChange}
                className=" border-2 border-black rounded-md"
                >
                </input>
            </div>
            <div className='flex flex-col'>
                <label>Password :</label>
                <input
                name = "password"
                type = "password"
                placeholder='Enter the password'
                required
                value={formData.password}
                onChange={HandleChange}
                className=" border-2 border-black rounded-md"
                >
                </input>
            </div>
            <button type='submit' className="border-2 rounded-xl border-black hover:bg-gray-800 hover:text-white">Submit</button>
        </form>
    </div>
  )
}

export default Login