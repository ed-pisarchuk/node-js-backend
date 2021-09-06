'use strict'
const {Model} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class UserOnGroup extends Model {
        static associate(models) {
            // define association here
        }
    }

    UserOnGroup.init({
        user_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false},
        group_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false},
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'userOnGroup',
    })
    return UserOnGroup
}