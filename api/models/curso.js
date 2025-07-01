module.exports = (sequelize, DataTypes) => {
    const Curso = sequelize.define('Curso', {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            type: DataTypes.TEXT
        },
        id_instrutor: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Curso.associate = (models) => {
        Curso.belongsTo(models.Usuario, { foreignKey: 'id_instrutor' });
        Curso.hasMany(models.Modulo, { foreignKey: 'cursoId' });
        Curso.hasMany(models.Inscricao, { foreignKey: 'cursoId' });
        Curso.hasMany(models.Mensagem, { foreignKey: 'cursoId' });
    };

    return Curso;
};
