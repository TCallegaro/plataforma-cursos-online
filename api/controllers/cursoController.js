const db = require('../config/db_sequelize');

async function criarCurso(req, res) {
    try {
        console.log("🔍 Dados do instrutor:", req.user);
        const curso = await db.Curso.create({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            id_instrutor: req.user?.id
        });
        res.status(201).json(curso);
    } catch (err) {
        console.error("❌ Erro ao criar curso:", err);
        res.status(500).json({ error: 'Erro ao criar curso' });
    }
}

async function listarCursos(req, res) {
    try {
        const cursos = await db.Curso.findAll();
        res.status(200).json(cursos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao listar cursos' });
    }
}

async function buscarCurso(req, res) {
    try {
        const curso = await db.Curso.findByPk(req.params.id);
        if (curso) {
            res.status(200).json(curso);
        } else {
            res.status(404).json({ error: 'Curso não encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar curso' });
    }
}

async function atualizarCurso(req, res) {
    try {
        const [updated] = await db.Curso.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedCurso = await db.Curso.findByPk(req.params.id);
            res.status(200).json(updatedCurso);
        } else {
            res.status(404).json({ error: 'Curso não encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar curso' });
    }
}

async function deletarCurso(req, res) {
    try {
        const deleted = await db.Curso.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Curso não encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar curso' });
    }
}

module.exports = {
    criarCurso,
    listarCursos,
    buscarCurso,
    atualizarCurso,
    deletarCurso
};
