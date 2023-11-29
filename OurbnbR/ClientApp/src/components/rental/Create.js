import { React, useState } from 'react';
import { Inputs } from '../Input'
import { inputlist } from './InputList';
import { redirect, Form, useActionData } from 'react-router-dom'


export function CreateRental() {
        const [values, setValues] = useState(
            {
                name: "", price: 0, description: "", image: "",location: "", fromDate: "", toDate: "", ownerId: "", owner: {}
            });
    const errorMessage = useActionData()

    const [focused, setFocused] = useState(false)

        

        function handleOnChange(e) {
            const name = e.target.name
            const value = e.target.value
            setValues({ ...values, [name]: value });
        }

        function handleFocus(e) {
            setFocused(true)
        }


        return (
            <div>
              
                <h1>Create Rental</h1>
                {errorMessage && errorMessage.error && <p className="text-danger">{errorMessage.error}</p>}
                    <Form method="post" action="/rental/create">
                    {inputlist.map((input) => (

                        <Inputs key={input.id} value={values[input.name]} {...input} OnChange={handleOnChange}  />
                            
                        ))}

                    <button type="submit" className="btn btn-primary knapp" value="Post">Submit</button>
                    </Form>
                </div>
        );
    }


export const rentalCreateAction = async ({request}) => {
    const data = await request.formData()
    const values = {
        name: data.get("name"), price: data.get("price"), description: data.get("description"), image: data.get("image"), location: data.get("location"), fromDate: data.get("fromDate"), toDate: data.get("toDate"), ownerId: data.get("ownerId"), owner: { }
    }
    console.log(values)
   
    if (values.fromDate > values.toDate) {
        return { error: "Dates are not valid" }
    }
    try {
        const rep = await fetch('api/rentals/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values),
        });
        const answer = await rep.json();
        if (answer && answer.success) {
            console.log("Success: " + answer.success);
            return redirect('/rental')
        }
        console.log("Invalid");
        return { error: "Inncorrect information" }

    } catch (error) {
        console.log("Failed")
        return { error: error.message}
    }
}