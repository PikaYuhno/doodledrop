'use strict';
const bcrypt = require('bcrypt');
const faker = require('faker');
module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         *
         *
         */
        let users = [];
        for (let i = 0; i < 5; i++) {
            let username = faker.name.findName();
            let user = {
                username: username,
                first_name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                password: await bcrypt.hash("1234", 10),
                email: username.split(" ").join("") + "_" + Math.floor(Math.random() * Math.floor(10000)) + "@gmail.com",
                bio: faker.lorem.sentences(),
                location: faker.address.city()
            };
            users.push(user);
        }
        await queryInterface.bulkInsert('users', users, {});
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('users', null, {});
    }
};
