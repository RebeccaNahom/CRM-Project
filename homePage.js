class HomePage{
    constructor(selenium, logger){
        this.selenium = selenium
        this.logger =logger
    }

    /* navigates to page given */
    async navigateTo(page){  
        if (page == "home") {
            await this.selenium.getURL("https://lh-crm.herokuapp.com")
            await this.selenium.validURL("https://lh-crm.herokuapp.com")
            await this.selenium.sleep(2000)
        }else{
            await this.selenium.getURL(`https://lh-crm.herokuapp.com/${page}`)
            await this.selenium.validURL(page)
            await this.selenium.sleep(2000)

        }
        console.log(`navigated to ${page} page`)
        
    }

    /* given the input, clickes the button on navbar */
    async clickNavBarButtons(button) {  // add URL validation
        try {
            await this.selenium.clickElement("xpath", `//input[@value='${button}']`)
            console.log(`navigated successfully to ${button} page`)
        } catch (error) {
            console.error(`error in navigateTo Function: ${error}`)
        }
    }
    

    /* presses the color/B&W button */
    async colorOrBAndWButton() {  // add validation
        await this.selenium.clickElement("xpath", "//div[@class='color-btn']")
        console.log(`clicked on color button`)
    }
}

module.exports = HomePage