
export class rentalService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    async create(obj) {
        const rep = await fetch(this.baseURL + ' create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj),
        });
        const answer = await rep.json();
        return answer
    }

    async update(obj) {
        const rep = await fetch(this.baseURL + 'update', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj),
        });
        const answer = await rep.json();
        return answer
    }
    async delete(id) {
        const rep = await fetch(this.baseURL + 'delete/' + id, {
            method: 'Delete',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(id)
        });

        const answer = await rep.json();
        return answer
    }
    async GetAll() {
        const response = await fetch(this.baseURL);
        return await response.json();
    
    }
    async GetObjByid(id) {
        const response = await fetch(this.baseURL + id );
        return await response.json();
    }

}
