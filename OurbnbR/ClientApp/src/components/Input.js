import { React } from 'react';
import "./input.css"
import { inputlist } from './rental/InputList';

export function Inputs({ value, name, label, errormsg, type, OnChange }) {

    if (type == "hidden") {
        return (
            <div className="form-group">
                <input value={value} name={name} type={type} />
            </div>);
    }
    else {
        return (
            <div className="form-group">
               
                <label for={name}>{label}: </label>
                <span>{errormsg}</span>
                <input value={value} name={name} type={type} onChange={OnChange} className="form-control" />
            </div>);
    }
}