var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + "T00:00:00";
export const inputlist = [
    {
        id: 1,
        name: "customerId",
        label: "CustomerId",
        errormsg: "id must be bigger than 0",
        type: "number",
        required: true,
        pattern: "^[0-9]{1,10}$",
        min: 1,
    },
    
    {
        id: 2,
        name: "rating",
        label: "Rating",
        errormsg: "Rating must be between 1 - 5",
        type: "number",
        required: true,
        pattern: "^[1-5]{1}$",
        min: 1,
        max: 5,
    },
    {
        id: 3,
        name: "from",
        label: "From",
        errormsg: "From date must be greater than today",
        type: "datetime-local",
        required: true,
        min: date
    },
    {   
        id: 4,
        name: "to",
        label: "To",
        errormsg: "To date must be greater than fromDate",
        type: "datetime-local",
        required: true,
        min: date
    },
]