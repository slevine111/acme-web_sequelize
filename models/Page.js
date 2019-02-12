const connection = require('../connection')

const Page = connection.define('page', {
  name: {
    type: connection.Sequelize.TEXT,
    allowNull: false
  },
  IsHomePage: {
    type: connection.Sequelize.BOOLEAN,
    allowNull: false
  }
})

module.exports = Page
