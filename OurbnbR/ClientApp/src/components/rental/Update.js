import { React, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { Inputs } from '../Input'
import { inputlist } from './InputList';
import { Service } from '../Service';

const api = new Service("rentals")


export default function Update() {
    //State variables to manage form values, loading state and error messages
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(true)
    //Hooks to extract parameters and for navigation
    const params = useParams()
    const navigate = useNavigate()
    const [error, setError] = useState("")



    //Getting rentals when the components renders

    useEffect(() => {
        //Async function to fetch rental data from the server and set loading to false once the data is fetched
        const getRental = async () => {

            const data = await api.getObjByid(params.id);
            setValues(data);
            setLoading(false);
        }
        if (params.id >= 1) {
            getRental()
        }
    }, [params.id]);

    //Asynch Function to handles submission of updated form
    async function handleSubmit(e) {
        e.preventDefault();
        console.log(values)
        //Date validation
        if (values.fromDate > values.toDate) {
            setError("Dates are not valid")
            return;
        }
        //A PUT request to update the rental data
        try {
            const answer = await api.update(values)
            console.log("Success: " + answer.success);
            //If the update is successful then redirected to the rental page with the new update
            if (answer.success) {
                navigate("/rental")
            }
            //Handling erros
            setError(answer.message)
        } catch (error) {
            console.log("Failed: " + error.message)
            setError(error.message)
        }
    }
    // Event hanlding function for input changes in the form fields
    function handleOnChange(e) {
        const name = e.target.name
        const value = e.target.value
        setValues({ ...values, [name]: value });
    }


    //Made it so that a user is unable to change the owner 
    return (

        loading ? <p>loading...</p> :
            <div>
                <h1>Update Rental</h1>
                <p>{error}</p>
                <p>Owner: {values.owner.firstName} {values.owner.lastName}</p>
                <form onSubmit={handleSubmit}>
                    {inputlist.filter(function (i) {
                        return i.name !== 'ownerId';
                    }).map((input) => (
                        <Inputs key={input.id} value={values[input.name]} {...input} OnChange={handleOnChange} />

                    ))}
                    <button type="submit" className="btn btn-primary" value="Post">Submit</button>
                </form>
            </div>
    );
}


