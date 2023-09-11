'use strict';
const { Model, DataTypes } = require('sequelize');

class TeamModel extends Model {

  static init(database) {
    super.init({
      team_name: DataTypes.STRING,
      status: DataTypes.CHAR(1)
    }, {
      sequelize: database,
      tableName: 'team',
      modelName: 'Team',
    });
  };

  static associate(models) {
    // define association here
  }
}

module.exports = { TeamModel };