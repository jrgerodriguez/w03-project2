const validator = require("../helpers/validate");

const createAndUpdateElement = (req, res, next) => {
  const validationRule = {
    title: "required|string",
    content: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  createAndUpdateElement,
};
