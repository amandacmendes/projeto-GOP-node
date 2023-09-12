const { HttpHelper } = require('../utils/http-helper');
const { ReasonTypeModel } = require('../app/models/reasontype');

class ReasonTypeController {

    async create(request, response) {
        try {

            const { description } = request.body;

            if (!description) {
                return response.status(400).json({
                    error: 'Campos obrigatórios não foram preenchidos.'
                });
            }

            const reasonType = await ReasonTypeModel.create({
                description
            });

            return response.status(201).json(reasonType);

        } catch (error) {
            return response.status(500).json({
                error: `Erro interno: ${error}`
            })
        }
    }

    async getAll(request, response) {
        try {
            const reasonTypes = await ReasonTypeModel.findAll()
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

            const reasonTypeExists = await ReasonTypeModel.findOne({ where: { id } });

            if (!reasonTypeExists) return httpHelper.notFound('Objeto não encontrado!');

            await ReasonTypeModel.destroy({ where: { id } });

            return httpHelper.ok({
                message: 'Tipo de motivação deletada com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(`Erro interno: ${error}`);
        }
    }

    async update(request, response) {

        const httpHelper = new HttpHelper(response);

        try {

            const { id } = request.params;
            const { description } = request.body;

            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

            const reasonTypeExists = await ReasonTypeModel.findByPk(id);

            if (!reasonTypeExists) return httpHelper.notFound('Objeto não encontrado!');

            await ReasonTypeModel.update({
                description
            }, {
                where: { id }
            });

            return httpHelper.ok({
                message: 'Tipo de motivação alterada com sucesso!'
            });

        } catch (error) {
            return httpHelper.internalError(`Erro interno: ${error}`);
        }
    }

}

module.exports = { ReasonTypeController }