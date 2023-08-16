var DataTypes = require("sequelize").DataTypes;
var _payment = require("./payment");
var _user = require("./user")

function initModels(sequelize) {
  var payment = _payment(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    payment,
    user
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
