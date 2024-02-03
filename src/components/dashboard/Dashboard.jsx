import React from 'react'
import Card from './Card'
import { AiOutlineStock } from "react-icons/ai";
import { TbPropeller } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";

export default function Dashboard() {

    const cardData = [
        {

            title: 'Total Sales',
            value: "200M",
            bg: '#00BE95', icon: <AiOutlineStock />
        },
        {
            title: 'Profit',
            value: "100K",
            bg: '#007FCF', icon: <MdOutlineCategory />
        },
        {
            title: 'Products',
            value: 150,
            bg: '#00ABAD', icon: <TbPropeller />
        },
        {
            title: 'Employees',
            value: 15,
            bg: '#0096C3', icon: <HiOutlineUsers />
        },
    ]
    return (
        <>

            {/* Upper four Cards */}
            <div className="first grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  h-1/5 gap-5 ">
                {cardData && cardData.map((card) => {
                    return <Card
                        bg={card.bg}
                        icon={card.icon}
                        text={card.title}
                        value={card.value}
                    />
                })}
            </div>


        </>
    )
}
