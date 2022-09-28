const Service = require('./service');

module.exports = class MccController {
  constructor() {
    this.service = new Service();
  }

  async generate(req, res, next) {
    await this.service.generate(req, res, next);
  }
}
