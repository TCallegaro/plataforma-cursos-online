module.exports = (sequelize, DataTypes) => {
    const Progresso = sequelize.define('Progresso', {
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        moduloId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING
        }
    });

    Progresso.associate = (models) => {
        Progresso.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
        Progresso.belongsTo(models.Modulo, { foreignKey: 'moduloId' });
    };

    return Progresso;
};
