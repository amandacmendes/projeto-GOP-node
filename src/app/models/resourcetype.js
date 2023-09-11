'use strict';
const { Model, DataTypes } = require('sequelize');


class ResourceTypeModel extends Model {

  static init(database) {
    super.init({
      description: DataTypes.STRING
    }, {
      sequelize: database,
      modelName: 'ResourceType',
      tableName: 'resourcetype',
      timestamps: false
    });
  }
  static associate(models) {
  }
}

module.exports = { ResourceTypeModel }