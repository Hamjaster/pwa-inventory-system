import React, { useState } from 'react'

export default function AddSupplier() {

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (



        <div class="font-[sans-serif]">

            <div class="mb-6 px-4">
                <div class="mx-auto py-8 px-6 relative bg-white rounded">
                    <h2 class="text-3xl text-[#333] font-bold">Create a Supplier</h2>
                    <form class="mt-8 grid sm:grid-cols-2 gap-6 text-xl">

                        <input onChange={handleInputChange} name='name' type='text' placeholder='Supplier Name'
                            class="w-full rounded py-2.5 px-4 border-2  outline-[#0096C3]" />

                        <input onChange={handleInputChange} name='phone' type='number' placeholder='Supplier Phone'
                            class="w-full rounded py-2.5 px-4 border-2  outline-[#0096C3]" />

                        <input onChange={handleInputChange} name='address' type='address' placeholder='Supplier Address'
                            class="w-full rounded py-2.5 px-4 border-2  outline-[#0096C3]" />


                        <button type='button'
                            class="text-white w-max bg-[#0096C3] hover:bg-[#006685] transition-all font-semibold rounded text-lg px-6 py-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill='#fff' class="mr-2 inline" viewBox="0 0 548.244 548.244">
                                <path fill-rule="evenodd" d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z" clip-rule="evenodd" data-original="#000000" />
                            </svg>
                            Create
                        </button>
                    </form>
                </div>
            </div>

        </div>



    )
}
