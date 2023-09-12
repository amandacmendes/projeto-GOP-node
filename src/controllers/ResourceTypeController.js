const { HttpHelper } = require('../utils/http-helper');
const { ResourceTypeModel } = require('../app/models/resourcetype');

class ResourceTypeController {

    async create(request, response) {
        try {

            const { description } = request.body;

            if (!description) {
                return response.status(400).json({
                    error: 'Campos obrigatórios não foram preenchidos.'
                });
            }

            const resourcetype = await ResourceTypeModel.create({
                description
            });

            return response.status(201).json(resourcetype);

        } catch (error) {
            return response.status(500).json({
                error: `Erro interno: ${error}`
            })
        }
    }

    async getAll(request, response) {
        try {

            const resourcetypes = await ResourceTypeModel.findAll()
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

            const resourceTypeExists = await ResourceTypeModel.findOne({ where: { id } });

            if (!resourceTypeExists) return httpHelper.notFound('Tipo de recurso não encontrado!');

            await ResourceTypeModel.destroy({ where: { id } });

            return httpHelper.ok({
                message: 'Tipo de recurso deletado com sucesso!'
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

            const resourceTypeExists = await ResourceTypeModel.findByPk(id);

            if (!resourceTypeExists) return httpHelper.notFound('Tipo de recurso não encontrado!');

            await ResourceTypeModel.update({
                description
            }, {
                where: { id }
            });

            return httpHelper.ok({
                message: 'Tipo de recurso alterado com sucesso!'
            });

        } catch (error) {
            return httpHelper.internalError(`Erro interno: ${error}`);
        }
    }

}

module.exports = { ResourceTypeController }