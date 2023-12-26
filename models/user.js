const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const User = sequelize.define("user",{
    id : {
        primaryKey : true,
        autoIncrement : true,
        type : DataTypes.INTEGER,
        allowNull : false
    },
    fullname : {
        type : DataTypes.STRING,
        allowNull : false
    },
    username : {
        type : DataTypes.STRING,
        unique : true,
        allowNull : false
    },
    password : {
        type : DataTypes.TEXT,
        allowNull : false
    },
});

module.exports = User;