import useAuthenticate from "../Hook/useAuthenticate"

export default function Navbar2() {
    const { authenticated, loading, userObj } = useAuthenticate()
    const renderNavItem = (text, link) => (
        <div className="navItem flex items-center px-3 py-2 justify-center hover:shadow-md hover:bg-skin-primary200 rounded-lg transition ease-in-out  duration-100 mx-1">
            <a className="navLink  text-base text-center font-bold text-skin-text200 whitespace-nowrap overflow-ellipsis justify-center flex" href={link}>
                {text==="Loading"?(<><div className="animate-pulse"> Loading </div></>):(<div className="overflow-hidden w-full">{text}</div>)}
            </a>
        </div>
    );
    return (
        <div className="header sticky top-0 px-5 bg-skin-bg200 flex justify-between items-center w-full h-14">
            <a className="logo w-36" href="/welcome">
                <img className='hover:cursor-pointer' src="./img/Logo.svg" alt="Logo" />
            </a>
            <div className="items flex justify-between">
                {renderNavItem("Home", "/welcome")}
                {renderNavItem("Tests", "/tests")}
                {renderNavItem("Resources", "/resource")}
                {loading ? renderNavItem('Loading', '/profile') :
                    authenticated ? renderNavItem(userObj.userId, '/profile') :
                        renderNavItem('Login', '/signin')
                }
                {renderNavItem("About", "/about")}
            </div>

        </div>
    );
}
