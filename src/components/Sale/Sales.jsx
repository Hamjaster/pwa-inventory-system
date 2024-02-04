"use client"
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { IoIosAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { BiArrowFromLeft } from 'react-icons/bi';
import { MdDelete, MdEditSquare } from "react-icons/md";
import Link from 'next/link'
import { formatLargeNumber, parseDate } from '@/utils';
import useSales from './useSales';
import { GoArrowDown } from "react-icons/go";
import { GoArrowUp } from "react-icons/go";
import { VscLoading } from 'react-icons/vsc';
import { fetchSales } from '@/redux/slices/salesSlice';
import { setFunctionHasRun } from '@/redux/slices/salesSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive'

export default function Sales() {

    const [searchQuery, setSearchQuery] = useState("")
    const dispatch = useDispatch()
    const { sales, loading, hasRun } = useSelector(state => state.sales)
    const isSmall = useMediaQuery({ query: '(max-width: 640px)' })

    const tableCustomStyles = {
        headCells: {
            style: {
                fontSize: '20px',
                // paddingLeft: '0 8px',
                justifyContent: 'center',
                background: '#00b6ee60',
                color: '#007FCF',
                // color: 'white'
            },
        },
        cells: {
            style: {
                fontSize: '17px',
                padding: '0px',
                justifyContent: 'center',
                margin: '0px',
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

    if (!hasRun) {
        dispatch(fetchSales())
        dispatch(setFunctionHasRun());
    }

    const columns = [

        {
            name: 'Product',
            selector: row => row.product,
            cell: row => <span>{row.product.title}</span>,

        },
        {
            name: 'Customer',
            selector: row => row.customer,
            cell: row => <span>{row.customer}</span>,
        },
        {
            name: 'Date',
            selector: row => row.salesDate,
            cell: row => <span>{parseDate(row.salesDate)}</span>,
        },
        {
            name: 'Qty',
            selector: row => row.qty,
            cell: row => <span>{row.qty}</span>,

        },
        {
            name: 'Total(Rs)',
            cell: row => <span>{formatLargeNumber(row.totalPrice)}</span>,
            selector: row => row.totalPrice,

        },
        {
            name: 'Profit/Loss',
            selector: row => row.priceDifference,
            cell: row => <span>
                {row.priceDifference > 1
                    ?
                    <div className='flex flex-row justify-between items-center bg-green-500 text-white px-3 rounded-lg font-bold py-2 '>
                        <div>
                            {formatLargeNumber(Math.round(row.priceDifference))}
                        </div>
                        <div className='font-semibold text-xl'>
                            <GoArrowUp />
                        </div>
                    </div>
                    :
                    <div className='flex flex-row justify-between items-center bg-red-500 text-white px-3 rounded-lg font-bold py-2 '>
                        <div>
                            {formatLargeNumber(Math.round(Math.abs(row.priceDifference)))}
                        </div>
                        <div className='font-semibold text-xl'>
                            <GoArrowDown />
                        </div>
                    </div>}
            </span>,

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
            return sales
        }
        else {
            return sales
                .filter((row) => {
                    return row.product.title.toLowerCase().includes(searchQuery.toLowerCase())
                })
        }
    }



    return (

        <>
            <div className='text-4xl text-[#0062ca] font-semibold text-left uppercase mb-5'>
                Your Sales
            </div>
            <div className="actions bg-[#] bg-white py-3 flex flex-col sm:flex-row items-center justify-between sm:space-x-1">

                <div className="input relative w-full sm:w-2/4">
                    <div className="icons  text-[#00BE95] absolute top-1/2 right-3 -translate-y-1/2">
                        <FaSearch />
                    </div>
                    <input placeholder='Search Sales' type="text" className='w-full outline-none placeholder:font-light pr-9 px-4 py-2 border-2 border-[#00BE95] text-lg ' value={searchQuery} onChange={(e) => {
                        setSearchQuery(e.target.value)
                    }} />
                </div>
                <div className="actions w-full sm:w-1/4">
                    <Link href={'/sales/add'} className="create flex justify-center flex-row items-center space-x-2 bg-[#00BE95] hover:bg-[#01876a] transition-all text-white text-center px-0 py-3 sm:px-4 text-sm sm:text-lg sm:py-2 cursor-pointer">
                        <div className="icon text-2xl text-white">
                            <IoIosAddCircle />
                        </div>
                        <div className="text">
                            Add a new sale
                        </div>
                    </Link>
                </div>

            </div>

            <div className="table mt-6 w-full">
                {
                    loading
                        ?
                        <div className='flex   items-center h-full w-full justify-center '>
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
