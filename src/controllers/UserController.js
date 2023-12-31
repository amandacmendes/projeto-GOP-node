const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET, SALT } = require('../../environments');
const { HttpHelper } = require('../utils/http-helper');

const { UserModel } = require('../app/models/user');
const { OfficerModel } = require('../app/models/officer');


class UserController {

    /**
     * Entra com o usuário e retorna um token de acesso
     */
    async signin(request, response) {
        try {
            const { email, password } = request.body;

            // Validar parâmetros
            if (!email || !password) {
                return response.status(400).json({
                    error: 'Email e senha são obrigatórios!'
                });
            }

            // Verifica se usuário existe
            const userExists = await UserModel.findOne({
                where: { email }
            });

            if (!userExists) {
                return response.status(400).json({
                    error: 'Usuario não existe!'
                });
            }

            // Verifica se a senha está correta
            const isPasswordValid = await bcrypt.compare(password, userExists.password);

            if (!isPasswordValid) {
                return response.status(400).json({
                    error: 'E-mail ou senha incorreta!'
                });
            }

            // Gera token de acesso
            const accessToken = jwt.sign(
                { id: userExists.id },
                TOKEN_SECRET,
                { expiresIn: '60m' }
            );

            return response.status(200).json({
                accessToken,
                id: userExists.id
            });

        } catch (error) {
            return response.status(500).json({
                error: `Erro interno: ${error}`
            });
        }
    }

    /**
     * Criar usuário e retorna um token de acesso
     */
    async signup(request, response) {
        try {
            const { email, password, name } = request.body;

            // Validar parâmetros
            if (!email || !password) {
                return response.status(400).json({
                    error: 'Email e senha são obrigatórios!'
                });
            }

            // Verifica se email já foi usado
            const emailExists = await UserModel.findOne({
                where: { email }
            });
            if (emailExists) {
                return response.status(400).json({
                    error: 'E-mail já cadastrado.'
                });
            }

            // Criptografa senha
            const passwordHashed = await bcrypt.hash(password, SALT);

            // Cria usuário
            const user = await UserModel.create({
                email,
                password: passwordHashed,
                status: 'A'
            });

            if (!user) {
                return response.status(400).json({
                    error: 'Houve um erro ao criar usuário'
                });
            }

            // Cria officer
            const officer = await OfficerModel.create({ name });

            // Atualiza usuario com officer_id
            user.update(
                {
                    officer_id: officer.id
                }, {
                where: { id: user.id }
            });

            // Gera e retorna access token
            const accessToken = jwt.sign(
                { id: user.id },
                TOKEN_SECRET,
                { expiresIn: '120m' }
            );

            return response.status(201).json({
                accessToken, id: user.id
            });

        } catch (error) {
            return response.status(500).json({
                error: `Erro interno: ${error}`
            });
        }
    }

    async getAll(request, response) {
        try {

            const users = await UserModel.findAll()
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
            await UserModel.findByPk(id)
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

            const userExists = await UserModel.findByPk(id);
            if (!userExists) return response.status(204).json({ msg: "Não existem dados cadastrados." });

            await UserModel.destroy({ where: { id } });

            return httpHelper.ok({
                message: 'Usuario excluido com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(`Erro interno: ${error}`);
        }
    }

    async update(request, response) {

        const httpHelper = new HttpHelper(response);

        try {

            const { id } = request.params;
            const { email, password, status, officer_id } = request.body;

            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

            const userExists = await UserModel.findByPk(id);
            if (!userExists) return response.status(204).json({ msg: "Não existem dados cadastrados." });

            // Criptografa senha
            const passwordHashed = await bcrypt.hash(password, SALT);

            await UserModel.update({
                email, password: passwordHashed, status
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

module.exports = { UserController };
