import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import useAuthentication from "../../Components/Hook/useAuthenticate";
import { zerop0 } from '../../apiConfig'
import LoadingDots from "../../Components/Skeletons/LoadingDots";
import { Nav } from "../../Components/Navbars/Navbars";

function SignIn() {
  const [signInSpinner, setsignInSpinner] = useState(false)
  const navigate = useNavigate();
  const { authenticated, loading, userObj } = useAuthentication({ successNavigateTo: '/profile' })
  const [state, setState] = React.useState({
    userId: "",
    password: ""
  });

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async evt => {
    evt.preventDefault();
    const { userId, password } = state;

    if (userId.length === 0 || password.length === 0) {
      alert("Fill in all the blanks");
      return;
    }
    setsignInSpinner(true)
    await fetch(`${zerop0}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    })
      .then(async res => {
        if (res.ok) {
          return res.json();
        } else {
          const data = await res.json()
          alert(data.message)
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        navigate('/resource', { replace: true });

      })
      .catch(err => console.error(`Error occurred: ${err.message}`));
    setsignInSpinner(false)
  };


  return (
    <>
      <div className="relative z-20">
        <Nav />
      </div>
      {!loading && !authenticated && (
        <>
          <div className='rowTwo flex justify-center w-full mt-8'>
            <div className="secondary bg-skin-primary200 hidden items-center px-10 -mr-5 rounded-l-3xl flex-col md:flex">
              <div className='text-sm mt-20'><p className='text-cyan-100'>Welcome Back to DriveDoc</p><p className='text-cyan-100'> – Login to check your secure driving docs</p></div>
              <img src="./img/Logo.svg" alt="logo" className='w-64 h-auto mt-12 ml-0 shadow-md shadow-green-800' />
            </div>
            <div className='priamry shadow-2xl bg-skin-primary100 w-1/2 md:w-1/4 min-w-64 py-16 md:py-32 rounded-3xl flex flex-col justify-center items-center'>
              <div className='mb-4 md:my-4 text-2xl text-cyan-100 md:-ml-32'>Login</div>
              <div className=' my-4 text-sm text-cyan-100 max-w-52 ml-10 md:ml-5 overflow-hidden'>Login to your account with username and password</div>
              <div className='mx-4 flex flex-col'>
                <form onSubmit={handleOnSubmit} className='flex flex-col'>
                  <input type="text" name="userId" value={state.userId} onChange={handleChange} placeholder="UserId" className='rounded-2xl my-2 px-2 py-1' />
                  <input type="password" name="password" value={state.password} onChange={handleChange} placeholder="Password" className='rounded-2xl px-2  py-1' />
                  {signInSpinner ? (<div className="bg-skin-primary300 mt-4 rounded-2xl"><div className="scale-[40%]"><LoadingDots /></div></div>) : (<button className='bg-skin-primary300 py-1 mt-4 rounded-2xl'><>Let's go</></button>)}
                  <a href="/signup" className=' text-sm hover:cursor-pointer text-cyan-100 mt-10'>Got no account? Register here.</a>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

    </>
  );
}

export default SignIn;
