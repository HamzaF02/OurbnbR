
export class Service {
    //Constructor to initialize the base url 
    constructor(baseURL) {
        this.baseURL = "/api/"+baseURL;
    }
    //Asynch function for creating a new object. MMakes a POST request to the server
    async create(obj) {
        const rep = await fetch(this.baseURL + '/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj),
        });
        const answer = await rep.json();
        return answer
    }
    //Asynch function to update en object from the server with a PUT call.

    async update(obj) {
        const rep = await fetch(this.baseURL + '/update', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj),
        });
        const answer = await rep.json();
        return answer
    }
    //Asynch function to Delete en object from the server.
    async delete(id) {
        const rep = await fetch(this.baseURL + '/delete/' + id, {
            method: 'Delete',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(id)
        });

        const answer = await rep.json();
        return answer

    }//Asynch function to get all objects from the server (READ)
    async getAll() {
        const response = await fetch(this.baseURL);
        const data = await response.json()
        return data;
    
    }
    async getObjByid(id) {
        const response = await fetch(this.baseURL + "/" +id );
        return await response.json();
    }

}
