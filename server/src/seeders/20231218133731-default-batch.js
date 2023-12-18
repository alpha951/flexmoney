"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "batches",
      [
        {
          startTiming: "5PM",
          endTiming: "6PM",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startTiming: "6PM",
          endTiming: "7PM",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startTiming: "7PM",
          endTiming: "8PM",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startTiming: "8PM",
          endTiming: "9PM",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("batches", null, {});
  },
};
