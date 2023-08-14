const Sequelize = require('sequelize');
const sequelize = require('../config/config');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payment', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    plan: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    paymentMethod: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'payment',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "payment_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

