var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()+"T00:00:00";
export const inputlist = [
    {
        id: 1,
        name: "name",
        errormsg: "Name must be 2 - 50 characters",
        label: "Name",
        type: "text",
        required: true,
        pattern: "^[A-Za-z0-9 ]{2,50}$",
        
        
    },
    {
        id: 2,
        name: "price",
        errormsg: "Price must be greater than 0",
        label: "Price",
        type: "number",
        required: true,
        min: 1
        
    },
    {
        id: 3,
        name: "description",
        errormsg: "",
        label: "Description",
        type: "text",
        required: false,
    },

    {
        id: 4,
        name: "fromDate",
        errormsg: "From date must be greater than today",
        label: "FromDate",
        type: "datetime-local",
        required: true,
        min: date

    },
    {
        id: 5,
        name: "toDate",
        errormsg: "To date must be greater than fromDate",
        label: "ToDate",
        type: "datetime-local",
        required: true,
        min: date
    },
    {
        id: 6,
        name: "image",
        errormsg: "",
        label: "Image",
        type: "text",
        required: false,
    },
    {
        id: 7,
        name: "ownerId",
        errormsg: "Ownerid must be a positive number",
        label: "OwnerId",
        type: "number",
        required: true,
        min: 0,
    },
    {
        id: 8,
        name: "location",
        errormsg: "location must be between 2 - 50 characters",
        label: "Location",
        type: "text",
        required: true,
        pattern: "^[A-Za-z0-9 ]{2,50}$",
    },
]