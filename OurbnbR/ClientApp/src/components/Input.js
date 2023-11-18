import { React, Component } from 'react';

export  function Inputs({ value, name, label, type, OnChange, error}) {



        return (
            <div className="form-group">
                <label>{label}: </label>
                <input value={value} name={name} type={type} onChange={OnChange}
                />
                <p className="text-danger">{error}</p>
            </div>
        );
    
}