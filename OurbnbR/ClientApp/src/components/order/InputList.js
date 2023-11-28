var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + "T00:00:00";
export const inputlist = [
    {
        id: 1,
        name: "customerId",
        label: "CustomerId",
        type: "number",
        required: true,
        min: 1,
        errormsg: "CustomerId must be a positive number",

    },

    {
        id: 2,
        name: "rating",
        label: "Rating",
        type: "number",
        min: 0,
        max: 5,
        errormsg: "Rating must be between 0 and 5",

    },
    {
        id: 3,
        name: "from",
        label: "From",
        type: "datetime-local",
        errormsg: "From date must be greater than today",
        required: true,
        min: date

    },
    {
        id: 4,
        name: "to",
        label: "To",
        type: "datetime-local",
        errormsg: "To date must be greater than today",
        required: true,
        min: date

    },
]