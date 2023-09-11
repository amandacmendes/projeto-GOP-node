'use strict';
const { Model, DataTypes } = require('sequelize');

class ReasonType extends Model {
  static init(database) {

    super.init({
      description: DataTypes.STRING
    }, {
      sequelize: database,
      modelName: 'ReasonType',
      tableName: 'reasontype',
      timestamps: false 
    });
  }
  static associate(models) {
  }
}

module.exports = { ReasonType }