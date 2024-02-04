"use client"
import React, { useEffect, useState } from 'react'
import { MdArrowDropDown } from 'react-icons/md'
import useProduct from '../Products/useProduct'
import axios from 'axios'
import { CgSpinner } from "react-icons/cg";
import { redirect } from 'next/navigation'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { fetchProducts, setProductsHasNotRun, setProductsHasRun } from '@/redux/slices/productsSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { addSale } from '@/redux/slices/salesSlice'

export default function AddSale() {
    const { products, hasRun } = useSelector(state => state.products)
    const { loading } = useSelector(state => state.sales)
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        if (!hasRun) {
            dispatch(fetchProducts())
            dispatch(setProductsHasRun());
        }
    }, [])

    const [formData, setFormData] = useState({
        product: '',
        customer: '',
        category: '',
        quantity: '',
        price: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        console.log(formData)
    }, [formData])


    const handleSubmit = async () => {
        // Your submit logic here using formData
        console.log(formData);
        dispatch(addSale({
            product: formData.product,
            category: formData.category,
            customer: formData.customer,
            qty: Number(formData.quantity),
            totalPrice: Number(formData.price)
        }))
        dispatch(setProductsHasNotRun())

        router.push("/sales")
    };

    return (

        <div className="font-[sans-serif]">

            <div className="mb-6 px-4">
                <div className="mx-auto py-8 px-6 relative bg-white rounded">
                    <h2 className="text-3xl text-[#333] font-bold">Add a Sale</h2>
                    <form className="mt-8 grid sm:grid-cols-2 gap-6 text-xl">

                        {/* Dropdown for choosing product */}
                        <div className="relative">
                            <select
                                name='product'
                                value={formData.product}
                                onChange={handleInputChange}
                                className="block appearance-none w-full bg-white border-2 border-[#0096C3] text-[#0096C3] py-2.5 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-[#006685] hover:border-[#006685] transition-all  "
                            >
                                <option value="" disabled selected>
                                    Choose Product
                                </option>
                                {products.map(product => {
                                    return (<option key={product._id} value={product._id}>{product.title}</option>)
                                })}
                            </select>
                            <div className="absolute text-2xl cursor-pointer inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <MdArrowDropDown />
                            </div>
                        </div>


                        <input value={formData.customer}
                            onChange={handleInputChange}
                            name="customer" type='text' placeholder='Enter customer name'
                            className="w-full rounded py-2.5 px-4 border-2  outline-[#0096C3]" />

                        <input value={formData.quantity}
                            onChange={handleInputChange}
                            name="quantity" type='number' placeholder='Enter the Quantity'
                            className="w-full rounded py-2.5 px-4 border-2  outline-[#0096C3]" />

                        <input value={formData.price}
                            onChange={handleInputChange}
                            name="price" type='number' placeholder='Total Price (Rs)'
                            className="w-full rounded py-2.5 px-4 border-2 outline-[#0096C3]" />



                        <button disabled={!formData.price || !formData.product || !formData.customer || !formData.quantity} onClick={handleSubmit}
                            type='button'
                            className="text-white disabled:bg-gray-500 bg-[#0096C3] hover:bg-[#006685] transition-all font-semibold rounded text-lg w-full py-4">
                            {
                                loading
                                    ? <div className='animate-spin text-center w-fit mx-auto'><CgSpinner /></div>
                                    :
                                    <div className='space-x-3'>
                                        <span>
                                            Add
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill='#fff' className="mr-2 inline" viewBox="0 0 548.244 548.244">
                                            <path fill-rule="evenodd" d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z" clip-rule="evenodd" data-original="#000000" />
                                        </svg>
                                    </div>
                            }


                        </button>
                    </form>
                </div>
            </div>

        </div>



    )
}
