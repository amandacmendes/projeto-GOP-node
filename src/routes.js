const { Router } = require('express');

const { authMiddleware } = require('./middlewares/auth-middleware');

const { OfficerController } = require('./controllers/OfficerController');
const { UserController } = require('./controllers/UserController');
const { TeamController } = require('./controllers/TeamController');
const { OperationController } = require('./controllers/OperationController');
const { OfficerOperationController } = require('./controllers/OfficerOperationController');
const { ReasonController } = require('./controllers/ReasonController');
const { ReasonTypeController } = require('./controllers/ReasonTypeController');
const { ResourceController } = require('./controllers/ResourceController');
const { ResourceTypeController } = require('./controllers/ResourceTypeController');
const { ResourceOperationController } = require('./controllers/ResourceOperationController');

const routes = Router();

const userController = new UserController();
const officerController = new OfficerController();
const teamController = new TeamController();
const operationController = new OperationController();
const officerOperationController = new OfficerOperationController();
const reasonController = new ReasonController();
const reasonTypeController = new ReasonTypeController();
const resourceController = new ResourceController();
const resourceTypeController = new ResourceTypeController();
const resourceOperationController = new ResourceOperationController();

// Users
routes.post('/signup', userController.signup);
routes.post('/signin', userController.signin);
routes.get('/user', authMiddleware, userController.getAll);
routes.get('/user/:id', authMiddleware, userController.getById);
routes.delete('/user/:id', authMiddleware, userController.delete);
routes.put('/user/:id', authMiddleware, userController.update);


// Officer
routes.post('/officer', authMiddleware, officerController.create);
routes.get('/officer', authMiddleware, officerController.getAll);
routes.get('/officer/:id', authMiddleware, officerController.getById);
routes.delete('/officer/:id', authMiddleware, officerController.delete);
routes.put('/officer/:id', authMiddleware, officerController.update);
routes.put('/officer/team/:tid', authMiddleware, officerController.updateTeam);

// Team
routes.post('/team', authMiddleware, teamController.create);
routes.get('/team', authMiddleware, teamController.getAll);
routes.get('/team/:id', authMiddleware, teamController.getById);
routes.delete('/team/:id', authMiddleware, teamController.delete);
routes.put('/team/:id', authMiddleware, teamController.update);

// Operation
routes.post('/operation', authMiddleware, operationController.create);
routes.get('/operation', authMiddleware, operationController.getAll);
routes.delete('/operation/:id', authMiddleware, operationController.delete);
routes.put('/operation/:id', authMiddleware, operationController.update);
routes.get('/operation/:id', authMiddleware, operationController.getById);
routes.get('/operation/leadofficer/:id', authMiddleware, operationController.getByLeadOfficerId);


// OfficerOperation
routes.post('/officeroperation', authMiddleware, officerOperationController.create);
routes.get('/officeroperation', authMiddleware, officerOperationController.getAll);
routes.put('/officer/:ofid/operation/:oid', authMiddleware, officerOperationController.update);
routes.delete('/officer/:ofid/operation/:oid', authMiddleware, officerOperationController.delete);
routes.delete('/officeroperation/operation/:oid', authMiddleware, officerOperationController.deleteAllWithOperationId);
routes.delete('/officeroperation/officer/:ofid', authMiddleware, officerOperationController.deleteAllWithOfficerId);
routes.get('/officeroperation/officer/:ofid', authMiddleware, officerOperationController.getAllFromOfficer);
routes.get('/officeroperation/operation/:oid', authMiddleware, officerOperationController.getAllFromOperation);

// Reason
routes.post('/reason', authMiddleware, reasonController.create);
routes.get('/reason', authMiddleware, reasonController.getAll);
routes.get('/reason/operation/:oid', authMiddleware, reasonController.getAllByOperationId);
routes.delete('/reason/:id', authMiddleware, reasonController.delete);
routes.delete('/reason/operation/:oid', authMiddleware, reasonController.deleteAllWithOperationId);
routes.put('/reason/:id', authMiddleware, reasonController.update);

// ReasonType
routes.post('/reasontype', authMiddleware, reasonTypeController.create);
routes.get('/reasontype', authMiddleware, reasonTypeController.getAll);
routes.delete('/reasontype/:id', authMiddleware, reasonTypeController.delete);
routes.put('/reasontype/:id', authMiddleware, reasonTypeController.update);

// Resource
routes.post('/resource', authMiddleware, resourceController.create);
routes.get('/resource', authMiddleware, resourceController.getAll);
routes.get('/resource/:id', authMiddleware, resourceController.getById);
routes.delete('/resource/:id', authMiddleware, resourceController.delete);
routes.put('/resource/:id', authMiddleware, resourceController.update);

// ResourceType
routes.post('/resourcetype', authMiddleware, resourceTypeController.create);
routes.get('/resourcetype', authMiddleware, resourceTypeController.getAll);
routes.delete('/resourcetype/:id', authMiddleware, resourceTypeController.delete);
routes.put('/resourcetype/:id', authMiddleware, resourceTypeController.update);

// Resource Operation
routes.post('/resourceoperation', authMiddleware, resourceOperationController.create);
routes.get('/resourceoperation', authMiddleware, resourceOperationController.getAll);
routes.put('/resource/:rid/operation/:oid', authMiddleware, resourceOperationController.update);
routes.delete('/resource/:rid/operation/:oid', authMiddleware, resourceOperationController.delete);
routes.delete('/resourceoperation/operation/:oid', authMiddleware, resourceOperationController.deleteAllWithOperationId);
routes.get('/resourceoperation/resource/:rid', authMiddleware, resourceOperationController.getAllFromResource);
routes.get('/resourceoperation/operation/:oid', authMiddleware, resourceOperationController.getAllFromOperation);


module.exports = { routes };
