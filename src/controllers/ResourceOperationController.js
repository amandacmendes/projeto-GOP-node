const { HttpHelper } = require('../utils/http-helper');
const { ResourceOperationModel } = require('../app/models/resourceoperation');

class ResourceOperationController {

    async create(request, response) {
        try {

            const {
                resource_id,
                operation_id
            } = request.body;

            // Cria link entre Recurso e Operação Policial
            const resource_operation = await ResourceOperationModel.create({
                resource_id,
                operation_id
            });

            return response.status(201).json(resource_operation);

        } catch (error) {
            return response.status(500).json({
                error: `Erro interno: ${error}`
            })
        }
    }

    async getAll(request, response) {
        try {

            const resource_operations = await ResourceOperationModel.findAll()
                .then((data) => {
                    if (data) {
                        return response.status(200).json(data);
                    } else {
                        return response.status(204).json({ msg: "Não existem recursos cadastrados nesta operação." });
                    }
                });
        } catch (error) {
            return response.status(500).json({
                error: `Erro interno: ${error}`
            });
        }
    }

    /*
    '/resourceoperation/resource/:rid'    
    */
    async getAllFromResource(request, response) {
        try {
            const { rid } = request.params;

            const resource_operations = await ResourceOperationModel.findAll({
                where: { resource_id: rid }
            }).then((data) => {
                if (data) {
                    return response.status(200).json(data);
                } else {
                    return response.status(204).json({ msg: "Não existem dados cadastrados." });
                }
            });
        } catch (error) {
            return response.status(500).json({
                error: `Erro interno: ${error}`
            });
        }
    }

    /*
    '/resourceoperation/operation/:oid'
    */
    async getAllFromOperation(request, response) {
        try {
            const { oid } = request.params;

            const resources_operation = await ResourceOperationModel.findAll({
                where: { operation_id: oid }
            }).then((data) => {
                if (data) {
                    return response.status(200).json(data);
                } else {
                    return response.status(204).json({ msg: "Não existem dados cadastrados." });
                }
            });
        } catch (error) {
            return response.status(500).json({
                error: `Erro interno: ${error}`
            });
        }
    }

    async delete(request, response) {

        const httpHelper = new HttpHelper(response);

        try {

            const { rid, oid } = request.params;

            if (!oid || !rid) return httpHelper.badRequest('Parâmetros inválidos!');

            const resource_operation_Exists = await ResourceOperationModel.findOne({
                where: { resource_id: rid, operation_id: oid }
            });

            if (!resource_operation_Exists) return httpHelper.notFound('Registro não existe no sistema!');

            await ResourceOperationModel.destroy({ where: { resource_id: rid, operation_id: oid } });

            return httpHelper.ok({
                message: 'Recurso desvinculado de Operação com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(`Erro interno: ${error}`);
        }
    }

    async update(request, response) {

        const httpHelper = new HttpHelper(response);

        try {

            const { rid, oid } = request.params;

            const {
                resource_id,
                operation_id
            } = request.body;

            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

            const resource_operation_Exists = await ResourceOperationModel.findOne({
                where: { resource_id: rid, operation_id: oid }
            });

            if (!resource_operation_Exists) return httpHelper.notFound('Registro não existe no sistema!');

            await ResourceOperationModel.update({
                resource_id,
                operation_id
            }, {
                where: { resource_id: rid, operation_id: oid }
            });

            return httpHelper.ok({
                message: 'Operação atualizada com sucesso!'
            });

        } catch (error) {
            return httpHelper.internalError(`Erro interno: ${error}`);
        }
    }

}

module.exports = { ResourceOperationController }