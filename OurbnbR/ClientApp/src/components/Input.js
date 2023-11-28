import { React } from 'react';
import "./input.css"
import { inputlist } from './rental/InputList';

export function Inputs({ value, name, label, errormsg, type, OnChange, ...Other }) {
    return(
        <div className="form-group">
               
            <label htmlFor={name}>{label}: </label>
            <input value={value} name={name} type={type} onChange={OnChange} className="form-control" {...Other} />
            <span>{errormsg}</span>

        </div>);
}