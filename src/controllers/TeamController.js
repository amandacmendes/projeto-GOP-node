const { HttpHelper } = require('../utils/http-helper');
const { TeamModel } = require('../app/models/team');

class TeamController {

    /**
     * Cria  e retorna equipe
     */
    async create(request, response) {
        try {
            const team_name = request.body['team_name'];
            const status = request.body['status'];

            // Verifica dados
            if (!team_name) {
                return response.status(400).json({
                    error: 'Nome da equipe é obrigatório.'
                });
            }

            // Cria equipe
            const team = await TeamModel.create({
                team_name: team_name, status: status
            });

            return response.status(201).json(team);

        } catch (error) {
            return response.status(500).json({
                error: `Erro interno: ${error}`
            })
        }
    }

    async getAll(request, response) {
        try {

            const teams = await TeamModel.findAll()
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

            const teamExisits = await TeamModel.findOne({ where: { id } });

            if (!teamExisits) return httpHelper.notFound('Equipe não encontrada!');

            // SET OPTIONS PARANOID:TRUE AND TIMESTAMPS: TRUE ON TEAMMODEL TO SOFTDELETE A TEAM.
            await TeamModel.destroy({ where: { id } });

            return httpHelper.ok({
                message: 'equipe deletado com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async update(request, response) {

        const httpHelper = new HttpHelper(response);

        try {

            const { id } = request.params;
            const { name, status } = request.body;

            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

            const officerExists = await TeamModel.findByPk(id);

            if (!officerExists) return httpHelper.notFound('equipe não encontrado!');

            await TeamModel.update({
                name, status
            }, {
                where: { id }
            });

            return httpHelper.ok({
                message: 'equipe atualizado com sucesso!'
            });

        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

}

module.exports = { TeamController }