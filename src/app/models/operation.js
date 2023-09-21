'use strict';
const { Model, DataTypes } = require('sequelize');

class OperationModel extends Model {

  static init(database) {
    super.init({
      operation_name: DataTypes.STRING,
      operation_place: DataTypes.STRING,
      operation_planned_date: DataTypes.DATE,
      operation_date: DataTypes.DATE,
      lead_officer_id: DataTypes.INTEGER,
      status: DataTypes.STRING,
      operation_results_deaths: DataTypes.INTEGER,
      operation_results_arrests: DataTypes.INTEGER,
      operation_results_report: DataTypes.STRING(1000)
    }, {
      sequelize: database,
      tableName: 'operation',
      modelName: 'Operation',
    });
  }

  static associate(models) {
    this.belongsTo(models.Officer, {foreignKey:'lead_officer_id'})
  }
}

module.exports = { OperationModel };