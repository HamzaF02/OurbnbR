import { React, useEffect, useState } from 'react';
import { Inputs } from '../Input'
import { inputlist } from './InputList';
import { redirect, Form, useActionData } from 'react-router-dom'
import "./create.css"
import { Service } from '../Service';
import { Select } from '../Select';

// State variable 'values' is implemented useState hook to write values
export function CreateRental() {
        const [values, setValues] = useState(
            {
                name: "", price: 0, description: "", image: "",location: "", fromDate: "", toDate: "", ownerId: "", owner: {}
            });
    const [customers, setCustomers] = useState({});
    const api = new Service("rental")
    const [loading,setLoading] = useState(true)



//Custom hook is  to retrieve error messages
    const errorMessage = useActionData()

    useEffect(() => {
        getOwners()
    }, []);

 //Event handler (e) function for input changes in the form fields name and value

        function handleOnChange(e) {
            const name = e.target.name
            const value = e.target.value
            setValues({ ...values, [name]: value });
        }
    async function getOwners() {
        const customerList = await api.customerList();
        setCustomers(customerList)
        setLoading(false)
    }


       


        return ( loading ? <p>loading...</p>:
            <div>
              
                <h1>Create Rental</h1>
                {errorMessage && errorMessage.error && <p className="text-danger">{errorMessage.error}</p>}
                    <Form method="post" action="/rental/create">
                    {inputlist.map((input) => {
                        if (input.type == "select") {
                            return <Select key={input.id} value={values[input.name]} {...input} OnChange={handleOnChange} data={customers} />

                        }
                        else {
                            return <Inputs key={input.id} value={values[input.name]} {...input} OnChange={handleOnChange} />
                        }
                    }
                    )}

                    <button type="submit" className="btn btn-primary " value="Post">Submit</button>
                    </Form>
                </div>
        );
    }


export const rentalCreateAction = async ({request}) => {
    const data = await request.formData()
    const api = new Service("rentals")
    const values = {
        name: data.get("name"), price: data.get("price"), description: data.get("description"), image: data.get("image"), location: data.get("location"), fromDate: data.get("fromDate"), toDate: data.get("toDate"), ownerId: data.get("ownerId"), owner: { }
    }
    console.log(values)
   
    if (values.fromDate > values.toDate) {
        return { error: "Dates are not valid" }
    }
    try {

        const answer = await api.create(values)
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