module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Articles', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'user_id',
        },
        title: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                len: [0, 50],
            },
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        contentHTML: {
            type: Sequelize.TEXT,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Articles'),
};
