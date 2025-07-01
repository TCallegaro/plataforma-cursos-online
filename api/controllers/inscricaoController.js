const db = require('../config/db_sequelize');

async function inscreverAluno(req, res) {
    try {
        const usuarioId = req.user?.id;
        const { cursoId } = req.body;

        if (!usuarioId) {
            return res.status(400).json({ error: "Usuário não autenticado" });
        }

        const inscricao = await db.Inscricao.create({ usuarioId, cursoId });
        console.log("✅ Aluno inscrito:", inscricao);
        res.status(201).json(inscricao);
    } catch (err) {
        console.error("❌ Erro ao inscrever aluno:", err);
        res.status(500).json({ error: "Erro ao inscrever no curso" });
    }
}

async function listarInscricoes(req, res) {
    try {
        const usuarioId = req.user?.id;
        console.log("🔍 Buscando inscrições do usuário:", usuarioId);

        const inscricoes = await db.Inscricao.findAll({
            where: { usuarioId },
            include: [{ model: db.Curso }]
        });

        console.log("🔍 Inscrições retornadas:", inscricoes);
        res.status(200).json(inscricoes);
    } catch (err) {
        console.error("❌ Erro ao listar inscrições:", err);
        res.status(500).json({ error: "Erro ao listar suas inscrições" });
    }
}

async function buscarInscricao(req, res) {
    try {
        const inscricao = await db.Inscricao.findByPk(req.params.id, {
            include: [{ model: db.Curso }]
        });
        if (inscricao) {
            res.status(200).json(inscricao);
        } else {
            res.status(404).json({ error: 'Inscrição não encontrada' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar inscrição' });
    }
}

async function atualizarInscricao(req, res) {
    try {
        const [updated] = await db.Inscricao.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedInscricao = await db.Inscricao.findByPk(req.params.id);
            res.status(200).json(updatedInscricao);
        } else {
            res.status(404).json({ error: 'Inscrição não encontrada' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar inscrição' });
    }
}

async function deletarInscricao(req, res) {
    try {
        const deleted = await db.Inscricao.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Inscrição não encontrada' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar inscrição' });
    }
}

module.exports = {
    inscreverAluno,
    listarInscricoes,
    buscarInscricao,
    atualizarInscricao,
    deletarInscricao
};
