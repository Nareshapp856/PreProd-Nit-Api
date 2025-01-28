const slots = require("../contents/slots");

exports.getSlots = (req, res) => {
  res.json({ data: slots });
};

exports.submitUserActions = (req, res) => {
  res.json({ data: slots });
};

exports.loadData = (req, res) => {
  res.json({ data: { studentIds: [1, 3, 5] } });
};
