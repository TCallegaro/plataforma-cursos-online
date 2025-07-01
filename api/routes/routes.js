const express = require('express');
const { authenticateToken } = require('../middleware/authenticateToken');

const usuarioController = require('../controllers/usuarioController');
const authController = require('../controllers/authController');
const cursoController = require('../controllers/cursoController');
const moduloController = require('../controllers/moduloController');
const inscricaoController = require('../controllers/inscricaoController');
const progressoController = require('../controllers/progressoController');
const mensagemController = require('../controllers/mensagemController');

const router = express.Router();

// Login (sem autenticação)
router.post('/login', authController.login);

// Cadastro de usuário (sem autenticação)
router.post('/usuarios', usuarioController.cadastrarUsuario);

// CRUD Usuário (com autenticação)
router.get('/usuarios', authenticateToken, usuarioController.listarUsuarios);
router.get('/usuarios/:id', authenticateToken, usuarioController.buscarUsuario);
router.put('/usuarios/:id', authenticateToken, usuarioController.atualizarUsuario);
router.delete('/usuarios/:id', authenticateToken, usuarioController.deletarUsuario);

// CRUD Curso (somente instrutores podem criar, mas aqui só autenticado)
router.post('/cursos', authenticateToken, cursoController.criarCurso);
router.get('/cursos', authenticateToken, cursoController.listarCursos);
router.get('/cursos/:id', authenticateToken, cursoController.buscarCurso);
router.put('/cursos/:id', authenticateToken, cursoController.atualizarCurso);
router.delete('/cursos/:id', authenticateToken, cursoController.deletarCurso);

// CRUD Módulo
router.post('/modulos', authenticateToken, moduloController.criarModulo);
router.get('/modulos', authenticateToken, moduloController.listarModulos);
router.get('/modulos/:id', authenticateToken, moduloController.buscarModulo);
router.put('/modulos/:id', authenticateToken, moduloController.atualizarModulo);
router.delete('/modulos/:id', authenticateToken, moduloController.deletarModulo);

// CRUD Inscrição
router.post('/inscricoes', authenticateToken, inscricaoController.inscreverAluno);
router.get('/inscricoes', authenticateToken, inscricaoController.listarInscricoes);
router.get('/inscricoes/:id', authenticateToken, inscricaoController.buscarInscricao);
router.put('/inscricoes/:id', authenticateToken, inscricaoController.atualizarInscricao);
router.delete('/inscricoes/:id', authenticateToken, inscricaoController.deletarInscricao);

// CRUD Progresso
router.post('/progresso', authenticateToken, progressoController.registrarProgresso);
router.get('/progresso', authenticateToken, progressoController.listarProgresso);
router.get('/progresso/:id', authenticateToken, progressoController.buscarProgresso);
router.put('/progresso/:id', authenticateToken, progressoController.atualizarProgresso);
router.delete('/progresso/:id', authenticateToken, progressoController.deletarProgresso);

// CRUD Mensagem
router.post('/mensagens', authenticateToken, mensagemController.criarMensagem);
router.get('/mensagens', authenticateToken, mensagemController.listarMensagens);
router.get('/mensagens/:id', authenticateToken, mensagemController.buscarMensagem);
router.put('/mensagens/:id', authenticateToken, mensagemController.atualizarMensagem);
router.delete('/mensagens/:id', authenticateToken, mensagemController.deletarMensagem);

module.exports = router;
