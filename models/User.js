const {Model, DataTypes} = require('sequelize');
const sequelize = require('../server');

//var User = dbConfig.define('Locale', {
    locale: DataTypes.STRING
//});

class User extends Model {}

User.init ({
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        date_created: DataTypes.DATE,
        date_updated: DataTypes.DATE
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        date_created: DataTypes.DATE,
        date_updated: DataTypes.DATE
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        date_created: DataTypes.DATE,
        date_updated: DataTypes.DATE
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        date_created: DataTypes.DATE,
        date_updated: DataTypes.DATE
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        date_created: DataTypes.DATE,
        date_updated: DataTypes.DATE
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        date_created: DataTypes.DATE,
        date_updated: DataTypes.DATE
    },
}, {
    sequelize,
    modelName: 'user_info'
})




module.exports = User; 