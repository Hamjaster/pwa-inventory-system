"use client"
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { IoIosAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { BiArrowFromLeft } from 'react-icons/bi';
import Link from 'next/link'
import { formatLargeNumber, parseDate } from '@/utils';
import { VscLoading } from 'react-icons/vsc';
import { fetchPurchases, setFunctionHasRun } from '@/redux/slices/purchasesSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive'
import { setProductsHasNotRun, setProductsHasRun } from '@/redux/slices/productsSlice';

export default function Purchases() {
    const [searchQuery, setSearchQuery] = useState("")
    const { purchases, loading, hasRun } = useSelector(state => state.purchases)
    const dispatch = useDispatch()
    const isSmall = useMediaQuery({ query: '(max-width: 640px)' })

    const tableCustomStyles = {
        headCells: {
            style: {
                fontSize: '20px',
                margin: '0px 10px',
                // paddingLeft: '0 8px',
                justifyContent: 'center',

                padding: '0px',
                // color: 'white'
            },
        },
        cells: {
            style: {
                fontSize: '17px',
                padding: '0px',
                justifyContent: 'center',
                margin: '0px 10px',
            }
        },
        rows: {
            style: {
                margin: 0
            }
        },
        table: {
            style: {
                width: isSmall ? '80vw' : "100%"
            }
        }



    }

    useEffect(() => {
        if (!hasRun) {
            dispatch(fetchPurchases())
            dispatch(setFunctionHasRun());

        }
    }, [])

    const columns = [

        {
            name: 'Product',
            selector: row => row.product,
            cell: row => <span>{row.product.title}</span>,

        },
        {
            name: 'Supplier',
            selector: row => row.supplier,
            cell: row => <span>{row.supplier.name}</span>,
        },
        {
            name: 'Date',
            selector: row => row.purchaseDate,
            cell: row => <span>{parseDate(row.purchaseDate)}</span>,
        },
        {
            name: 'Qty',
            selector: row => row.qty,
            cell: row => <span>{row.qty}</span>,
            // width: '10%'
        },
        {
            name: 'Total(Rs)',
            selector: row => row.totalPrice,
            cell: row => <span>{formatLargeNumber(Math.round(row.totalPrice))}</span>,

        },
        // {   
        //     name: 'Action',
        //     cell: (r) => {
        //         return (
        //             <span className='flex flex-row text-3xl space-x-2 items-center'>
        //                 <div className="edit text-blue-500 hover:text-blue-700 transition-all cursor-pointer">
        //                     <MdEditSquare />
        //                 </div>
        //                 <div className="del text-red-500 hover:text-red-700 transition-all cursor-pointer">
        //                     <MdDelete />
        //                 </div>
        //             </span>
        //         )
        //     }
        // }
    ];

    const paginationComponentOptions = {
        rowsPerPageText: false,
        rowsPerPage: false,
        rangeSeparatorText: false,
        selectAllRowsItem: false,
        selectAllRowsItemText: 'Todos',
        firstText: <BiArrowFromLeft />,
        previousText: "hy",
        nextText: "Nextjs",

    };

    const dataAfterFiltering = () => {
        if (searchQuery === '') {
            return purchases
        }
        else {
            return purchases
                .filter((row) => {
                    return row.product.title.toLowerCase().includes(searchQuery.toLowerCase())
                })
        }
    }

    return (

        <>
            <div className='text-xl sm:text-4xl text-[#0062ca] font-semibold text-left uppercase mb-5'>
                Your Purchases
            </div>
            <div className="actions bg-[#] bg-white py-3 flex flex-col sm:flex-row items-center justify-between sm:space-x-1">

                <div className="input relative w-full sm:w-2/4">
                    <div className="icons  text-[#00BE95] absolute top-1/2 right-3 -translate-y-1/2">
                        <FaSearch />
                    </div>
                    <input placeholder='Search Purchases' type="text" className='w-full outline-none placeholder:font-light pr-9 px-4 py-2 border-2 border-[#00BE95] text-lg ' value={searchQuery} onChange={(e) => {
                        setSearchQuery(e.target.value)
                    }} />
                </div>

                <div className="actions w-full sm:w-1/4">
                    <Link href={'/purchases/add'} className="create flex justify-center flex-row items-center space-x-2 bg-[#00BE95] hover:bg-[#01876a] transition-all text-white text-center px-0 py-3 sm:px-4 text-sm sm:text-lg sm:py-2 cursor-pointer">
                        <div className="icon text-2xl text-white">
                            <IoIosAddCircle />
                        </div>
                        <div className="text">
                            Add a new purchase
                        </div>
                    </Link>
                </div>


            </div>

            <div className="table w-full">
                {loading ?
                    <div className='flex   items-center  w-full justify-center '>
                        <div className="logo h-min w-min animate-spin text-5xl text-blue-600">
                            <VscLoading />
                        </div>
                    </div>
                    :
                    <DataTable
                        columns={columns}
                        data={
                            dataAfterFiltering()
                        }
                        customStyles={tableCustomStyles}
                        pagination={!searchQuery}
                        paginationComponentOptions={paginationComponentOptions}

                    />

                }
            </div>
        </>


    )
}
