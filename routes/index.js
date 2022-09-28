const express = require('express');
const router = express.Router();

const indexController = require('../modules/index/controller');

router.get('/', async (req, res, next) => {
  try {
    await new indexController().generate(req, res, next);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
