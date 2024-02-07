import React from 'react'
import Navbar2 from './Navbar2'
import NavbarSmall2 from './NavbarSmall2'


export function Nav() {
  return (
    <>
      <div className="md:hidden flex sticky top-0 shadow-sm">
        <NavbarSmall2 />
      </div>
      <div className="md:flex hidden sticky top-0 shadow-lg">
        <Navbar2 />
      </div>
    </>
  )
}
