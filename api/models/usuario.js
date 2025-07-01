module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tipo_usuario: {
            type: DataTypes.ENUM('aluno', 'instrutor'),
            allowNull: false
        }
    });

    Usuario.associate = (models) => {
        Usuario.hasMany(models.Curso, { foreignKey: 'id_instrutor' });
        Usuario.hasMany(models.Inscricao, { foreignKey: 'usuarioId' });
        Usuario.hasMany(models.Progresso, { foreignKey: 'usuarioId' });
        Usuario.hasMany(models.Mensagem, { foreignKey: 'usuarioId' });
    };

    return Usuario;
};
