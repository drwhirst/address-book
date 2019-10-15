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
                    "Check the date and time",
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
                case "Check the date and time":
                    this.getDate();
                    break;
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

    exit() {
        console.log("Thanks for using the address book, bitch.");
        process.exit();
    }

    getDate() {
        this.clear();
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date+' '+time;
        console.log(dateTime);
        this.main();
    }
}