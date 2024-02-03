import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';


export default function usePurchase() {

    const [purchases, setPurchases] = useState([])
    const [loading, setLoading] = useState(false)

    const getPurchases = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`/api/purchase`)
            console.log(data)
            if (data.success) {
                setLoading(false)
                setPurchases(data.message)
            } else {
                toast.error(data.message)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        getPurchases()
    }, [])

    useEffect(() => {
        console.log(purchases)
    }, [purchases])


    return { purchases, loading }
}

