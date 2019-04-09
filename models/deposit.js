var objectId = require('../utils/id_generator');

export default class Deposit {
    constructor(date, customer, ammount) {
        this.sale = {
            id: objectId(),
            date: date,
            customer: customer,
            ammount: ammount
        }
    }
}