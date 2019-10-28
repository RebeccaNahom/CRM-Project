class ActionsPage {
    constructor(selenium, logger) {
        this.selenium = selenium
        this.logger =logger


        this.searchBy = ["Name", "Country", "Email", "Owner", "Sold", "Email Type"]
        this.page = ["home", "client", "actions", "analytics"]
    }

    /* given the input(name), searches for the client, 
    then updates the selected clients’ info with the info given. */
    async updateClient(name, ownership = null, type = null, isSold = null) {
        try {
            await this.selenium.write(name, "xpath", "//input[@list='names']")
            await this.selenium.clickElement("xpath", "//datalist[@id='names']/option[2]")
            if (ownership) {
                await this.selenium.write(ownership, "xpath", "//input[@list='owner']")
                await this.selenium.clickElement("xpath", "//datalist[@id='owner']/option[1]")
                await this.selenium.clickElement("xpath", "//input[@value='Transfer']")
            }
            if (type) {
                await this.selenium.clickElement("xpath", "//input[@list='emailType']")
                await this.selenium.write(type, "xpath", "//input[@list='emailType']")
                await this.selenium.clickElement("xpath", "//datalist[@id='emailType']/option[1]")
                await this.selenium.clickElement("xpath", "//input[@value='Send']")
            }
            if (isSold) {
                await this.selenium.clickElement("xpath", "//input[@value='Sold']")
            }
        } catch (error) {
            console.error(`error in updateClientAndValidate Function: ${error}`)
        }
    }

    /* given the input, addes a new client. */
    async addClient(first, last, country, owner, email) {  
        try {
            console.log(`Adding a client:`)
            await this.selenium.write(first, "id", "firstName")
            await this.selenium.write(last, "id", "lastName")
            await this.selenium.write(country, "id", "country")
            await this.selenium.write(owner, "xpath", "//input[@id='owner']")
            await this.selenium.write(email, "id", "email")
            await this.selenium.clickElement("xpath", "//input[@value='Add']")
            console.log(`added a new client with name: ${first + last}`)
        } catch (error) {
            console.error(`error in addClientAndValidate Function: ${error}`)
        }
    }
}


module.exports = ActionsPage
