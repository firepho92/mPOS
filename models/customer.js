import ObjectId from '../utils/id_generator';

export default class Customer {
    constructor(name, phone, address) {
        this.customer = {
            id: ObjectId(),
            name: name,
            phone: phone,
            address: address,
            status: true
        }
    }
}