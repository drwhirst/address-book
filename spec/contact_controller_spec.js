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

    describe('#getContacts()', () => {
        it("should return an empty array when no contacts are available", (done) => {
            this.book.getContacts()
            .then((contacts) => {
                expect(contacts.length).toBe(0);
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it("should return an array of contacts when contacts are available", (done) => {
            this.book.addContact("Alice", "555-555-5555", "alice@hotstuff.ca")
            .then(() => {
                this.book.getContacts()
                .then((contacts) => {
                    expect(contacts.length).toBe(1);
                    done();
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe('#iterativeSearch()', () => {

        const zelda = ["Zelda Smith", "000-100-111", "zelda@nintendo.com"];
        const snake = ["Solid Snake", "100-100-100", "snake@konami.com"];
        const magus = ["Magus Johnson", "101-010-101", "magus@squaresoft.com"];
        const alloy = ["Alloy Rodriguez", "111-111-111", "allow@guerrilla-games.com"];

        describe("#search()", () => {
            it("should return null when a contact was not found", (done) => {
              this.book.addContact(...zelda)
              .then(() => {
                this.book.search("Solid Snake")
                .then((contact) => {
                  expect(contact).toBeNull();
                  done();
                })
                .catch((err) => {
                  console.log(err);
                  done();
                });
              });
            });
      
            it("should return the contact when found", (done) => {
              this.book.addContact(...snake)
              .then(() => {
                this.book.search("Solid Snake")
                .then((contact) => {
                  expect(contact).not.toBeNull();
                  expect(contact.name).toBe("Solid Snake");
                  expect(contact.phone).toBe("100-100-100");
                  expect(contact.email).toBe("snake@konami.com");
                  done();
                })
                .catch((err) => {
                  console.log(err);
                  done();
                });
              });
            });
      
        });
    });

    it("should be defined", () => {
        expect(ContactController).toBeDefined();
    });
});