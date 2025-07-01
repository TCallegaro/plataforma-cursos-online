const  Sequelize  = require('sequelize');

const sequelize = new Sequelize('projeto_web2', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
});

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Usuario = require('../models/usuario.js')(sequelize, Sequelize);
db.Curso = require('../models/curso.js')(sequelize, Sequelize);
db.Inscricao = require('../models/inscricao.js')(sequelize, Sequelize);
db.Progresso = require('../models/progresso.js')(sequelize, Sequelize);
db.Mensagem = require('../models/mensagem.js')(sequelize, Sequelize);
db.Modulo = require('../models/modulo.js')(sequelize, Sequelize);

// Um Instrutor pode criar vários Cursos (1:N)
db.Usuario.hasMany(db.Curso, { foreignKey: 'id_instrutor' });
db.Curso.belongsTo(db.Usuario, { foreignKey: 'id_instrutor' });

// Um Curso pode ter vários Módulos (1:N)
db.Curso.hasMany(db.Modulo, { foreignKey: 'cursoId' });
db.Modulo.belongsTo(db.Curso, { foreignKey: 'cursoId' });

// Muitos Alunos podem se inscrever em muitos Cursos (N:N)
db.Usuario.belongsToMany(db.Curso, { through: db.Inscricao, foreignKey: 'usuarioId' });
db.Curso.belongsToMany(db.Usuario, { through: db.Inscricao, foreignKey: 'cursoId' });

// Um Aluno pode ter vários Progresso (em vários Módulos)
db.Usuario.hasMany(db.Progresso, { foreignKey: 'usuarioId' });
db.Progresso.belongsTo(db.Usuario, { foreignKey: 'usuarioId' });

db.Modulo.hasMany(db.Progresso, { foreignKey: 'moduloId' });
db.Progresso.belongsTo(db.Modulo, { foreignKey: 'moduloId' });

// Mensagens - Um Usuário pode postar várias mensagens em um Curso
db.Usuario.hasMany(db.Mensagem, { foreignKey: 'usuarioId' });
db.Mensagem.belongsTo(db.Usuario, { foreignKey: 'usuarioId' });

db.Curso.hasMany(db.Mensagem, { foreignKey: 'cursoId' });
db.Mensagem.belongsTo(db.Curso, { foreignKey: 'cursoId' });

module.exports = db;
