const Contact = require('../db/models').Contact;

module.exports = class ContactController {
    constructor(){
        this.contacts = [];
        this.addContactQuestions = [
            {
                type: "input",
                name: "name",
                message: "Contact's name - ",
                validate(val){
                    return val !== "";
                }
            },
            {
                type: "input",
                name: "phone",
                message: "Contact's phone number - ",
                validate(val){
                    return val !== "";
                }
            },
            {
                type: "input",
                name: "email",
                message: "Contact's email - ",
                validate(val){
                    return val !== "";
                }
            }
        ];
        this.searchQuestions = [
            {
                type: "input",
                name: "name",
                message: "Name of contact to search for - ",
                validate(val){
                    return val !== "";
                }
            }
        ];
        this.showContactQuestions = [
            {
                type: "list",
                name: "selected",
                message: "Please choose from the list of options below:",
                choices: [
                    "Delete contact",
                    "Main menu"
                ]
            }
        ]
        this.deleteConfirmQuestion = [
            {
                type: "confirm",
                name: "confirmation",
                message: "Are you sure you want to delete this contact?"
            }
        ]
    }

    addContact(name, phone, email) {
        return Contact.create({name, phone, email});
    }

    getContacts(){
        return Contact.findAll();
    }

    search(name){
        return Contact.findOne({
            where: {name}
        });
    }

    delete(id) {
        return Contact.destroy({
            where: {id}
        })
    }
}