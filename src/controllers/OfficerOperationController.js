const { OfficerOperationModel } = require('../app/models/officeroperation');
const { HttpHelper } = require('../utils/http-helper');

class OfficerOperationController {

    async create(request, response) {
        try {

            const {
                officer_id,
                operation_id
            } = request.body;

            // Cria link entre Oficial e Operação Policial
            const officer_operation = await OfficerOperationModel.create({
                officer_id,
                operation_id
            });

            return response.status(201).json(officer_operation);

        } catch (error) {
            return response.status(500).json({
                error: `Erro interno: ${error}`
            })
        }
    }

    async getAll(request, response) {
        try {

            const officer_operations = await OfficerOperationModel.findAll()
                .then((data) => {
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
    '/officeroperation/officer/:ofid'    
    */
    async getAllFromOfficer(request, response) {
        try {
            const { ofid } = request.params;

            const officer_operations = await OfficerOperationModel.findAll({
                where: { officer_id: ofid }
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
    '/officeroperation/operation/:oid'
    */
    async getAllFromOperation(request, response) {
        try {
            const { oid } = request.params;

            const officer_operations = await OfficerOperationModel.findAll({
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

            const { ofid, oid } = request.params;

            if (!oid || !ofid) return httpHelper.badRequest('Parâmetros inválidos!');

            const officer_operation_Exists = await OfficerOperationModel.findOne({
                where: { officer_id: ofid, operation_id: oid }
            });

            if (!officer_operation_Exists) return httpHelper.notFound('Registro não existe no sistema!');

            await OfficerOperationModel.destroy({ where: { officer_id: ofid, operation_id: oid } });

            return httpHelper.ok({
                message: 'Operação desvinculada de policial com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(`Erro interno: ${error}`);
        }
    }

    async deleteAllWithOperationId(request, response) {

        const httpHelper = new HttpHelper(response);

        try {

            const { oid } = request.params;

            if (!oid) return httpHelper.badRequest('Parâmetros inválidos!');

            const officer_operation_Exists = await OfficerOperationModel.findOne({
                where: { operation_id: oid }
            });

            if (!officer_operation_Exists) return httpHelper.notFound('Registro não existe no sistema!');

            await OfficerOperationModel.destroy({ where: { operation_id: oid } });

            return httpHelper.ok({
                message: 'Todos policiais desvinculados de operação com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(`Erro interno: ${error}`);
        }
    }

    async update(request, response) {

        const httpHelper = new HttpHelper(response);

        try {

            const { ofid, oid } = request.params;

            const {
                officer_id,
                operation_id
            } = request.body;

            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

            const officer_operation_Exists = await OfficerOperationModel.findOne({
                where: { officer_id: ofid, operation_id: oid }
            });

            if (!officer_operation_Exists) return httpHelper.notFound('Registro não existe no sistema!');

            await OfficerOperationModel.update({
                officer_id,
                operation_id
            }, {
                where: { officer_id: ofid, operation_id: oid }
            });

            return httpHelper.ok({
                message: 'Operação atualizada com sucesso!'
            });

        } catch (error) {
            return httpHelper.internalError(`Erro interno: ${error}`);
        }
    }

}

module.exports = { OfficerOperationController }