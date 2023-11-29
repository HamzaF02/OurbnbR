
import { React } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

export function DeleteOrder() {

    const params = useParams()
    const navigate = useNavigate()


    async function deleteConfirmed() {
        //this try fetches the correct Order from the api and tries to delete it
        try {
            const rep = await fetch('api/order/delete/' + params.id, {
                method: 'Delete',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(params.id)
            });
            //answer waits for the json reply
            const answer = await rep.json();
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