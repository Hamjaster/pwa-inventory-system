"use client"
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { IoIosAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { BiArrowFromLeft } from 'react-icons/bi';
import { VscLoading } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchProducts, setProductsHasRun } from '@/redux/slices/productsSlice';
import { useMediaQuery } from 'react-responsive'

export default function Products() {

    const [searchQuery, setSearchQuery] = useState("")
    const { products, loading, hasRun } = useSelector(state => state.products)
    const dispatch = useDispatch()
    const isSmall = useMediaQuery({ query: '(max-width: 640px)' })

    useEffect(() => {
        if (!hasRun) {
            dispatch(fetchProducts())
            dispatch(setProductsHasRun());
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


    const handleDelete = async (id) => {
        const res = await deleteProduct(id)
        console.log(res)

    }

    const columns = [

        {
            name: 'Title',
            selector: row => row.title,
            cell: row => <span>{row.title}</span>,

        },
        {
            name: 'Price (Rs)',
            cell: row => <span>{Math.round(row.price)}</span>,
            selector: row => row.price,
        },
        {
            name: 'Stock',
            cell: row => <span>{row.stock}</span>,
            selector: row => row.stock,
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
            return products
        }
        else {
            return products
                .filter((row) => {
                    return row.title.toLowerCase().includes(searchQuery.toLowerCase())
                })
        }
    }

    return (

        <>

            <div className="actions bg-[#] bg-white py-3 flex flex-col items-center justify-between w-full sm:space-x-1">

                <div className="input relative w-full sm:w-2/4">
                    <div className="icons  text-[#00BE95] absolute top-1/2 right-3 -translate-y-1/2">
                        <FaSearch />
                    </div>
                    <input placeholder='Search Prodcuts' type="text" className='w-full outline-none placeholder:font-light pr-9 px-4 py-2 border-2 border-[#00BE95] text-lg ' value={searchQuery} onChange={(e) => {
                        setSearchQuery(e.target.value)
                    }} />
                </div>
                <div className="actions w-full sm:w-1/4">
                    {/* <div to={'/products/add'} className="create flex justify-center flex-row items-center space-x-2 bg-[#00BE95] hover:bg-[#01876a] transition-all text-white text-center px-2 py-3 sm:px-4 text-sm sm:text-lg sm:py-2 cursor-pointer">
                        <div className="icon text-2xl text-white">
                            <IoIosAddCircle />
                        </div>
                        <div className="text">
                            Add Prodcut
                        </div>
                    </div> */}
                </div>

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
