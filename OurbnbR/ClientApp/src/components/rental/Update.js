import { React, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { Inputs } from '../Input'
import { inputlist } from './InputList';
import { Service } from './Service';


export default function Update() {
    const [values, setValues] = useState(
        {
        });
    const [loading, setLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const api = new Service("rentals")




    useEffect(() => {
        getRental()
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(values)
        if (values.fromDate < values.toDate) {
            setError("Dates are not valid")
        }

        try {
            const answer = await api.update(values)
            console.log("Success: " + answer.success);
            if (answer.success) {
                navigate("/rental")
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

    async function getRental() {
        const data = await api.getObjByid(params.id)
        setValues(data); setLoading(false);
    }


    return (

        loading ? <p>loading...</p> :
            <div>
                <h1>Update Rental</h1>
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


