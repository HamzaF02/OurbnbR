import { React } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { Service } from "../Service"

export function DeleteOrder() {

    const params = useParams()
    const navigate = useNavigate()
    const api = new Service("order")
    async function deleteConfirmed() {
        //this try fetches the correct Order from the api and tries to delete it
        try {
            
            //answer waits for the json reply
            const answer = await api.delete(params.id)
            console.log(answer);
            //navigates to orders page if the deletion was seccessfull
            if (answer.success) {
                navigate("/orders")
            }
            //Error message if failed
        } catch (e) {
            console.log("failed")
        }
    }
    //returns the page for deletion of an order
    return (
        <div>
            <   h3>Are you sure you want to Delete this Order id: {params.id}</h3>
            <button className="btn btn-danger" onClick={deleteConfirmed}>Delete</button>
        </div>
    );
}