const db = require('../config/database');

module.exports = {
    async registrarProgresso(req, res) {
        try {
            const progresso = await db.Progresso.create(req.body);
            res.status(201).json(progresso);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao registrar progresso' });
        }
    },
    async listarProgresso(req, res) {
        try {
            const progresso = await db.Progresso.findAll();
            res.status(200).json(progresso);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao listar progresso' });
        }
    },
    async buscarProgresso(req, res) {
        try {
            const progresso = await db.Progresso.findByPk(req.params.id);
            if (progresso) {
                res.status(200).json(progresso);
            } else {
                res.status(404).json({ error: 'Progresso não encontrado' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao buscar progresso' });
        }
    },
    async atualizarProgresso(req, res) {
        try {
            const [updated] = await db.Progresso.update(req.body, { where: { id: req.params.id } });
            if (updated) {
                const updatedProgresso = await db.Progresso.findByPk(req.params.id);
                res.status(200).json(updatedProgresso);
            } else {
                res.status(404).json({ error: 'Progresso não encontrado' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao atualizar progresso' });
        }
    },
    async deletarProgresso(req, res) {
        try {
            const deleted = await db.Progresso.destroy({ where: { id: req.params.id } });
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Progresso não encontrado' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao deletar progresso' });
        }
    }
};
