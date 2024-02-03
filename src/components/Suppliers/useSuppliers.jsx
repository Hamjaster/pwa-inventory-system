"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
export default function useSupplier(count) {

    const [suppliers, setSuppliers] = useState([])
    const [loading, setLoading] = useState(false)


    const getSuppliers = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`/api/supplier`)
            console.log(data)
            if (data.success) {
                setLoading(false)
                setSuppliers(data.message)
            } else {
                setLoading(false)
                toast.error(data.message)
                console.log(data.message)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const deleteSupplier = async (id) => {
        setLoading(true)
        try {
            const { data } = await axios.delete(`/api/supplier/${id}`)
            return data
        } catch (error) {
            return error
            // console.log(error)
        }
    }

    useEffect(() => {
        getSuppliers()
    }, [count])



    return { suppliers, deleteSupplier, loading }
}

