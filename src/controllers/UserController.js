const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../app/models/user');
const OfficerModel = require('../app/models/officer');
const { TOKEN_SECRET, SALT } = require('../../environments');


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
                    error: 'Senha incorreta!'
                });
            }

            // Gera token de acesso
            const accessToken = jwt.sign(
                { id: userExists.id },
                TOKEN_SECRET,
                { expiresIn: '30m' }
            );

            return response.status(200).json({
                accessToken
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

            // Gera e retorna access token
            const accessToken = jwt.sign(
                { id: user.id },
                TOKEN_SECRET,
                { expiresIn: '120m' }
            );

            return response.status(201).json({
                accessToken
            });

        } catch (error) {
            return response.status(500).json({
                error: `Erro interno: ${error}`
            });
        }
    }


}

module.exports = new UserController();
