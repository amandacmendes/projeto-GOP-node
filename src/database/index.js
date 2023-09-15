const { Sequelize } = require('sequelize');
const configDatabase = require('./config');

//const Models
const { OfficerModel } = require('../app/models/officer');
const { OfficerOperationModel } = require('../app/models/officeroperation');
const { OperationModel } = require('../app/models/operation');
const { ReasonModel } = require('../app/models/reason');
const { ReasonTypeModel } = require('../app/models/reasontype');
const { ResourceModel } = require('../app/models/resource');
const { ResourceOperationModel } = require('../app/models/resourceoperation');
const { ResourceTypeModel } = require('../app/models/resourcetype');
const { TeamModel } = require('../app/models/team');
const { UserModel } = require('../app/models/user');

const database = new Sequelize(configDatabase);

//init models
OfficerModel.init(database);
OfficerOperationModel.init(database);
OperationModel.init(database);
ReasonModel.init(database);
ReasonTypeModel.init(database);
ResourceModel.init(database);
ResourceOperationModel.init(database);
ResourceTypeModel.init(database);
TeamModel.init(database);
UserModel.init(database);

module.exports = database;
