import { useState } from "react";
import useAuthenticate from "../Hook/useAuthenticate"

export default function NavbarSmall2() {
    const { authenticated, loading, userObj } = useAuthenticate()
    const [toggleMenu, settoggleMenu] = useState(false)
    const renderNavItem = (text, link) => (
        <div className="navItem flex items-center px-3 py-2 justify-center hover:shadow-md hover:bg-skin-primary200 rounded-lg transition ease-in-out  duration-100">
            <a className="navLink  text-base text-center font-bold text-skin-text200 whitespace-nowrap overflow-ellipsis justify-center flex" href={link}>
                {text === "Loading" ? (<><div className="animate-pulse"> Loading </div></>) : (<div className="overflow-hidden w-full">{text}</div>)}
            </a>
        </div>
    );
    return (
        <div className="header bg-skin-bg200 flex flex-col items-center w-full h-20">
            <div className="header flex justify-center h-20 py-5 shadow-md w-full z-20">
                <a className="logo " href="/welcome">
                    <img className='hover:cursor-pointer h-12' src="./img/Logo.svg" alt="Logo" />
                </a>
                <div onClick={() => { settoggleMenu(prev => !prev) }} className="toggleMenu p-1 hover:cursor-pointer hover:scale-110 hover:shadow-md rounded-full right-[5%] top-5 absolute  z-20">
                    {!toggleMenu ? (<>Nav</>) : (<>unNav</>)}
                </div>
            </div>

            <div className={`items absolute w-screen h-[calc(100vh)] bg-skin-bg200 flex flex-col pt-36 items-start z-10 ${toggleMenu ? (`left-[0%]`) : (`left-[-100%]`)}  duration-200`}>
                <div className="options flex flex-col items-start ml-10">
                    {renderNavItem("Home", "/welcome")}
                    {renderNavItem("Tests", "/tests")}
                    {renderNavItem("Resources", "/resource")}
                    {loading ? renderNavItem('Loading', '/profile') :
                        authenticated ? renderNavItem(userObj.userId, '/profile') :
                            renderNavItem('Login', '/signin')
                    }
                    {renderNavItem("About", "/about")}
                </div>
                <div className="post w-full flex justify-center mt-[30%]">
                    <a href="/createcontent" className="post hover:shadow-md hover:bg-skin-primary200 border rounded-3xl p-5 text-xl shadow-md shadow-black">Make a post</a>
                </div>
            </div>

        </div>
    );
}
