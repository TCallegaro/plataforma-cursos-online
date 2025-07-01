const db = require('../config/db_sequelize');

async function criarModulo(req, res) {
    try {
        const modulo = await db.Modulo.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
            cursoId: req.body.cursoId
        });
        res.status(201).json(modulo);
    } catch (err) {
        console.error("❌ Erro ao criar módulo:", err);
        res.status(500).json({ error: 'Erro ao criar módulo' });
    }
}

async function listarModulos(req, res) {
    try {
        const modulos = await db.Modulo.findAll();
        res.status(200).json(modulos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao listar módulos' });
    }
}

async function buscarModulo(req, res) {
    try {
        const modulo = await db.Modulo.findByPk(req.params.id);
        if (modulo) {
            res.status(200).json(modulo);
        } else {
            res.status(404).json({ error: 'Módulo não encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar módulo' });
    }
}

async function atualizarModulo(req, res) {
    try {
        const [updated] = await db.Modulo.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedModulo = await db.Modulo.findByPk(req.params.id);
            res.status(200).json(updatedModulo);
        } else {
            res.status(404).json({ error: 'Módulo não encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar módulo' });
    }
}

async function deletarModulo(req, res) {
    try {
        const deleted = await db.Modulo.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Módulo não encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar módulo' });
    }
}

module.exports = {
    criarModulo,
    listarModulos,
    buscarModulo,
    atualizarModulo,
    deletarModulo
};
