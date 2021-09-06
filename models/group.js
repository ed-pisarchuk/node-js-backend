'use strict'
const {Model} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Group extends Model {
        static associate(models) {
            models.group.belongsToMany(models.user, {through: 'user_on_groups', foreignKey: 'group_id', otherKey: 'user_id'})
        }
    }

    Group.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'group',
    })
    return Group
}