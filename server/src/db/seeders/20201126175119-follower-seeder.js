'use strict';

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
        const generateFollower = (u_id, f_id) => {
            return {
                user_id: u_id,
                follower_id: f_id
            }
        }

        const followers = [
            generateFollower(7, 3),
            generateFollower(6, 2),
            generateFollower(7, 1),
            generateFollower(2, 3),
            generateFollower(4, 5),
            generateFollower(1, 3),
            generateFollower(2, 8),
            generateFollower(1, 2),
            generateFollower(3, 12),
            generateFollower(1, 3),
        ];
        await queryInterface.bulkInsert('followers', followers, {});
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('followers', null, {});
    }
};
