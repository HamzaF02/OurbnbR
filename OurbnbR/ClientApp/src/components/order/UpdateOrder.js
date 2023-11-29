import { React, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { Inputs } from '../Input'
import { inputlist } from './InputList';
import './orders.css';
import { Service } from "../Service"


export default function UpdateOrder() {
    // service injection and usestates that gets used to update order
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()
    const api = new Service("order")
   
    // method to get order
    useEffect(() => {
        getOrder()
    }, []);

    // method when submiting an updated order
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const answer = await api.update(values);
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

    // gets order by id and sets values from data 
    async function getOrder() {
        const data = await api.getObjByid(params.id)
        setValues(data); setLoading(false);
    }

    // html for update order
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


