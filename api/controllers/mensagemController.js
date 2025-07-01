const db = require('../config/database');

module.exports = {
    async criarMensagem(req, res) {
        try {
            const mensagem = await db.Mensagem.create(req.body);
            res.status(201).json(mensagem);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao criar mensagem' });
        }
    },
    async listarMensagens(req, res) {
        try {
            const mensagens = await db.Mensagem.findAll();
            res.status(200).json(mensagens);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao listar mensagens' });
        }
    },
    async buscarMensagem(req, res) {
        try {
            const mensagem = await db.Mensagem.findByPk(req.params.id);
            if (mensagem) {
                res.status(200).json(mensagem);
            } else {
                res.status(404).json({ error: 'Mensagem não encontrada' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao buscar mensagem' });
        }
    },
    async atualizarMensagem(req, res) {
        try {
            const [updated] = await db.Mensagem.update(req.body, { where: { id: req.params.id } });
            if (updated) {
                const updatedMensagem = await db.Mensagem.findByPk(req.params.id);
                res.status(200).json(updatedMensagem);
            } else {
                res.status(404).json({ error: 'Mensagem não encontrada' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao atualizar mensagem' });
        }
    },
    async deletarMensagem(req, res) {
        try {
            const deleted = await db.Mensagem.destroy({ where: { id: req.params.id } });
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Mensagem não encontrada' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao deletar mensagem' });
        }
    }
};
