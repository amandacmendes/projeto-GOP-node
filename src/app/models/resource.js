'use strict';
const { Model, DataTypes } = require('sequelize');

class ResourceModel extends Model {

  static init(database) {
    super.init({
      description: DataTypes.STRING,
      resourcetype_id: DataTypes.INTEGER,
      status: DataTypes.STRING(10)
    }, {
      sequelize: database,
      modelName: 'Resource',
      tableName: 'resource',
      timestamps: false
    });
  }

  static associate(models) {
    this.hasOne(models.ResourceType, { foreignKey: 'resourcetype_id' })
  }
}

module.exports = { ResourceModel };