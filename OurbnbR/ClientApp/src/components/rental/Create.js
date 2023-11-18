import { React, useState } from 'react';
import { Inputs } from '../Input'
import { inputlist } from './InputList';

export function CreateRental() {
        const [values, setValues] = useState(
            {
                name: "", price: 0, description: "", image: "",location: "", fromDate: "", toDate: "", ownerId: "", owner: {}
            });

        

        async function handleSubmit(e) {
            e.preventDefault();
            try {


                const rep = await fetch('api/rentals/create', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values),
                });

                const answer = await rep.json();
                console.log("Success: " + answer.success);
                

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
                <div>
                    <h1>Create Rental</h1>
                    <form onSubmit={handleSubmit}>
                        {inputlist.map((input) => (
                            <Inputs key={input.id} value={values[input.name]} {...input} OnChange={handleOnChange} />

                        ))}
                        <button type="submit" className="btn btn-primary" value="Post">Submit</button>
                    </form>
                </div>
        );
    }


