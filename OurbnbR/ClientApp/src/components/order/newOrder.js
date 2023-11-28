import { React, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Inputs } from '../Input'
import { inputlist } from './InputList';

export function NewOrder() {
    const params = useParams();
    const [values, setValues] = useState(
        {
            customerId: 0, rentalId: 0, rating: 0, from: "", to: "", rental: { owner: {} }, customer: {}, totalPrice: 0,
        });
    const [valid, setValid] = useState(true);
    const navigate = useNavigate()
    const [error, setError] = useState("")


    useEffect(() => {
        setRental()
    }, []);

    function setRental() {
        if (params.id > 0) {
            setValid(false)
            setValues({ ...values, rentalId: params.id });

        }
        
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(values);
        if (values.from > values.to) {
            setError("Dates are not valid");
            return;
        }
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
                <p>{error}</p>
                <form onSubmit={handleSubmit}>
                {inputlist.map((input) => (
                    <Inputs key={input.id} value={values[input.name]} {...input} OnChange={handleOnChange} />

                ))}
                    <button type="submit" className="btn btn-primary" value="Post">Submit</button>
                </form>
        </div>
    );
}


