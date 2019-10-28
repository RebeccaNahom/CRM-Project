
const SeleniumInfra = require("./SeleniumInfra")
const Logger = require("./logger")

class BasePage {
  constructor() {
    this.logger = new Logger().logger
    this.selenium = new SeleniumInfra(this.logger)
  }
}

module.exports = BasePage