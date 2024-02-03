import React from 'react'
import { FiMenu } from 'react-icons/fi'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'
import { useContext } from 'react'

export default function Navbar({ showSidebar, setShowSidebar }) {


    return (
        <nav className="flex sm:hidden  flex-row justify-between mb-3">
            <strong className='text-xl sm:text-2xl '>Inventory Management System</strong>

            <div className="info hidden sm:flex space-x-10">
                {/* <img src={notify} alt="" srcset="" /> */}
            </div>

            {/* Hamburger only shows on small screen */}
            <div onClick={() => {
                setShowSidebar(!showSidebar)
            }} className="icon sm:hidden text-2xl self-center cursor-pointer">
                <FiMenu />
            </div>

        </nav>
    )
}
