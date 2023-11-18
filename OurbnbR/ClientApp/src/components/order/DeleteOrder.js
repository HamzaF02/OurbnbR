
import { React } from 'react';
import { useParams } from 'react-router-dom'

export function DeleteOrder() {
    const params = useParams()

    async function deleteConfirmed() {
        try {
            const rep = await fetch('api/order/delete/' + params.id, {
                method: 'Delete',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(params.id)
            });

            const answer = await rep.json();
            console.log(answer);
        } catch (e) {
            console.log("failed")
        }
    }
    return (
        <div>
            <   h3>Are you sure you want to Delete this Order id: {params.id}</h3>
            <button className="btn btn-danger" onClick={deleteConfirmed}>Delete</button>
        </div>
    );
}