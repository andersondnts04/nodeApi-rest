'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   queryInterface.addColumn('Cliente','rg',{
    type: Sequelize.STRING,
    allowNull:true
     
  });
},

  async down (queryInterface, Sequelize) {
  
     await queryInterface.dropTable('Clientes', 'rg');
     
  }
};
