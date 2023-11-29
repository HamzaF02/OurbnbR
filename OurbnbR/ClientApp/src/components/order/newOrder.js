import { React, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Inputs } from '../Input'
import { inputlist } from './InputList';


export function NewOrder() {
    const params = useParams();
    //makes the initial values for the form
    const [values, setValues] = useState(
        {
            customerId: 0, rentalId: 0, rating: 0, from: "", to: "", rental: { owner: {} }, customer: {}, totalPrice: 0,
        });
    const [valid, setValid] = useState(true);
    const navigate = useNavigate()


    useEffect(() => {
        setRental()
    }, []);

    //gets the rental information
    function setRental() {
        if (params.id > 0) {
            setValid(false)
            setValues({ ...values, rentalId: params.id });

        }
        
    }


    async function handleSubmit(e) {
        e.preventDefault();
        //fetches the information from the api to make a new order
        try {
            const rep = await fetch('api/order/create', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values),
            });

            //waits for the reply and if it was succssesfull navigates to the orders page
            const answer = await rep.json();
            console.log("Success: " + answer.success);
            if (answer.success) {
                navigate("/orders")
            }

        } catch (error) {
            console.log("Failed")
        }
    }

    //sets the values on change in the form
    function handleOnChange(e) {
        const name = e.target.name
        const value = e.target.value
        setValues({ ...values, [name]: value });
    }

    //returns the page for making an order
    return (
        valid ? <p>Invalid</p>: 
        <div>
            <h1>Create Order</h1>
            <form onSubmit={handleSubmit}>
                {inputlist.map((input) => (
                    <Inputs key={input.id} value={values[input.name]} {...input} OnChange={handleOnChange} />

                ))}
                    <button type="submit" className="btn btn-primary" value="Post">Submit</button>
                </form>
        </div>
    );
}


