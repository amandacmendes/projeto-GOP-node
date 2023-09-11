'use strict';
const { Model, DataTypes } = require('sequelize');
class Reason extends Model {

  static init(database) {
    super.init({
      description: DataTypes.STRING,
      reasontype_id: DataTypes.INTEGER,
      operation_id: DataTypes.INTEGER
    }, {
      sequelize: database,
      modelName: 'Reason',
      tableName: 'reason',
      timestamps: false
    });
  }

  static associate(models) {
    this.hasOne(models.ReasonType, { foreignKey: 'reasontype_id' })
    this.belongsTo(models.Operation, { foreignKey: 'operation_id' })
  }
}

module.exports = { Reason }