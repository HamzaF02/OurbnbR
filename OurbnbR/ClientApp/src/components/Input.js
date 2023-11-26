import { React } from 'react';

export function Inputs({ value, name, label, type, OnChange }) {

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
                <input value={value} name={name} type={type} onChange={OnChange} className="form-control" />
            </div>);
    }
}