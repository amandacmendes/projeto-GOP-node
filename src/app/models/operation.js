'use strict';
const { Model, DataTypes } = require('sequelize');

class Operation extends Model {

  static init(database) {
    super.init({
      operation_name: DataTypes.STRING,
      operation_place: DataTypes.STRING,
      operation_planned_date: DataTypes.DATE,
      operation_date: DataTypes.DATE,
      status: DataTypes.STRING,
      operation_results_deaths: DataTypes.INTEGER,
      operation_results_arrests: DataTypes.INTEGER,
      operation_results_report: DataTypes.STRING
    }, {
      sequelize: database,
      tableName: 'operation',
      modelName: 'Operation',
    });
  }

  static associate(models) {
  }
}

module.exports = { Operation };