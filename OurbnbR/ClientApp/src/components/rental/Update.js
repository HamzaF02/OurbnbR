import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Inputs } from '../Input'
import { inputlist } from './InputList';


export default function Update() {
    const [values, setValues] = useState(
        {
        });
    const [loading, setLoading] = useState(true)
    const params = useParams()

    useEffect(() => {
        getRental()
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const rep = await fetch('api/rentals/update', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values),
            });

            const answer = await rep.json();
            console.log("Success: " + answer.success);
            if (answer.success) {
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
        const response = await fetch('api/rentals/' + params.id);
        const data = await response.json();
        setValues(data); setLoading(false);
    }


    return (

        loading ? <p>loading...</p> :
            <div>
                <h1>Update Rental</h1>
                <form onSubmit={handleSubmit}>
                    {inputlist.map((input) => (
                        <Inputs key={input.id} value={values[input.name]} {...input} OnChange={handleOnChange} />

                    ))}
                    <button type="submit" className="btn btn-primary" value="Post">Submit</button>
                </form>
            </div>
    );
}

