import React from 'react'

export default function Card({ bg, text, value, icon }) {

    function addCommasToNumber(number) {
        // Convert the number to a string
        const numberString = number.toString();

        // Use regular expression to add commas every three digits from the right
        const formattedNumber = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return formattedNumber;
    }


    return (
        <div style={{
            background: `${bg}`,
        }} className={`relative text-white rounded-2xl flex flex-col justify-end space-y-1 px-7 text-start h-32 py-5`}>

            <div className={`absolute text-white opacity-65 top-4 text-4xl right-5`}>
                {icon}
            </div>
            <div className="text-md font-medium">Total {text}</div>
            <div className="text-4xl font-semibold">{text === 'Revenues' ? '$' : ''}{addCommasToNumber(value)}</div>

        </div>
    )
}
