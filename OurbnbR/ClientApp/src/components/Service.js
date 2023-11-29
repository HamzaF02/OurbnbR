
export class Service {
    constructor(baseURL) {
        this.baseURL = "/api/"+baseURL;
    }
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
    }
    async getAll() {
        const response = await fetch(this.baseURL);
        const data = await response.json()
        return data;
    
    }
    async getObjByid(id) {
        const response = await fetch(this.baseURL + "/" + id);
        const data = await response.json();
        return data;
    }
    async customerList() {
        const response = await fetch("/api/customer");
        const data = await response.json();
        return data;
    }
}
