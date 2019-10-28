class ClientsPage {
    constructor(selenium, logger) {
        this.selenium = selenium
        this.logger = logger
    }

    /* given the full name, returns first/last name*/
    async fullNameToFirstAndLast(fullName, firstOrLast) {
        try {
            let firstName = fullName.split(" ")[0]
            let lastName = fullName.split(" ")[1]
            let firstNameElement = await this.selenium.findElementBy("xpath", `//th[text()="${firstName}"]`)
            let lastNameElement = await this.selenium.findElementBy("xpath", `//th[text()="${lastName}"]`)
            if (firstOrLast == "F") {
                console.log(`got first name: ${firstNameElement}`)
                this.logger.info(`got first name: ${firstNameElement}`)
                return firstNameElement
            }
            if (firstOrLast == "L") {
                console.log(`got first name: ${lastNameElement}`)
                this.logger.info(`got first name: ${lastNameElement}`)
                return lastNameElement
            }
        } catch{
            console.error(`error in fullNameToFirstAndLast Function: ${error}`)
            this.logger.error(`error in fullNameToFirstAndLast Function: ${error}`)
        }
    }

    /* given the inputs, search for a clients by input(full name/ email) and search option.
     then validate client exists.*/
    async searchAndValidateClient(input, searchBy) { // needs fixing. validation.
        try {
            let firstNameElement = await this.fullNameToFirstAndLast(input, "F")
            let lastNameElement = await this.fullNameToFirstAndLast(input, "L")
            console.log("searching for a client:")
            this.logger.warn("searching for a client:")
            await this.selenium.write(input, "xpath", "//input[@type='text']")
            await this.selenium.clickElement("xpath", "//select[@class='select-css']")
            await this.selenium.clickElement("xpath", `//option[@value="${searchBy}"]`)
            await this.selenium.clickElement("xpath", `//select[@class='select-css']`)
            console.log("Validating if client exists:")
            this.logger.warn("Validating if client exists:")
            if (searchBy == "Name") {
                if (firstNameElement && lastNameElement) {
                    console.log(`client with ${searchBy}: ${input} exists!`)
                    this.logger.info(`client with ${searchBy}: ${input} exists!`)
                    console.log("True!")
                    this.logger.info("True!")
                    return true
                } else if (await this.selenium.isElementExists("xpath", `//th[text()="${input}"]`)) {
                    console.log(`client with ${searchBy}: ${input} exists!`)
                    this.logger.info(`client with ${searchBy}: ${input} exists!`)
                    console.log("True!")
                    this.logger.info("True!")
                    return true
                } else {
                    console.log(`Nope! client with ${searchBy}: ${input} doesn't exist...`)
                    this.logger.info(`Nope! client with ${searchBy}: ${input} doesn't exist...`)
                    console.log("False!")
                    this.logger.info("False!")
                    return false
                }
            }
        } catch (error) {
            console.error(`error in searchAndValidateClient Function: ${error}`)
            this.logger.error(`error in searchAndValidateClient Function: ${error}`)
        }
    }


    /* finds last page of search results */
    async findLastPage() {
        let lastPage = this.selenium.getTextFromElement("xpath", "//div[@class='page-numbers']/span[3]")
        console.log(`last page: ${lastPage}`)
        this.logger.info(`last page: ${lastPage}`)
        return lastPage
    }

    /* press the next page button. 
    if given an input - press the button for nuber of times given.*/
    async pressNextPageAndValidate(pageNum = 0) {
        try {
            this.logger.info("wwwwwwwwwwwwww")
            let currentPage = await this.selenium.getTextFromElement("xpath", "//div[@class='page-numbers']/span[1]")
            console.log(`current page = ${currentPage}`)
            console.log(`pressing next page:`)
            let nextPageButton = await this.selenium.findElementBy("xpath", "//img[@name='next']")
            if (pageNum) {
                for (let i = 0; i < pageNum; i++) {
                    await this.selenium.clickElement(null, null, nextPageButton)
                    let pressedPage = await this.selenium.getTextFromElement("xpath", "//div[@class='page-numbers']/span[1]")
                    console.log(`pressed page number ${pressedPage}`)
                }
                console.log(`pressed next page button ${pageNum} times`)
                console.log(`validating if page was pressed:`)
                if (await this.selenium.getTextFromElement("xpath", "//div[@class='page-numbers']/span[1]")
                    == pageNum + 1) {
                    console.log("true")
                } else {
                    console.log("false")
                }
            } else {
                await this.selenium.clickElement(null, null, nextPageButton)
                console.log(`Yay! pressed next page button`)
                if (await this.selenium.getTextFromElement("xpath", "//div[@class='page-numbers']/span[1]")
                    == currentPage + 1) {
                    console.log("true")
                } else {
                    console.log("false")
                }
            }
        } catch (error) {
            console.error(`error in pressNextPage Function: ${error}`)
        }
    }

    /* press the previous page button. 
    if given an input: press the button for number of times given. */
    async pressPreviousPageAndValidate(pageNum = 0) {
        try {
            let currentPage = await this.selenium.getTextFromElement("xpath", "//div[@class='page-numbers']/span[1]")
            console.log(`current page = ${currentPage}`)
            console.log(`pressing previous page:`)
            let PreviousPageButton = await this.selenium.findElementBy("xpath", "//img[@name='previous']")
            if (pageNum) {
                for (let i = 0; i < pageNum; i++) {
                    await this.selenium.clickElement(null, null, PreviousPageButton)
                    let pressedPage = await this.selenium.getTextFromElement("xpath", "//div[@class='page-numbers']/span[1]")
                    console.log(`pressed page number ${pressedPage}`)
                }
                console.log(`pressed previous page button ${pageNum} times`)
                console.log(`validating if page was pressed:`)
                if (currentPage - pageNum ==
                    await this.selenium.getTextFromElement("xpath", "//div[@class='page-numbers']/span[1]")) {
                    console.log("true")
                } else {
                    console.log("false")
                }
            } else {
                await this.selenium.clickElement(null, null, PreviousPageButton)
                console.log(`Hurray! pressed previous page button`)
                console.log(`validating if page was pressed:`)
                if (currentPage - 1 ==
                    await this.selenium.getTextFromElement("xpath", "//div[@class='page-numbers']/span[1]")) {
                    console.log("true")
                } else {
                    console.log("false")
                }
            }
        } catch (error) {
            console.error(`error in pressPreviousPage Function: ${error}`)
        }
    }

    /* given the input, uses searchAndValidateClient function, 
    then updates the selected client's info with updateBy  */
    async updateClientAndValidate(input, updateInfo, updateBy, searchBy) {  // fix validation - cant validate with name and country
        try {
            console.log(`updating client's info:`)
            let fullName = input
            let firstName = fullName.split(" ")[0]
            await this.searchAndValidateClient(input, "Name")
            await this.selenium.clickElement("xpath", `//th[text()="${firstName}"]`)
            await this.selenium.clearElementField("id", updateBy)
            await this.selenium.write(updateInfo, "id", updateBy)
            await this.selenium.clickElement("xpath", `//input[@class='update-client-popup-btn']`)
            console.log(`validating the update of the client:`)
            await this.searchAndValidateClient(updateInfo, searchBy)

        } catch (error) {
            console.error(`error in updateClientAndValidate Function: ${error}`)
        }
    }

    /*given the input, search for client, then deletes the selected client’s info */
    async deleteClient(input, searchBy) {
        try {
            await this.selenium.write(input, "xpath", "//input[@type='text']")
            await this.selenium.clickElement("xpath", '//select[@class="select-css"]')
            await this.selenium.clickElement("xpath", `//option[@value="${searchBy}"]`)
            await this.selenium.clickElement("xpath", `//select[@class="select-css"]`)
            await this.selenium.clickElement("xpath", `//tr[@class='clientDetails'][1]`)
            await this.selenium.clickElement("xpath", `//input[@class='delete-client-popup-btn']`)
            console.log(`validating if client was deleted:`)
            if (await this.selenium.isElementExists("xpath", `//th[text()="${input}"]`)) {
                console.log(`oh no! client with ${searchBy}: ${input} was not deleted!`)
            } else {
                console.log(`good, client with ${searchBy}: ${input} was deleted! `)
            }
        } catch (error) {
            console.error(`error in deleteClientAndValidate Function: ${error}`)
        }
    }

}


module.exports = ClientsPage