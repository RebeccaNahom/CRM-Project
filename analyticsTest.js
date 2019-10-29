const BasePage = require("./basePage")
const HomePage = require("./homePage")
const ActionsPage = require("./actionsPage")
const AnalyticsPage = require("./analyticsPage")
// const logger = require('./logger');


class AnalytcsPageTest {
    constructor() {
        this.basePage = new BasePage()
        this.testSelenium = this.basePage.selenium
        this.logger = this.basePage.logger
        this.homePage = new HomePage(this.testSelenium, this.logger)
        this.actionsPage = new ActionsPage(this.testSelenium, this.logger)
        this.analyticsPage = new AnalyticsPage(this.testSelenium, this.logger)

        this.page = ["home", "client", "actions", "analytics"]
        this.choice = ["Country", "Email Type", "Employee", "Month (All Time)"]
    }

    async sentEmailsTest() {
        this.logger.info(`START sentEmailsTest:`)
        await this.homePage.navigateTo(this.page[3])
        let emailSentNum = await this.analyticsPage.getEmailSentBadgesNum()
        await this.homePage.navigateTo(this.page[2])
        await this.actionsPage.updateClient("Daana Nahom", null, "A")
        await this.homePage.navigateTo(this.page[3])
        let updatedEmailSentNum = await this.analyticsPage.getEmailSentBadgesNum()
        console.log("validating if the number of email sent was added by 1:")
        if (emailSentNum == updatedEmailSentNum - 1) {
            console.log("true")
        } else {
            console.log("false")
        }
    }

    async outstandingClientsSalesInTest() {
        this.logger.info(`START outstandingClientsSalesInTest:`)
        await this.homePage.navigateTo(this.page[3])
        let clientSalesNum = await this.analyticsPage.getOutstandingClientsBadgesNum()
        await this.homePage.navigateTo(this.page[2])
        await this.actionsPage.updateClient("Dannna Nahom", null, null, true)
        await this.homePage.navigateTo(this.page[3])
        let updatedClientSalesNum = await this.analyticsPage.getOutstandingClientsBadgesNum()
        console.log(clientSalesNum, updatedClientSalesNum)
        console.log("validating if the number of outstanding clients was reduced by 1:")
        if (clientSalesNum == updatedClientSalesNum + 1) {
            console.log("true")
        } else {
            console.log("false")
        }
    }

}

let analytcsPageTest = new AnalytcsPageTest()

async function analyticsTests() {
    await analytcsPageTest.sentEmailsTest()
    await analytcsPageTest.outstandingClientsSalesInTest()
}

analyticsTests()