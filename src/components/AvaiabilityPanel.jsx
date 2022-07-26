import { useEffect, useState } from "react";
import DateCard from "./DateCard";

function AvaiabilityPanel(props) {    
    return (
        <div className="grid grid-cols-3 w-52 pb-4">
            {props.dates.map((date) => {
                // console.log(date.getDate())
                // props.setRadio({...props.radio, [date]: 'Ambos'})
                return <DateCard key={date} date={date} radio={props.radio} onChange={props.updateRadio} />
            })//.join(', ')
        }
        {/* {console.log('catapimbas',props.radio)} */}
        </div>
    )
}

export default AvaiabilityPanel;