

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [6, 128],
                notEmpty: true,
            },
        },
        username: {
            type: Sequelize.STRING,
            defaultValue: 'test',
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};
