import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'


function Signup() {
    const [formData,setFormData] = useState({email : " ",password : "",role: ""});

    function HandleChange(e){
        const {name,value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name] : value,
        }))
    }

    const navigate = useNavigate();
    console.log("hello")

    const handleSignup = async(e) => {
        e.preventDefault();

        try{
            const res = await fetch("http://localhost:4000/api/v1/signup",
                {
                    method : "POST",
                    headers : {
                        "Content-type" : "application/json"
                    },
                    body : JSON.stringify(formData),
                }
            );
            const data = await res.json();
            if(data.success){
                alert("Sign up Successful");
                navigate("/login");
            }
            else{
                alert("Sign Up Failed");
            }
        }
        catch(e){
            console.log(e);
        }
    }


  return (
    <div className='w-screen h-screen flex flex-col gap-5 justify-center items-center '>
        <div>Sign Up</div>
        <form className='flex flex-col gap-10' onSubmit={handleSignup}>
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
            <div className='flex flex-col'>
                <label>Select Role :</label>
                <select value={formData.role} name='role' onChange={HandleChange} className=" border-2 border-black rounded-md">
                    <option value="">--SELECT OPTION--</option>
                    <option value={"STUDENT"}>
                        STUDENT
                    </option>
                    <option value={"ADMIN"}>
                        ADMIN
                    </option>
                </select>
            </div>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Signup