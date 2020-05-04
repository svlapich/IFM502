"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("logs", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      type: {
        type: Sequelize.ENUM("debug", "info", "warning", "error", "fatal"),
        allowNull: false
      },
      code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      message: {
        type: Sequelize.STRING,
        allowNull: true
      },
      details: {
        type: Sequelize.JSON,
        allowNull: true
      }
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable("logs");
  }
};
