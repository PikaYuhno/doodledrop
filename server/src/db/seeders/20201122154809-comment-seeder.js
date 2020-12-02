'use strict';
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
        */
        const generateComment = (d_id, u_id) => {
            return {
                doodle_id: d_id,
                user_id: u_id,
                content: faker.lorem.sentence(),
                created_at: faker.date.past(),
            }
        }
        const comments = [
            generateComment(1, 9),
            generateComment(1, 12),
            generateComment(2, 2),
            generateComment(3, 2),
            generateComment(5, 8),
            generateComment(10, 14),
            generateComment(3, 5),
            generateComment(8, 15),
            generateComment(7, 4),
            generateComment(6, 13),
        ];
        await queryInterface.bulkInsert('comments', comments, {});
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('comments', null, {});
    }
};
