'use strict';
const { Model, DataTypes } = require('sequelize');


class ResourceOperation extends Model {

  static init(database) {
    super.init({
      resource_id: DataTypes.INTEGER,
      operation_id: DataTypes.INTEGER
    }, {
      sequelize: database,
      modelName: 'ResourceOperation',
      tableName: 'resource_operation',
      timestamps: false
    });
  }

  static associate(models) {
    this.belongsToMany(models.Resource, { foreignKey: 'resource_id' });
    this.belongsToMany(models.Operation, { foreignKey: 'operation_id' });
  }
}

module.exports = { ResourceOperation };