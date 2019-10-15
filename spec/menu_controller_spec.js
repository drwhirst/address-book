const MenuController = require("../controllers/MenuController");

describe("MenuController", () => {

    beforeEach(() => {
        this.menu = new MenuController();
    });

    describe('#getContactCount()', () => {

        it("should return 0 when no contacts are in the book", () => {
            expect(this.menu.getContactCount()).toBe(0);
        });

        it("Should return 1 when there is exactly once contact in the address book", () => {
            this.menu.contacts.push("Bob");
            expect(this.menu.getContactCount()).toBe(1);
        });
    });

    describe('#remindMe()', () => {

        it("Should return the string 'learning is a lifelong pursuit'", () => {
            expect(this.menu.remindMe()).toBe('learning is a lifelong pursuit');
        });
    });
});