import { React, useState } from 'react';
import "./input.css"

export function Select({ value, name, label, errormsg, data, OnChange, ...Other }) {

    const [focused, setFocused] = useState(false)


    function handleFocus(e) {
        setFocused(true)
    }

    return (
        < div className = "form-group" >
               
            <label htmlFor={name}>{label}: </label>
            <select value={value} name={name} onChange={OnChange} className="form-control" {...Other}>
                {data.map((i) => (
                    <option key={i.customerId} value={i.customerId}>{i.customerId}: {i.firstName} {i.lastName}</option>
                ))}
            </select>
        </div >);
} 