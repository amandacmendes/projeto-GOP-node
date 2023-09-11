'use strict';
const { Model, DataTypes } = require('sequelize');

class ReasonTypeModel extends Model {
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

module.exports = { ReasonTypeModel }