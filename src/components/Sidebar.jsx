import React from 'react'
import { AiFillCustomerService, AiOutlineClose } from 'react-icons/ai'
import { MdOutlineDashboard, MdProductionQuantityLimits } from "react-icons/md";
import { TbFileInvoice, TbUsers } from 'react-icons/tb'
import { BiSolidPurchaseTag, BiUserX } from 'react-icons/bi'
import { FaRegUser } from 'react-icons/fa'
import Link from 'next/link'

export default function Sidebar({ setShowSidebar }) {
    return (
        <div className='bg-[#0063CA] text-white py-12 w-full h-full flex flex-col justify-between items-center relative'>

            {/* Close Icon on Sidebar (only on small screens) */}
            <div onClick={() => setShowSidebar(false)} className="close-icon text-xl sm:hidden absolute top-4 right-4">
                <AiOutlineClose />
            </div>

            <div className="top">
                <div className=" uppercase font-semibold text-blue-200 text-3xl">Sky Solar</div>

                <div className="items [&>*]:cursor-pointer font-light my-14 flex flex-col space-y-8">

                    <div onClick={() => setShowSidebar(false)} className="flex flex-row space-x-5 items-center ">

                        <div className="text-3xl">
                            <MdOutlineDashboard />
                        </div>
                        <Link href={'/'} className='text-xl'>Dashboard</Link>
                    </div>
                    <div onClick={() => setShowSidebar(false)} className="flex flex-row space-x-5 items-center ">
                        <div className="text-3xl">
                            <BiSolidPurchaseTag />
                        </div>
                        <Link href={'/purchases'} className='text-xl'>Purchases</Link>
                    </div>
                    <div onClick={() => setShowSidebar(false)} className="flex flex-row space-x-5 items-center ">
                        <div className="text-3xl">
                            <TbFileInvoice />
                        </div>
                        <Link href={'/sales'} className='text-xl'>Sales</Link>
                    </div>
                    <div onClick={() => setShowSidebar(false)} className="flex flex-row space-x-5 items-center ">
                        <div className="text-3xl">
                            <TbUsers />
                        </div>
                        <Link href={'/suppliers'} className='text-xl'>Suppliers</Link>
                    </div>
                    <div onClick={() => setShowSidebar(false)} className="flex flex-row space-x-5 items-center ">
                        <div className="text-3xl">
                            <MdProductionQuantityLimits />
                        </div>
                        <Link href={'/products'} className='text-xl'>Products</Link>
                    </div>



                </div>
            </div>

        </div>
    )
}
