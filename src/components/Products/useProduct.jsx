"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
export default function useProduct(count) {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const addProduct = async (title, unitPrice, stock) => {
        setLoading(true)
        try {
            const { data } = await axios.post(`/api/product`, {
                title,
                price: unitPrice,
                stock
            })
            if (data.success) {
                setLoading(false)
                console.log(data)
            } else {
                setLoading(false)
                console.log(data)
            }
        } catch (error) {
            setLoading(false)
            return error
        }

    }

    const getProducts = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`/api/product`)
            console.log(data)
            if (data.success) {
                setLoading(false)
                setProducts(data.message)
                console.log(data.message)

            } else {
                toast.error(data.message)
                setLoading(false)

            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const deleteProduct = async (id) => {
        setLoading(true)
        try {
            const { data } = await axios.delete(`/api/product/${id}`)
            return data
        } catch (error) {
            return error
            // console.log(error)
        }
    }

    useEffect(() => {
        getProducts()
    }, [count])

    useEffect(() => {
        console.log(products)
    }, [products])



    return { addProduct, products, loading, getProducts, deleteProduct }
}

