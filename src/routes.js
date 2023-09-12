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

// Users
routes.post('/signup', userController.signup);
routes.post('/signin', userController.signin);

// Officer
routes.post('/officer', authMiddleware, officerController.create);
routes.get('/officer', authMiddleware, officerController.getAll);
routes.delete('/officer/:id', authMiddleware, officerController.delete);
routes.put('/officer/:id', authMiddleware, officerController.update);

// Team
routes.post('/team', authMiddleware, teamController.create);
routes.get('/team', authMiddleware, teamController.getAll);
routes.delete('/team/:id', authMiddleware, teamController.delete);
routes.put('/team/:id', authMiddleware, teamController.update);

// Operation
routes.post('/operation', authMiddleware, operationController.create);
routes.get('/operation', authMiddleware, operationController.getAll);
routes.delete('/operation/:id', authMiddleware, operationController.delete);
routes.put('/operation/:id', authMiddleware, operationController.update);

// OfficerOperation
routes.post('/officeroperation', authMiddleware, officerOperationController.create);
routes.get('/officeroperation', authMiddleware, officerOperationController.getAll);
routes.put('/officer/:ofid/operation/:oid', authMiddleware, officerOperationController.update);
routes.delete('/officer/:ofid/operation/:oid', authMiddleware, officerOperationController.delete);
routes.get('/officeroperation/officer/:ofid', authMiddleware, officerOperationController.getAllFromOfficer);
routes.get('/officeroperation/operation/:oid', authMiddleware, officerOperationController.getAllFromOperation);

// Reason
routes.post('/reason', authMiddleware, reasonController.create);
routes.get('/reason', authMiddleware, reasonController.getAll);
routes.get('/reason/:oid', authMiddleware, reasonController.getAllByOperationId);
routes.delete('/reason/:id', authMiddleware, reasonController.delete);
routes.put('/reason/:id', authMiddleware, reasonController.update);

// ReasonType
routes.post('/reasontype', authMiddleware, reasonTypeController.create);
routes.get('/reasontype', authMiddleware, reasonTypeController.getAll);
routes.delete('/reasontype/:id', authMiddleware, reasonTypeController.delete);
routes.put('/reasontype/:id', authMiddleware, reasonTypeController.update);

// Resource
routes.post('/resource', authMiddleware, resourceController.create);
routes.get('/resource', authMiddleware, resourceController.getAll);
routes.delete('/resource/:id', authMiddleware, resourceController.delete);
routes.put('/resource/:id', authMiddleware, resourceController.update);

// ResourceType
routes.post('/resourcetype', authMiddleware, resourceTypeController.create);
routes.get('/resourcetype', authMiddleware, resourceTypeController.getAll);
routes.delete('/resourcetype/:id', authMiddleware, resourceTypeController.delete);
routes.put('/resourcetype/:id', authMiddleware, resourceTypeController.update);


module.exports = { routes };
