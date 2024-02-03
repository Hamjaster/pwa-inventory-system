import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function useSales() {

    const [sales, setSales] = useState([])
    const [loading, setLoading] = useState(false)

    const getSales = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`/api/sale`)
            console.log(data)
            if (data.success) {
                setLoading(false)
                setSales(data.message)
                console.log(data.message)

            } else {
                setLoading(false)
                toast.error(data.message)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        getSales()
    }, [])

    useEffect(() => {
        console.log(sales)
    }, [sales])


    return { sales, loading }
}

