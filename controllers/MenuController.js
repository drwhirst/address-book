const inquirer = require('inquirer');
const contactController  = require('./ContactController');

module.exports = class MenuController {
    constructor() {
        this.mainMenuQuestions = [
            {
                type: 'list',
                name: 'mainMenuChoice',
                message: 'Please choose from the options below:',
                choices: [
                    "Add new contact",
                    "View all contacts",
                    "Search for a contact",
                    "Exit"
                ]
            }
        ];
        this.book = new contactController();
    }

    main() {
        console.log('Welcome to the Address Book!');
        inquirer.prompt(this.mainMenuQuestions).then((response) => {
            switch(response.mainMenuChoice){
                case "Add new contact":
                    this.addContact();
                    break;
                case "View all contacts":
                    this.getContacts();
                    break;
                case "Search for a contact":
                    this.searchForContact();
                    break;
                case "Exit":
                    this.exit();
                default:
                    console.log('Invalid input');
                    this.main; 
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    clear() {
        console.log("\x1Bc");
    }

    addContact() {
        this.clear();
        inquirer.prompt(this.book.addContactQuestions).then((answers) => {
            this.book.addContact(answers.name, answers.phone, answers.email).then((contact) =>{
                console.log("It was added dumb fuck");
                this.main();
            })
            .catch((err) => {
                console.log(err);
                this.main();
            });
        });
    }

    getContactCount() {
        return this.contacts.length;
    }

    getContacts() {
        this.clear();
        this.book.getContacts().then((contacts) => {
            for (let contact of contacts) {
                console.log(`
                name: ${contact.name}
                phone: ${contact.phone}
                email: ${contact.email}
                ----------------------`
                );
            }
            this.main();
        }).catch((err) => {
            console.log(err);
            this.main();
        });
    }

    searchForContact(){
        this.clear();
        inquirer.prompt(this.book.searchQuestions)
        .then((target) => {
            this.book.search(target.name)
            .then((contact) => {
                if(contact === null){
                    this.clear();
                    console.log("Contact not found asshat");
                } else {
                    this.showContact(contact);
                }
            })
            .catch((err) =>{
                console.log(err);
                this.main();
            })
        });
    }

    showContact(contact){
        this._printContact(contact);
    }

    _printContact(contact){
        console.log(`
                name: ${contact.name}
                phone: ${contact.phone}
                email: ${contact.email}
                ----------------------`
        );
    }

    exit() {
        console.log("Thanks for using the address book, bitch.");
        process.exit();
    }
}