"use client"
import React, { useEffect, useRef, useState } from 'react'
import { MdArrowDropDown } from 'react-icons/md'
import useProduct from '../Products/useProduct'
import useSupplier from '../Suppliers/useSuppliers'
import axios from 'axios'
import { CgSpinner } from "react-icons/cg";
import { useRouter } from 'next/navigation'

import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { fetchProducts } from '@/redux/slices/productsSlice'
import { useDispatch } from 'react-redux'
import { fetchSuppliers, setFunctionHasRun } from '@/redux/slices/suppliersSlice'

export default function AddPurchase() {

    const { products } = useSelector(state => state.products)
    const { suppliers, hasRun } = useSelector(state => state.suppliers)
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(fetchProducts())
        if (!hasRun) {
            dispatch(fetchSuppliers())
            dispatch(setFunctionHasRun());
        }

    }, [])
    const [product, setProduct] = useState("")
    const [productId, setProductId] = useState("")
    const [productDropdown, setproductDropdown] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const [isSelected, setIsSelected] = useState(false)

    const [formData, setFormData] = useState({
        product: '',
        supplier: '',
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


        if (!isSelected) {
            setProductId('')
        }
        console.log(productId, product, isSelected)
    }, [product])

    const handleSubmit = async () => {
        setLoading(true)
        let product_id;
        console.log(productId, "This is PRODUCTID")

        // Adding product if prodcutId id null
        if (productId === "") {
            try {
                var { data } = await axios.post(`${import.meta.env.VITE_API}/product`, {
                    title: product,
                    price: Number(formData.price) / Number(formData.quantity),
                    stock: 0
                })
                console.log(data)
                product_id = data.message._id
            } catch (error) {
                console.log(error)
            }
            console.log('Create a branded new product')
        } else {
            console.log('The product already exists')
            product_id = productId
        }

        // Your submit logic here using formData
        console.log(product_id)
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API}/purchase`, {
                product: product_id,
                category: formData.category,
                supplier: formData.supplier,
                qty: Number(formData.quantity),
                totalPrice: Number(formData.price)
            })
            console.log(data)
            if (data.success) {
                toast.success('Purchases Added')
                router.push('/purchases')

            }
            setLoading(false)
        } catch (error) {
            toast.success(error.response.data.message)
            setLoading(false)
            console.log(error)

        }
    };

    // Dropdonw clicking event
    const inputRef = useRef();
    const dropdownRef = useRef();


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target) &&

                dropdownRef.current &&

                !dropdownRef.current.contains(event.target)

            ) {
                // Run your event logic here
                setproductDropdown(false)
            }
        };

        // Attach the event listener when the component mounts
        document.addEventListener('click', handleClickOutside);

        // Detach the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (

        <div className="font-[sans-serif]">

            <div className="mb-6 px-4">
                <div className="mx-auto py-8 px-6 relative bg-white rounded">
                    <h2 className="text-3xl text-[#333] font-bold">Add a Purchase</h2>
                    <form className="mt-8 grid sm:grid-cols-2 gap-6 text-xl">

                        {/* Dropdown for choosing supplier */}
                        <div className="relative">
                            <select
                                name='supplier'
                                value={formData.supplier}
                                onChange={handleInputChange}
                                className="block appearance-none w-full bg-white border-2 border-[#0096C3] text-[#0096C3] py-2.5 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-[#006685] hover:border-[#006685] transition-all  "
                            >
                                <option value="" disabled selected>
                                    Choose Supplier
                                </option>
                                {suppliers.map(supplier => {
                                    return <option value={supplier._id}>{supplier.name}</option>

                                })}
                            </select>
                            <div className="absolute text-2xl cursor-pointer inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <MdArrowDropDown />
                            </div>
                        </div>

                        <div className="relative">
                            <input ref={inputRef} onClick={() => setproductDropdown(true)} value={product} autoComplete="off"
                                onChange={(e) => { setProduct(e.target.value); setIsSelected(false) }}
                                name="product" type='text' placeholder='Enter Product'
                                className="w-full rounded py-2.5 px-4 border-2  outline-[#0096C3]" />
                            <div ref={dropdownRef} className="dropdown z-50 border-[1px] bg-white w-full absolute flex flex-col">
                                {productDropdown && products
                                    .filter(pro => pro.title.toLowerCase().includes(product.toLowerCase()))
                                    .map(pro => {
                                        return (<div onClick={() => {
                                            setIsSelected(true)
                                            setProduct(pro.title);
                                            setProductId(pro._id)
                                            console.log('clicked once')
                                            setproductDropdown(false)
                                        }} className='border-b-slate-300 hover:bg-slate-200 cursor-pointer border-2 py-2'>{pro.title}</div>)
                                    })}
                            </div>
                        </div>

                        {/* <input value={formData.category}
                            onChange={handleInputChange}
                            name="category" type='text' placeholder='Enter category'
                            className="w-full rounded py-2.5 px-4 border-2  outline-[#0096C3]" /> */}

                        <input value={formData.quantity}
                            onChange={handleInputChange}
                            name="quantity" type='number' placeholder='Enter the Quantity'
                            className="w-full rounded py-2.5 px-4 border-2  outline-[#0096C3]" />

                        <input value={formData.price}
                            onChange={handleInputChange}
                            name="price" type='number' placeholder='Total Price (Rs)'
                            className="w-full rounded py-2.5 px-4 border-2 outline-[#0096C3]" />


                        <button disabled={!formData.price || !product || !formData.supplier || !formData.quantity} onClick={handleSubmit}
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
