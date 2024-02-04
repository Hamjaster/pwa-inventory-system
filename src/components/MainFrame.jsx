"use client"
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";


export default function MainFrame({ children }) {

    const [showSidebar, setShowSidebar] = useState(false)

    return (

        <div className=' relative flex flex-row items-center w-full ' >

            {/* Sidebar */}
            <div className={`sidebar transition-all duration-500 z-50 ${showSidebar ? 'left-0' : '-left-80'} fixed h-full w-64 top-0 sm:left-0`}>
                <Sidebar setShowSidebar={setShowSidebar} />
            </div>


            <div className=' ml-0 sm:ml-64 w-full  flex flex-col space-y-3 '>

                <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

                {/* <Suspense fallback={
        <div className='flex   items-center  h-screen w-full justify-center '>
            <div className="logo h-min w-min animate-spin text-5xl text-blue-600">
                <VscLoading />
            </div>
        </div>
    }>
        <Routes>

            <Route path='/' element={<Dashboard />} />
            <Route path='/purchases' element={<Purchases />} />
            <Route path='/sales' element={<Sales />} />
            <Route path='/purchases/add' element={<AddPurchase />} />
            <Route path='/sales/add' element={<AddSale />} />
            <Route path='/products/add' element={<AddProduct />} />

            <Route path='/products' element={<Products />} />

            <Route path='/customers' element={<Customers />} />
            <Route path='/customers/add' element={<AddCustomer />} />
            <Route path='/suppliers' element={<Suppliers />} />
            <Route path='/suppliers/add' element={<AddSupplier />} />

        </Routes>

    </Suspense> */}
                <div className="px-10 py-3">
                    {children}
                </div>

            </div>

        </div>

    );
}
