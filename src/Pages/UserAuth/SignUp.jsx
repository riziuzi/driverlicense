import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zerop0, onep0 } from '../../apiConfig'
import LoadingDots from '../../Components/Skeletons/LoadingDots'
import { Nav } from "../../Components/Navbars/Navbars";

function SignUp() {
  const [signUpSpinner, setsignUpSpinner] = useState(false)
  const navigate = useNavigate()
  const [state, setState] = React.useState({
    name: "",
    userId: "",
    password: "",
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
    const { name, userId, password } = state;
    let error = ""

    for (let key in state) {
      if (state[key] === "") {
        error = `${key} should be filled!`
        break
      }
      else if ((key === "password") && (state[key].length < 8)) {
        console.log((key))
        error = "Password length should be >= 8"
      }
      else if ((key === "password2") && (state[key].length < 8)) {
        console.log((key))
        error = "Password length should be >= 8"
      }
    }
    if (error.length === 0) {
      await (async () => { setsignUpSpinner(true) })()                    // no use of wrapping setStateReact, state updates are asynchronously processed, but the state updater function itself isn't async so you can't wait for the update to happen
      await fetch(`${zerop0}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "userId": state.userId,
          "password": state.password
        })
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
        .then((res) => {
          console.log(res)
          fetch(`${onep0}/create-user`, {               // 3001
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: state.userId, name: state.name })
          }).then(async res => {
            if (res.ok) {
              return res.json();
            } else {
              const data = await res.json()
              alert(data.message)
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
          }).then((data) => {
            console.log(data)
            fetch(`${zerop0}/login`, {
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
              .catch(err => console.error(`Error occurred in fetching: ${err}`));
          })
            .catch(err => `Error occured in fetching: ${err}`)

        })
        .catch(err => `Error occured in fetching: ${err}`)
        .finally(() => { setsignUpSpinner(false) })
    }
    else {
      alert(`Error : ${error}`)
    }
    setsignUpSpinner(false)
  };

  return (
    <>
      <div className="relative z-20">
        <Nav />
      </div>
      <div className=' rowTwo flex justify-center w-full mt-8'>
        <div className='priamry shadow-2xl bg-skin-primary100 w-1/2 md:w-1/3 min-w-64 -mr-5 rounded-3xl flex flex-col justify-center items-center z-10'>
          <div className=' my-4 text-2xl text-cyan-100 md:-ml-36'>Register</div>
          <div className=' my-4 hidden md:flex text-sm text-cyan-100 max-w-56 ml-10 md:-ml-2 overflow-hidden z-0'>Register your account with name, unique userId and strong password</div>
          <div className=' my-4 md:hidden text-sm text-cyan-100 max-w-56 z-0 w-full text-center'>Register your account</div>
          <div className='flex flex-col'>
            <form onSubmit={handleOnSubmit} className='flex flex-col max-w-96 items-center'>
              <div className='flex-wrap'>
                <input type='text' name='name' value={state.name} onChange={handleChange} placeholder="Your Name" className='focus:outline-none w-60 bg-slate-100 text-black focus:bg-white rounded-2xl mt-2 px-2 py-1' />
              </div>
              <input type="text" name="userId" value={state.userId} onChange={handleChange} placeholder="Unique UserId" className='rounded-2xl bg-slate-100 focus:outline-none text-black focus:bg-slate-50 w-60 mt-2 px-2 py-1' />
              <input type="password" name="password" value={state.password} onChange={handleChange} placeholder="Create Password" className='rounded-2xl bg-slate-100 text-black focus:outline-none focus:bg-slate-50 w-60 mt-2 px-2  py-1' />
              {signUpSpinner ? (<div className="bg-skin-primary300 mt-4 w-60 rounded-2xl"><div className="scale-[40%]"><LoadingDots /></div></div>) : (<button className='bg-skin-primary300 py-1 mt-4 w-60 rounded-2xl'><>Let's go</></button>)}
              <a href="/signin" className='text-sm hover:cursor-pointer text-cyan-100 mt-10 mb-24'>Got no account? Register here.</a>
            </form>
          </div>
        </div>
        <div className="secondary bg-skin-primary200 hidden items-center px-10  rounded-r-3xl flex-col md:flex">
        <div className='text-sm mt-20'><p className='text-cyan-100'>Start you journey with DriveDoc</p><p className='text-cyan-100'> – Register to keep your driving docs secure</p></div>
        <img src="./img/Logo.svg" alt="logo" className='w-64 h-auto mt-12 ml-0 shadow-md shadow-green-800' />
        </div>
      </div>
    </>

  );
}

export default SignUp;
