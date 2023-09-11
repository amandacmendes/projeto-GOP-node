'use strict';
const { Model, DataTypes } = require('sequelize');

class User extends Model {

  static init(database) {
    super.init({
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      status: DataTypes.CHAR(1),
      officer_id: DataTypes.INTEGER
    }, {
      sequelize: database,
      tableName: 'user',
      modelName: 'User',
    });
  };

  static associate(models) {
    this.belongsTo(models.Officer, { foreignKey: 'officer_id' });
  }
}

module.exports = { User };