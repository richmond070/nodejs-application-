const {DataTypes} = require('sequelize');
const sequelize = require('../config/config');
const Payment = require('./payment');

module.exports = (sequelize) => {
  const User = sequelize.define('user_info', {
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
  });

  // defining associations for the tables ..... user has many payments
  User.associate = function (models) {
    User.hasMany(models.Payment, {
      foreignKey: 'userId',
    });
  } 
  

  sequelize.sync({alter: true});

  return user_info;
};

