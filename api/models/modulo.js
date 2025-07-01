module.exports = (sequelize, DataTypes) => {
    const Modulo = sequelize.define('Modulo', {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        conteudo: {
            type: DataTypes.TEXT
        },
        cursoId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Modulo.associate = (models) => {
        Modulo.belongsTo(models.Curso, { foreignKey: 'cursoId' });
        Modulo.hasMany(models.Progresso, { foreignKey: 'moduloId' });
    };

    return Modulo;
};
