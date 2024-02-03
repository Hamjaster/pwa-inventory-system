import React, { useState } from 'react';
import toast from 'react-hot-toast'
import { addProduct } from '@/redux/slices/productsSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

export default function AddProduct() {

    const router = useRouter()
    const dispatch = useDispatch()
    // State for form fields
    const [title, setTitle] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [stock, setStock] = useState('');

    const handleAddProduct = async () => {
        dispatch(addProduct(title, unitPrice, stock))
        router.push('/products')
    };

    return (
        <div className="font-[sans-serif]">
            <div className="mb-6 px-4">
                <div className="mx-auto py-8 px-6 relative bg-white rounded">
                    <h2 className="text-3xl text-[#333] font-bold">Add a Product</h2>
                    <form className="mt-8 grid sm:grid-cols-2 gap-6 text-xl">
                        <input
                            type="text"
                            placeholder="Title"
                            className="w-full rounded py-2.5 px-4 border-2  outline-[#0096C3]"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />


                        <input
                            type="number"
                            placeholder="Unit Price"
                            className="w-full rounded py-2.5 px-4 border-2  outline-[#0096C3]"
                            value={unitPrice}
                            onChange={(e) => setUnitPrice(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Add Stock (if already present)"
                            className="w-full rounded py-2.5 px-4 border-2  outline-[#0096C3]"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />

                        <button
                            type="button"
                            className="text-white w-max bg-[#0096C3] hover:bg-[#006685] transition-all font-semibold rounded text-lg px-6 py-3"
                            onClick={handleAddProduct}
                        >
                            {loading
                                ? <>Loading..</>
                                :
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="#fff" className="mr-2 inline" viewBox="0 0 548.244 548.244">
                                        <path
                                            fillRule="evenodd"
                                            d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                                            clipRule="evenodd"
                                            data-original="#000000"
                                        />
                                    </svg>
                                    Add
                                </>
                            }

                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
