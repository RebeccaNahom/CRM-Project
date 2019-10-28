const { Builder, By, Key, until } = require('selenium-webdriver');
const path = require('chromedriver').path;
const chrome = require('selenium-webdriver/chrome');
let service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);
//const this.logger = require("./this.logger")



class SelenuimInfra {
    constructor(logger) {
        this.driver = new Builder().forBrowser('chrome').build();
        this.logger=logger
    }

    async getURL(URL) { // Open browser
        await this.driver.get(URL)
        await this.driver.manage().window().maximize()
    }

    async close() { // Close browser
        setTimeout(() => {
            this.driver.quit()
        }, 1000)
    }

    async validURL(pageName) {
        if (this.driver.wait(until.urlContains(pageName), 5000)) {
            console.log("This Is The Right URL")
            this.logger.info("This Is The Right URL")
            return true
        }
        else {
            console.log("Wrong! This Is Worng URL")
            this.logger.error("Wrong! This Is Worng URL")
            return false
        }
    }

    async sleep(num){
        await this.driver.sleep(num)
    }

    async refresh(){
        this.driver.findElement(By.id("Contact-us")).sendKeys(Keys.F5)

    }

    // Click on element
    async clickElement(locatorType = "id", locatorValue = " ", element = null, fromElement) {
        try {
            if (!element) {
                if (fromElement) {
                    element = await fromElement.findElement(By[locatorType](locatorValue))
                } else {
                    element = await this.driver.findElement(By[locatorType](locatorValue))
                }
            }
            await element.click()
            await this.driver.sleep(2000)
            console.log(`Clicked on element with ${locatorType} = ${locatorValue}`)
            this.logger.info(`Clicked on element with ${locatorType} = ${locatorValue}`)
        }
        catch (error) {
            console.error(`Got error while trying to click on element with ${locatorType} = ${locatorValue}`)
            console.error(error)
            this.logger.error(`Got error while trying to click on element with ${locatorType} = ${locatorValue}`)
            this.logger.error(error)

        }
    }


    // Send Keys To Element
    async write(data, locatorType, locatorValue, element, fromElement) {
        try {
            if (!element) {
                if (fromElement) {
                    element = await fromElement.findElement(By[locatorType](locatorValue))
                } else {
                    element = await this.driver.findElement(By[locatorType](locatorValue))
                }
            }
            await element.sendKeys(data)
            console.log(`Send Keys to element with ${locatorType} = ${locatorValue} `)
            this.logger.info(`Send Keys to element with ${locatorType} = ${locatorValue} `)
        }
        catch (error) {
            console.error(`Got error while trying to send keys to element with ${locatorType} = ${locatorValue}`)
            this.logger.error(`Got error while trying to send keys to element with ${locatorType} = ${locatorValue}`)
            console.error(error)
            this.logger.error(error)
        }
    }

    // Get text from element
    async getTextFromElement(locatorType, locatorValue, element = null, fromElement = null) {
        try {
            if (!element) {
                if (fromElement) {
                    element = await fromElement.findElement(By[locatorType](locatorValue))
                } else {
                    element = await this.driver.findElement(By[locatorType](locatorValue))
                }
            }
            console.log(`Got text from element with ${locatorType} = ${locatorValue} `)
            this.logger.log(`Got text from element with ${locatorType} = ${locatorValue} `)
            return element.getText()
        }
        catch (error) {
            console.error(`Got error while trying to get text from element with ${locatorType} = ${locatorValue}`)
            this.logger.error(`Got error while trying to get text from element with ${locatorType} = ${locatorValue}`)
            console.error(error)
            this.logger.error(error)
            return ""
        }
    }

    // Clear element field
    async clearElementField(locatorType, locatorValue, element, fromElement) {
        try {
            if (!element) {
                if (fromElement) {
                    element = await fromElement.findElement(By[locatorType](locatorValue))
                } else {
                    element = await this.driver.findElement(By[locatorType](locatorValue))
                }
            }
            await element.clear()
            console.log(`Clear text from element with ${locatorType} = ${locatorValue} `)
            this.logger.log(`Clear text from element with ${locatorType} = ${locatorValue} `)
        }
        catch (error) {
            console.error(`Got error while trying to Clear text from element with ${locatorType} = ${locatorValue}`)
            this.logger.error(`Got error while trying to Clear text from element with ${locatorType} = ${locatorValue}`)
            console.error(error)
            this.logger.error(error)
        }
    }

    // Check if element exists
    async isElementExists(locatorType, locatorValue) {
        let element
        try {
            element = await this.driver.findElement(By[locatorType](locatorValue))
            return true
        }
        catch{
            return false
        }
    }

    // Find and return element by type and value
    async findElementBy(locatorType, locatorValue, fromElement = null) {
        let element
        try {
            if (fromElement) {
                element = await fromElement.findElement(By[locatorType](locatorValue))
            }
            else {
                element = await this.driver.findElement(By[locatorType](locatorValue))
            }
            console.log(`Found element with ${locatorType} = ${locatorValue} `)
            this.logger.log(`Found element with ${locatorType} = ${locatorValue} `)
            return element
        }
        catch{
            console.error(`Got error while trying to find element with ${locatorType} = ${locatorValue}`)
            this.logger.error(`Got error while trying to find element with ${locatorType} = ${locatorValue}`)
            console.error(error)
            this.logger.error(error)
        }

    }

    // Find all the elements with the same type and value and return array(list)
    async findElementListBy(locatorType, locatorValue, fromElement = null) {
        let element
        try {
            if (fromElement) {
                element = await fromElement.findElements(By[locatorType](locatorValue))
            }
            else {
                element = await this.driver.findElements(By[locatorType](locatorValue))
            }
            return element
        }
        catch{
            console.error(`Got error while trying to find element with ${locatorType} = ${locatorValue}`)
            this.logger.error(`Got error while trying to find element with ${locatorType} = ${locatorValue}`)
            console.error(error)
            this.logger.error(error)
        }

    }

}

module.exports = SelenuimInfra
