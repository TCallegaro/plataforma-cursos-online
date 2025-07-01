const Sequelize = require('sequelize');

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


module.exports = db;
