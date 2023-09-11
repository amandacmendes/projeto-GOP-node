const { Sequelize } = require('sequelize');
const configDatabase = require('./config');

//const Models
const { Officer } = require('../app/models/officer');
const { OfficerOperation } = require('../app/models/officeroperation');
const { Operation } = require('../app/models/operation');
const { Reason } = require('../app/models/reason');
const { ReasonType } = require('../app/models/reasontype');
const { Resource } = require('../app/models/resource');
const { ResourceOperation } = require('../app/models/resourceoperation');
const { ResourceType } = require('../app/models/resourcetype');
const { Team } = require('../app/models/team');
const { User } = require('../app/models/user');

//const { MerendeiraModel } = require('../models/merendeira-model');
//const { NutricionistaModel } = require('../models/nutricionista-model');
//const { NotaFiscalModel } = require('../models/nota-fiscal-mode');

const database = new Sequelize(configDatabase);

//init models
Officer.init(database);
OfficerOperation.init(database);
Operation.init(database);
Reason.init(database);
ReasonType.init(database);
Resource.init(database);
ResourceOperation.init(database);
ResourceType.init(database);
Team.init(database);
User.init(database);

module.exports = database;
