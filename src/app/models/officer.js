'use strict';
const { Model, DataTypes } = require('sequelize');

class OfficerModel extends Model {

  static init(database) {
    super.init({
      name: DataTypes.STRING,
      team_id: DataTypes.INTEGER
    }, {
      sequelize: database,
      tableName: 'officer',
      modelName: 'Officer',
    });
  };
  static associate(models) {
    this.belongsTo(models.Team, {foreignKey:'team_id'});
  }
};

module.exports = { OfficerModel };