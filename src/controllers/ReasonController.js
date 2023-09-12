const { HttpHelper } = require('../utils/http-helper');
const { ReasonModel } = require('../app/models/reason');

class ReasonController {

    async create(request, response) {
        try {

            const { description, reasontype_id, operation_id } = request.body;

            if (!description || !operation_id) {
                return response.status(400).json({
                    error: 'Campos obrigatórios não foram preenchidos.'
                });
            }

            const reason = await ReasonModel.create({
                description, reasontype_id, operation_id
            });

            return response.status(201).json(reason);

        } catch (error) {
            return response.status(500).json({
                error: `Erro interno: ${error}`
            })
        }
    }

    async getAll(request, response) {
        try {

            const reasons = await ReasonModel.findAll()
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

    async getAllByOperationId(request, response) {
        try {
            const { oid } = request.params;

            const reasons = await ReasonModel.findAll({ where: { operation_id: oid } })
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

            const reasonExists = await ReasonModel.findOne({ where: { id } });

            if (!reasonExists) return httpHelper.notFound('Objeto não encontrado!');

            await ReasonModel.destroy({ where: { id } });

            return httpHelper.ok({
                message: 'Motivação deletada com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(`Erro interno: ${error}`);
        }
    }

    async update(request, response) {

        const httpHelper = new HttpHelper(response);

        try {

            const { id } = request.params;
            const { description, reasontype_id, operation_id } = request.body;

            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

            const reasonExists = await ReasonModel.findByPk(id);

            if (!reasonExists) return httpHelper.notFound('Valor não encontrado!');

            await ReasonModel.update({
                description, reasontype_id, operation_id
            }, {
                where: { id }
            });

            return httpHelper.ok({
                message: 'Motivação alterada com sucesso!'
            });

        } catch (error) {
            return httpHelper.internalError(`Erro interno: ${error}`);
        }
    }

}

module.exports = { ReasonController }