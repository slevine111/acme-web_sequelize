const app = require('./app')
const db = require('./db')

db.seedData()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
