const db = require('../config/db_sequelize');

async function cadastrarUsuario(req, res) {
    try {
        const usuario = await db.Usuario.create(req.body);
        res.status(201).json(usuario);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
}

async function listarUsuarios(req, res) {
    try {
        const usuarios = await db.Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao listar usuários' });
    }
}

async function buscarUsuario(req, res) {
    try {
        const usuario = await db.Usuario.findByPk(req.params.id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
}

async function atualizarUsuario(req, res) {
    try {
        const [updated] = await db.Usuario.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedUsuario = await db.Usuario.findByPk(req.params.id);
            res.status(200).json(updatedUsuario);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
}

async function deletarUsuario(req, res) {
    try {
        const deleted = await db.Usuario.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
}

module.exports = {
    cadastrarUsuario,
    listarUsuarios,
    buscarUsuario,
    atualizarUsuario,
    deletarUsuario
};
