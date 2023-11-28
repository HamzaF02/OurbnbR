import { React, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { Inputs } from '../Input'
import { inputlist } from './InputList';
import './orders.css';


export default function UpdateOrder() {
    const [values, setValues] = useState(
        {
        });
    const [loading, setLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getOrder()
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const rep = await fetch('api/order/update', {
                method: 'PUT',
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

    async function getOrder() {
        const response = await fetch('api/order/' + params.id);
        const data = await response.json();
        setValues(data); setLoading(false);
    }


    return (

        loading ? <p>loading...</p> :
            <div>
                <h1>Update Order</h1>
                <form onSubmit={handleSubmit}>
                    {inputlist.map((input) => (
                        <Inputs key={input.id} value={values[input.name]} {...input} OnChange={handleOnChange} />

                    ))}
                    <button type="submit" className="btn btn-primary submitUpdate" value="Post">Submit</button>
                </form>
            </div>
    );
}


