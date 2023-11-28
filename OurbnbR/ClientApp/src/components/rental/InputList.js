export const inputlist = [
    {
        id: 1,
        name: "name",
        errormsg: "Name must be 2 - 50 characters",
        label: "Name",
        type: "text",
        required: true,
        pattern: "^[A-Za-z0-9]{2,50}$",
        
        
    },
    {
        id: 2,
        name: "price",
        errormsg: "Price must be greater than 0",
        label: "Price",
        type: "number",
        required: true,
        pattern: "^[0-9]{1,10}$",
        
    },
    {
        id: 3,
        name: "description",
        errormsg: "",
        label: "Description",
        type: "text",
    },

    {
        id: 4,
        name: "fromDate",
        errormsg: "From date must be greater than fromDate",
        label: "FromDate",
        type: "datetime-local",
        required: true,

    },
    {
        id: 5,
        name: "toDate",
        errormsg: "To date must be greater than fromDate",
        label: "ToDate",
        type: "datetime-local",
        required: true,
    },
    {
        id: 6,
        name: "image",
        errormsg: "",
        label: "Image",
        type: "text",
    },
    {
        id: 7,
        name: "ownerId",
        errormsg: "Ownerid must be a positive number",
        label: "OwnerId",
        type: "number",
        required: true,
        pattern: "^[0-9]{1,10}$",
    },
    {
        id: 8,
        name: "location",
        errormsg: "location must be between 2 - 50 characters",
        label: "Location",
        type: "text",
        required: true,
        pattern: "^[A-Za-z0-9]{2,50}$",
    },
]