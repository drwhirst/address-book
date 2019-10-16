const ContactController = require("../controllers/ContactController");
const sequelize = require("../db/models/index").sequelize;

describe("ContactController", () => {

    beforeEach((done) =>{
        this.book = new ContactController();

        sequelize.sync({force: true}).then((res) => {
            done();
        })
        .catch((err) => {
            done();
        });
    });

    describe('#addContact()', () => {
        it("Should add a single contact into the book", (done) => {
            this.book.addContact("Alice", "555-555-5555", "alice@hotstuff.ca")
            .then((contact) => {
                expect(contact.name).toBe("Alice");
                expect(contact.phone).toBe("555-555-5555");
                expect(contact.email).toBe("alice@hotstuff.ca");
                done();
            })
            .catch((err) => {
                done();
            });
        });
    });

    it("should be defined", () => {
        expect(ContactController).toBeDefined();
    });
});