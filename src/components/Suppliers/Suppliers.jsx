"use client"
import React, { useCallback, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit, FaSearch } from "react-icons/fa";
import { BiArrowFromLeft } from 'react-icons/bi';
import { MdDelete, MdEditSquare } from "react-icons/md";
import { VscLoading } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchSuppliers, setFunctionHasRun } from '@/redux/slices/suppliersSlice';
import { useMediaQuery } from 'react-responsive'

export default function Suppliers() {
    const [searchQuery, setSearchQuery] = useState("")
    const dispatch = useDispatch();
    const { suppliers, loading, hasRun } = useSelector(state => state.suppliers)
    const isSmall = useMediaQuery({ query: '(max-width: 640px)' })

    console.log(suppliers, loading)

    useEffect(() => {

        if (!hasRun) {
            dispatch(fetchSuppliers())
            dispatch(setFunctionHasRun());
        }

    }, [])


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

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Phone',
            cell: row => <span>{row.phone}</span>,
            selector: row => row.phone,
        },

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
            return suppliers
        }
        else {
            return suppliers
                .filter((row) => {
                    return row.name.toLowerCase().includes(searchQuery.toLowerCase())
                })
        }
    }


    return (

        <>

            <div className="actions bg-[#] bg-white py-3 space-x-2 flex flex-col items-center justify-between">

                <div className="input relative w-full sm:w-2/4 ">
                    <div className="icons  text-[#00BE95] absolute top-1/2 right-3 -translate-y-1/2">
                        <FaSearch />
                    </div>
                    <input placeholder='Search Suppliers' type="text" className='w-full outline-none placeholder:font-light pr-9 px-4 py-2 border-2 border-[#00BE95] text-lg ' value={searchQuery} onChange={(e) => {
                        setSearchQuery(e.target.value)
                    }} />
                </div>
                {/* <div className="actions w-2/5 sm:w-1/4">
                    <Link to={'/suppliers/add'} className="create flex justify-center flex-row items-center space-x-2 bg-[#00BE95] hover:bg-[#01876a] transition-all text-white text-center px-2 py-3 sm:px-4 text-sm sm:text-lg sm:py-2 cursor-pointer">
                        <div className="icon text-2xl text-white">
                            <IoIosAddCircle />
                        </div>
                        <div className="text">
                            Add Supplier
                        </div>
                    </Link>
                </div> */}

            </div>

            <div className="table mt-12 min-w-full">
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
