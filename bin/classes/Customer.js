class Customer {

    constructor(id, name, email, town, mobile, comment, sending_email) {
        this.email = email;
        this.id = id;
        this.name = name;
        this.town = town;
        this.mobile = mobile;
        this.comment = comment;
        this.sending_email = sending_email;
    }

}

module.exports = Customer;