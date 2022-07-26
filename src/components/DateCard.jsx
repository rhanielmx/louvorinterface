import { useEffect, useState } from "react";

function DateCard(props) {
    const date = new Date(props.date)
    let disabled = date.getDay() === 3
    return (
        <div className="group relative">
            <button className="bg-green-500 disabled:bg-yellow-500 rounded-full w-8 h-8" disabled={disabled}>{date.getDate()}</button>
            <div className={`hidden -top-10 h-10 bg-green-300 ${disabled ? '' : 'group-hover:block group-hover:md:block absolute'}`}>
                <div className="flex flex-row h-full items-center" onChange={(e)=>props.onChange(props.radio, date.getDate(), e.target.value)}>
                    <input type="radio" value="EBD" name="sunday-avaiability" /> EBD
                    <input type="radio" value="Culto" name="sunday-avaiability" /> Culto
                    <input type="radio" value="Ambos" name="sunday-avaiability" /> Ambos
                </div>
            </div>
        </div>
    )
}

export default DateCard;