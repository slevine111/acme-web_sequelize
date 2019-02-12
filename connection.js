const Sequelize = require('sequelize')

const connectipn = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  define: {
    freezeTableName: true
  }
})

module.exports = connectipn
