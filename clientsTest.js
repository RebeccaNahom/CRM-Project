const BasePage = require("./basePage")
const HomePage = require("./homePage")
const ClientsPage = require("./clientsPage")

class ClientsPageTest {
    constructor() {
        this.basePage = new BasePage()
        this.testSelenium = this.basePage.selenium
        this.logger = this.basePage.logger
        this.homePage = new HomePage(this.testSelenium, this.logger)
        this.clientsPage = new ClientsPage(this.testSelenium, this.logger)

        this.searchBy = ["Name", "Country", "Email", "Owner", "Sold", "Email Type"]
        this.page = ["home", "client", "actions", "analytics"]
    }


    async searchClientTest() {
        this.logger.info(`START searchClientTest:`)
        await this.homePage.navigateTo(this.page[1])
        await this.clientsPage.searchAndValidateClient("Dana Nahom", this.searchBy[0])
    }

    async pressButtonTest() {
        this.logger.info(`START pressButtonTest:`)
        await this.homePage.navigateTo(this.page[1])
        await this.clientsPage.pressNextPageAndValidate(1)
        await this.clientsPage.pressPreviousPageAndValidate()
    }

    async updateClientTest() {
        this.logger.info(`START updateClientTest:`)
        let updateBy = ["name", "country", "email"]
        await this.homePage.navigateTo(this.page[1])
        await this.clientsPage.updateClientAndValidate("Dana Nahom", "Ilannnn@imat.com", updateBy[2], this.searchBy[2])
    }

    async pressLastPage() {
        this.logger.info(`START pressLastPage:`)
        await this.homePage.navigateTo(this.page[1])
        let lastPage = await this.clientsPage.findLastPage()
        await this.clientsPage.pressNextPageAndValidate(lastPage - 1)
    }

    async deleteClientTest() {
        this.logger.info(`START deleteClientTest:`)
        await this.homePage.navigateTo(this.page[1])
        await this.clientsPage.deleteClient("Danaa Nahom", this.searchBy[0])
        await this.homePage.close()
    }
}

let clientPageTest = new ClientsPageTest()

async function clientTests() {
    await clientPageTest.searchClientTest()
    await clientPageTest.pressButtonTest()
    await clientPageTest.updateClientTest()
    await clientPageTest.pressLastPage()
    await clientPageTest.deleteClientTest()
}

clientTests()