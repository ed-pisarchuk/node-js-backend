'use strict'
const {Model} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            models.user.belongsToMany(models.group, {through: 'user_on_groups', foreignKey: 'user_id', otherKey: 'group_id'})
        }
    }

    User.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        username: DataTypes.STRING,
        isBlocked: DataTypes.BOOLEAN,
        expiredDate: DataTypes.DATE,
        refreshToken: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'user',
    })
    return User
}