const express = require('express');
const routes = require('./routes/routes');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const secretKey = 'your_secret_key';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./config/database');
db.sequelize.sync({ alter: true })
  .then(() => console.log('Tabelas criadas/sincronizadas'))
  .catch(err => console.error('Erro ao sincronizar o banco:', err));

app.use('/api', routes);

app.listen(3000, function(){
    console.log("Servidor no http://localhost:3000");
});
