const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { UserModel } = require('../../models/user-model');
const { TOKEN_SECRET, SALT } = require('../../../environments');

/**
 * Criar usuário e retorna um token de acesso
 */
class SignupUserController {
    async signup(request, response) {
        try {
            const { name, password } = request.body;

            // Validar parâmetros
            if (!name || !password) {
                return response.status(400).json({
                    error: 'Nome e senha são obrigatórios!'
                });
            }

            // Criptografa senha
            const passwordHashed = await bcrypt.hash(password, SALT);

            // Cria usuário
            const user = await UserModel.create({
                name,
                password: passwordHashed,
            });

            if (!user) {
                return response.status(400).json({
                    error: 'Houve um erro ao criar usuário'
                });
            }

            // Gera e retorna access token
            const accessToken = jwt.sign(
                { id: user.id },
                TOKEN_SECRET,
                { expiresIn: '30m' }
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

module.exports = new SignupUserController();
