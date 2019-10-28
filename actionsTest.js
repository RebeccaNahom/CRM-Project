const BasePage = require("./basePage")
const HomePage = require("./homePage")
const ClientsPage = require("./clientsPage")
const ActionsPage = require("./actionsPage")


class ActionsPageTest{
    constructor(){
        this.basePage = new BasePage()
        this.testSelenium = this.basePage.selenium
        this.logger = this.basePage.logger
        this.homePage = new HomePage(this.testSelenium, this.logger)
        this.clientsPage = new ClientsPage(this.testSelenium, this.logger)
        this.actionsPage = new ActionsPage(this.testSelenium, this.logger)

        this.searchBy = ["Name", "Country", "Email", "Owner", "Sold", "Email Type"]
        this.page = ["home", "client", "actions", "analytics"]
    }

 
    async updateClientAndValidateTest(){  // needs fixing, validation.
        await this.homePage.navigateTo(this.page[2])
        await this.actionsPage.updateClient("Dana Naho", null, "A")
        await this.homePage.navigateTo(this.page[1])
        await this.clientsPage.searchAndValidateClient("A", this.searchBy[5] )
    }

    async addClientMultipleTimesTest(){
        await this.homePage.navigateTo(this.page[2])
        for (let i = 0; i < 3; i++) {
            await this.actionsPage.addClient("Dana", "Nahom", "Canada", "Rebecca Nahom", "DanaNahom@imat.com") 
            await this.homePage.navigateTo(this.page[1])
            await this.homePage.navigateTo(this.page[2])
        }
    }
}


let actionsPageTest = new ActionsPageTest()

// actionsPageTest.updateClientAndValidateTest()
// actionsPageTest.addClientAndValidatesTest()
