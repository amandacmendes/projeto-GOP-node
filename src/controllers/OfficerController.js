const { HttpHelper } = require('../utils/http-helper');
const { OfficerModel } = require('../app/models/officer');

class OfficerController {

    /**
     * Cria  e retorna policial
     */
    async create(request, response) {
        try {
            const name = request.body['name'];
            const team_id = request.body['team_id'];

            // Verifica dados
            if (!name) {
                return response.status(400).json({
                    error: 'Nome é obrigatório.'
                });
            }

            // Verifica se já existe cadastro do nome
            const officerNameAlreadyExists = await OfficerModel.findOne({
                where: { name }
            });

            if (officerNameAlreadyExists) {
                return response.status(400).json({
                    error: 'Nome já cadastrado no sistema. Verifique as informações.'
                });
            }

            // Cria Policial
            const officer = await OfficerModel.create({
                name: name, team_id: team_id
            });

            return response.status(201).json(officer);

        } catch (error) {
            return response.status(500).json({
                error: `Erro interno: ${error}`
            })
        }
    }

    async getAll(request, response) {
        try {

            const officers = await OfficerModel.findAll()
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

            const officerExists = await OfficerModel.findOne({ where: { id } });

            if (!officerExists) return httpHelper.notFound('Policial não encontrado!');

            await OfficerModel.destroy({ where: { id } });

            return httpHelper.ok({
                message: 'Policial deletado com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async update(request, response) {

        const httpHelper = new HttpHelper(response);

        try {

            const { id } = request.params;
            const { name, team_id } = request.body;

            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

            const officerExists = await OfficerModel.findByPk(id);

            if (!officerExists) return httpHelper.notFound('Policial não encontrado!');

            await OfficerModel.update({
                name, team_id
            }, {
                where: { id }
            });

            return httpHelper.ok({
                message: 'Policial atualizado com sucesso!'
            });

        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

}

module.exports = { OfficerController }