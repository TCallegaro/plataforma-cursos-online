const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.log("❌ Token não fornecido no header Authorization");
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error("❌ Token inválido ou expirado:", err);
            return res.status(403).json({ error: 'Token inválido' });
        }

        console.log("🔍 Token decodificado com sucesso:", decoded);
        req.user = decoded;  // assim req.user.id, req.user.email, req.user.tipo_usuario ficam disponíveis
        next();
    });
}

module.exports = {
    authenticateToken
};
