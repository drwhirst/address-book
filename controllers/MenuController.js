const inquirer = require('inquirer');

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
        this.contacts = [];
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
        console.log('addContact called');
        this.main();
    }

    getContactCount() {
        return this.contacts.length;
    }

    exit() {
        console.log("Thanks for using the address book, bitch.");
        process.exit();
    }
}