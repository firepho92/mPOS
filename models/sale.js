export default class Sale {
    constructor(ticket, date, customer, beer, ammount) {
        this.sale = {
            ticket: ticket,
            date: date,
            customer: customer,
            beer: beer,
            ammount: ammount
        }
    }
}