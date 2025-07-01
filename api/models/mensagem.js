module.exports = (sequelize, DataTypes) => {
    const Mensagem = sequelize.define('Mensagem', {
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cursoId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        texto: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    Mensagem.associate = (models) => {
        Mensagem.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
        Mensagem.belongsTo(models.Curso, { foreignKey: 'cursoId' });
    };

    return Mensagem;
};
