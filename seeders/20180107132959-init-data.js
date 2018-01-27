
module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [{
            username: 'milo',
            password: '3c439553528ddb60aef490b655bff3bcb61a209d',
            createdAt: new Date(),
            updatedAt: new Date(),
        }], {});

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    },

    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    },
};
