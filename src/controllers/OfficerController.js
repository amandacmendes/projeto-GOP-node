const OfficerModel = require('../app/models/officer');

class OfficerController {

    /**
     * Cria  e retorna policial
     */
    async create(request, response) {
        try {
            const userId = request;
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
                name: name, team_id: team_id, userId: userId
            });

            return response.status(201).json(officer);

        } catch (error) {
            return response.status(500).json({
                error: `Erro interno: ${error}`
            })
        }
    }

    async read() {

    }

    async update() {

    }

    async delete() {

    }

}

module.exports = { OfficerController }