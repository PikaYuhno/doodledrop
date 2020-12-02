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
         *
        */

        const generateDoodle = (id) => {
            return {
                user_id: id,
                title: faker.lorem.slug(),
                image_path: faker.image.imageUrl()
            }
        }

        let doodles = [
            generateDoodle(5),
            generateDoodle(4),
            generateDoodle(5),
            generateDoodle(1),
            generateDoodle(9),
            generateDoodle(10),
            generateDoodle(8),
            generateDoodle(6),
            generateDoodle(5),
            generateDoodle(4),
        ];
        await queryInterface.bulkInsert('doodles', doodles, {});

    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('doodles', null, {});
    }
};
