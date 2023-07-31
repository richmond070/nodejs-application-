var DataTypes = require("sequelize").DataTypes;
var _user_info = require("./user_info");

function initModels(sequelize) {
  var user_info = _user_info(sequelize, DataTypes);


  return {
    user_info,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
