const { OfficerModel } = require('../app/models/officer');
const { OfficerOperationModel } = require('../app/models/officeroperation');
const { OperationModel } = require('../app/models/operation');
const { HttpHelper } = require('../utils/http-helper');

class OperationController {

    async create(request, response) {
        try {

            const {
                operation_name,
                operation_place,
                operation_planned_date,
                operation_date,
                lead_officer_id,
                status,
                operation_results_deaths,
                operation_results_arrests,
                operation_results_report,
                operation_results_seizures
            } = request.body;

            // Cria Operação Policial
            const operation = await OperationModel.create({
                operation_name,
                operation_place,
                operation_planned_date,
                operation_date,
                lead_officer_id,
                status,
                operation_results_deaths,
                operation_results_arrests,
                operation_results_report,
                operation_results_seizures
            });

            return response.status(201).json(operation);

        } catch (error) {
            return response.status(500).json({
                error: `Erro interno: ${error}`
            })
        }
    }

    async getAll(request, response) {
        try {
            const operations = await OperationModel.findAll()
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

    async getById(request, response) {
        const httpHelper = new HttpHelper(response);

        try {
            const { id } = request.params;

            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

            const operation = await OperationModel.findOne({
                where: { id }
            })
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

    // routes.get('/operation/leadofficer/:id', operationController.getByLeadOfficerId);
    async getByLeadOfficerId(request, response) {
        const httpHelper = new HttpHelper(response);

        try {
            const { id } = request.params;

            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

            const operation = await OperationModel.findAll({
                where: { lead_officer_id: id }
            })
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

    async delete(request, response) {

        const httpHelper = new HttpHelper(response);

        try {

            const { id } = request.params;

            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

            const operationExists = await OperationModel.findOne({ where: { id } });

            if (!operationExists) return httpHelper.notFound('Operação não existe no sistema!');

            await OperationModel.destroy({ where: { id } });

            return httpHelper.ok({
                message: 'Operação deletada com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(`Erro interno: ${error}`);
        }
    }

    async update(request, response) {

        const httpHelper = new HttpHelper(response);

        try {

            const { id } = request.params;
            const {
                operation_name,
                operation_place,
                operation_planned_date,
                operation_date,
                lead_officer_id,
                status,
                operation_results_deaths,
                operation_results_arrests,
                operation_results_report,
                operation_results_seizures
            } = request.body;

            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

            const operationExists = await OperationModel.findByPk(id);

            if (!operationExists) return httpHelper.notFound('Operação não encontrada!');

            await OperationModel.update({
                operation_name,
                operation_place,
                operation_planned_date,
                operation_date,
                lead_officer_id,
                status,
                operation_results_deaths,
                operation_results_arrests,
                operation_results_report,
                operation_results_seizures
            }, {
                where: { id }
            });

            return httpHelper.ok({
                message: 'Operação atualizada com sucesso!'
            });

        } catch (error) {
            return httpHelper.internalError(`Erro interno: ${error}`);
        }
    }

}

module.exports = { OperationController }