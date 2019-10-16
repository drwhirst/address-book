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

    exit() {
        console.log("Thanks for using the address book, bitch.");
        process.exit();
    }
}