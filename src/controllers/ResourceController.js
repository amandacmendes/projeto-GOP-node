const { HttpHelper } = require('../utils/http-helper');
const { ResourceModel } = require('../app/models/resource');

class ResourceController {

    async create(request, response) {
        try {

            const { description, resourcetype_id } = request.body;

            if (!description || !resourcetype_id) {
                return response.status(400).json({
                    error: 'Campos obrigatórios não foram preenchidos.'
                });
            }

            const resource = await ResourceModel.create({
                description, resourcetype_id
            });

            return response.status(201).json(resource);

        } catch (error) {
            return response.status(500).json({
                error: `Erro interno: ${error}`
            })
        }
    }

    async getAll(request, response) {
        try {

            const resources = await ResourceModel.findAll()
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
        try {
            const { id } = request.params;

            await ResourceModel.findOne({ where: { id } })
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

            const resourceExists = await ResourceModel.findOne({ where: { id } });

            if (!resourceExists) return httpHelper.notFound('Recurso não encontrado!');

            await ResourceModel.destroy({ where: { id } });

            return httpHelper.ok({
                message: 'Recurso deletado com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(`Erro interno: ${error}`);
        }
    }

    async update(request, response) {

        const httpHelper = new HttpHelper(response);

        try {

            const { id } = request.params;
            const { description, resourcetype_id } = request.body;

            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

            const resourceExists = await ResourceModel.findByPk(id);

            if (!resourceExists) return httpHelper.notFound('Recurso não encontrado!');

            await ResourceModel.update({
                description, resourcetype_id
            }, {
                where: { id }
            });

            return httpHelper.ok({
                message: 'Recurso alterado com sucesso!'
            });

        } catch (error) {
            return httpHelper.internalError(`Erro interno: ${error}`);
        }
    }

}

module.exports = { ResourceController }