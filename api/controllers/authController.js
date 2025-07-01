const jwt = require('jsonwebtoken');
const db = require('../config/db_sequelize');
const secretKey = 'your_secret_key';

module.exports = {
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const user = await db.Usuario.findOne({ where: { email } });
            
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            if (senha !== user.senha) {
                console.log("🔍 Senha incorreta: digitada =", senha, "esperada =", user.senha);
                return res.status(401).json({ error: 'Senha incorreta' });
            }

            const token = generateToken(user);
            res.status(200).json({
                token,
                tipo_usuario: user.tipo_usuario
            });
        } catch (err) {
            console.error("🔍 Erro geral:", err);
            res.status(500).json({ error: 'Erro ao fazer login' });
        }
    }
};

function generateToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        tipo_usuario: user.tipo_usuario
    }, secretKey, { expiresIn: '1h' });
}
