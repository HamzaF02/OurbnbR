
import { React } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

export function Delete() {
    const params = useParams()
    const navigate = useNavigate()

    // Asynchronous function for confirming and executing the deletion. This is
    // done by using the feth api to make a delete request.
    async function deleteConfirmed() {
        try {
            const rep = await fetch('api/rentals/delete/' + params.id, {
                method: 'Delete',
                headers: {
                    "Content-Type": "application/json" //Setting request header for JSON.
                },
                body: JSON.stringify(params.id)
            });
            // Parsing the JSON respone from the server and redirecting 
            // to rental page is server reports succeeds.
            const answer = await rep.json();
            console.log(answer);
            if (answer.success) {
                navigate("/rental")
            }
        } catch (e) {
            // handling errors 
            console.log("failed")
        }
    }
    //Assurance Deletion message 
    return (
        <div>
            <   h3>Are you sure you want to Delete this Rental id: {params.id}</h3>
            <button className="btn btn-danger" onClick={deleteConfirmed}>Delete</button>
        </div>
    );
}