class AnalyticsPage {
    constructor(selenium, logger) {
        this.selenium = selenium
        this.logger =logger
    }

    /* save the current number of the EmailSent badge*/
    async getEmailSentBadgesNum(){
        let number = await this.selenium.getTextFromElement("xpath", "//*[@id='root']/div/div[4]/div[1]/div[2]/div[1]")
        console.log(`got the EmailSent badge number: ${number}`)
        this.logger.info(`got the EmailSent badge number: ${number}`)
        return number
    }

    /* save the current number of the OuttandingClient badge*/
    async getOutstandingClientsBadgesNum(){
        let number = await this.selenium.getTextFromElement("xpath", "//*[@id='root']/div/div[4]/div[1]/div[3]/div[1]")
        console.log(`got the OuttandingClient badge number: ${number}`)
        this.logger.info(`got the OuttandingClient badge number: ${number}`)
        return number
    }

    /* changes the choice of the drop down, given the input*/
    async checkSalesBy(choice) {
        try {
            await this.selenium.clickElement("xpath", "//div[@class='sales-by-param-chart']/select[@class='select-css']")
            await this.selenium.clickElement("xpath", `//option[text()='${choice}']`)
            await this.selenium.clickElement("xpath", "//div[@class='sales-by-param-chart']/select[@class='select-css']")
        } catch (error) {
            console.error(`error in checkSalesBy Function: ${error}`)
            this.logger.error(`error in checkSalesBy Function: ${error}`)
        }
    }

    /* changes the choice of the drop down, given the input*/
    async checkEmployeesSalesIn(country) {
        try {
            await this.selenium.clickElement("xpath", "//div[@class='employees-sales-by-country-input']/select[@class='select-css']")
            await this.selenium.clickElement("xpath", `//option[text()='${country}']`)
            await this.selenium.clickElement("xpath", "//div[@class='employees-sales-by-country-input']/select[@class='select-css']")
        } catch (error) {
            console.error(`error in checkEmployeesSalesIn Function: ${error}`)
            this.logger.error(`error in checkEmployeesSalesIn Function: ${error}`)
        }
    }

}


module.exports = AnalyticsPage