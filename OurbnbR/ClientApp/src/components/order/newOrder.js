import { React, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Inputs } from '../Input'
import { inputlist } from './InputList';
import "./neworder.css"


export function NewOrder() {
    const params = useParams();
    const [values, setValues] = useState(
        {
            customerId: 0, rentalId: 0, rating: 0, from: "", to: "", rental: { owner: {} }, customer: {}, totalPrice: 0,
        });

    const [rentalvalues, getValues] = useState(
        {
            rentalId: 0, name: "", from: "", to: "", rental: { owner: {} }, customer: {},
        });


    const [valid, setValid] = useState(true);
    const navigate = useNavigate()


    useEffect(() => {
        setRental()
        getRental()
 
    }, []);

    function setRental() {

        if (params.id > 0) {
            setValid(false)
            setValues({ ...values, rentalId: params.id });

        }
        
    }

    function getRental() {

        if (params.id > 0) {
            setValid(false)
            getValues({ ...values, rentalId: params.id });

        }



    }
   

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const rep = await fetch('api/order/create', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values),
            });

            const answer = await rep.json();
            console.log("Success: " + answer.success);
            if (answer.success) {
                navigate("/orders")
            }

        } catch (error) {
            console.log("Failed")
        }
    }

    function handleOnChange(e) {
        const name = e.target.name
        const value = e.target.value
        setValues({ ...values, [name]: value });
    }


    return (
        valid ? <p>Invalid</p>: 
        <div>
            <h1>Create Order</h1>
                <div className="rentalInfo">
                    <p className="ptxt"> Name of Rental: {rentalvalues[params.name]}</p>
                    <p className="ptxt">From date:</p>
                    <p className="ptxt">To date:</p>
            </div>
            <form onSubmit={handleSubmit}>
                {inputlist.map((input) => (
                    <Inputs key={input.id} value={values[input.name]} {...input} OnChange={handleOnChange} />

                ))}
                    <button type="submit" className="btn btn-primary" value="Post">Submit</button>
                </form>
        </div>
    );
}


