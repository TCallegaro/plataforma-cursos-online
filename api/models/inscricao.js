module.exports = (sequelize, DataTypes) => {
    const Inscricao = sequelize.define('Inscricao', {
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cursoId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Inscricao.associate = (models) => {
        Inscricao.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
        Inscricao.belongsTo(models.Curso, { foreignKey: 'cursoId' });
    };

    return Inscricao;
};
