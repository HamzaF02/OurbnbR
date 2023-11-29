export function parseNumber(number,length) {
    return Number.parseFloat(number).toFixed(length);
}

export function parsePrice(number) {
    return parseNumber(number,2) + " NOK";
}

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]

export function parseDateTime(date) {
    var output = new Date(date.split("T")[0])
    return output.getDate() + " " + months[output.getMonth()] + " " + output.getFullYear()
}