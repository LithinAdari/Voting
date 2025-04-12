import React from 'react';
import {Link} from 'react-router-dom';


const Home = () => {
  return (
    <div className="w-screen h-screen flex gap-10 justify-center items-center">
      <Link to={'/login'}>
      <button className=" border-2 border-gray-700 rounded-xl duration-200 transition-all hover:scale-1 p-5">
        Login
      </button>
      </Link>
      <Link to={'/signup'}>
        <button className=" border-2 border-gray-700 rounded-xl duration-200 transition-all hover:scale-1 p-5">
          Signup
        </button>
      </Link>

    </div>
  )
}

export default Home