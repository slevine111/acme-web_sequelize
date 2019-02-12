const app = require('./app')
const db = require('./db')

const PORT = process.env.PORT || 3000

db.seedData()
  .then(() => {
    app.listen(PORT, () => console.log(`listening on port ${PORT}`))
  })
  .catch(err => console.error(err))
