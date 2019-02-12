const connection = require('../connection')

const Content = connection.define('content', {
  name: {
    type: connection.Sequelize.TEXT,
    allowNull: false
  },
  body: {
    type: connection.Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Content
