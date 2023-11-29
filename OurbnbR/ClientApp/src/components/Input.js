import { React, useState } from 'react';
import "./input.css"
import { inputlist } from './rental/InputList';

export function Inputs({ value, name, label, errormsg, type, OnChange, ...Other }) {

    const [focused, setFocused] = useState(false)


    function handleFocus(e) {
        setFocused(true)
    }

    return(
        <div className="form-group">
               
            <label htmlFor={name}>{label}: </label>
            <input value={value} name={name} type={type} onChange={OnChange} onBlur={handleFocus} focused={focused.toString()} className="form-control" {...Other} />
            <span>{errormsg}</span>

        </div>);
} 