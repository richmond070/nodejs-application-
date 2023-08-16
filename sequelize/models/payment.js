const {DataTypes} = require('sequelize');
const sequelize = require('../config/config');
const User = require("./user");

module.exports = function(sequelize) {
  const payment = sequelize.define('payment', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    plan: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    paymentMethod: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'payment',
    schema: 'public',
    timestamps: false,
  });

  // creating associations for the database.... payment belongsTo one user
  payment.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'User'
  });


  sequelize.sync({alter: true});
};
