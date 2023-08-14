const Sequelize = require('sequelize');
const sequelize = require('../config/config')
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_info', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    full_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    freezeTableName: true,
    sequelize,
    tableName: 'user_info',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "user_info_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};

