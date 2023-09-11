'use strict';
const { Model, DataTypes } = require('sequelize');

class OfficerOperation extends Model {

  static init(database) {
    super.init({
      officer_id: DataTypes.INTEGER,
      operation_id: DataTypes.INTEGER
    }, {
      sequelize: database,
      modelName: 'OfficerOperation',
      tableName: 'officer_operation',
      timestamps: false
    })
  }

  static associate(models) {
    this.belongsToMany(models.Officer, { foreignKey: 'officer_id' });
    this.belongsToMany(models.Operation, { foreignKey: 'operation_id' });
  }
}

module.exports = { OfficerOperation };