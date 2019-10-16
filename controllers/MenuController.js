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
                    setTimeout(() => { this.searchForContact() }, 2000);
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
        inquirer.prompt(this.book.showContactQuestions)
        .then((answer) => {
            switch(answer.selected) {
                case "Delete contact":
                    this.delete(contact);
                    break;
                case "Main menu":
                    this.main();
                    break;
                default:
                    console.log("Something went wrong");
                    this.showContact(contact);
            }
        })
        .catch((err) => {
            console.log(err);
            this.showContact(contact);
        });
    }

    delete(contact){
        inquirer.prompt(this.book.deleteConfirmQuestion)
        .then((answer) => {
            if(answer.confirmation){
                this.book.delete(contact.id);
                console.log("contact deleted like a little bitch.");
                setTimeout(() => { this.main() }, 2000);
            } else {
                console.log("Contact not deleted because you suck.");
                setTimeout(() => {this.showContact(contact)}, 2000);
            }
        })
        .catch((err) => {
            console.log(err);
            this.main();
        })
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