var DataTypes = require("sequelize").DataTypes;
var _user = require("./user")
var _payment = require("./payment");

function initModels(sequelize) {
  var user = _user(sequelize, DataTypes);
  var payment = _payment(sequelize, DataTypes);


  return {
    user,
    payment,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
