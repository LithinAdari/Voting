import React, { useEffect, useState } from 'react'
import AdminDashboard from './Admin/AdminDashboard';
import StudentDashboard from './Student/StudentDashboard';

const Dashboard = () => {
  const [userRole,setUserRole] = useState("");
  const [userEmail,setUserEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    setUserEmail(email);
    fetchRole(email);
  },[])

  const fetchRole = async(email) => {

    try{
      const res = await fetch(`http://localhost:4000/api/v1/getUserByEmail/${email}`);

      const data = await res.json();
      console.log(data);
      if(data.success){
        setUserRole(data.data.role);
      }
      else {
        console.log("User not found or role missing.");
      }
    }
    catch(e){
      console.log(e);
    }
  }
  return (
    <div>
      <div>Welcome to CSE-A voting system</div>
      {userRole === "ADMIN" ? <AdminDashboard email={userEmail}/> : <StudentDashboard email={userEmail}/>};
    </div>
  )
}

export default Dashboard;