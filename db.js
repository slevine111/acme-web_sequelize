const connection = require('./connection')
const Page = require('./models/Page')
const Content = require('./models/Content')

const dbInit = () => {
  return connection
    .authenticate()
    .then(() => {
      Page.Content = Page.hasMany(Content)
      Content.belongsTo(Page)
    })
    .then(() => connection.sync())
}

const seedData = () => {
  dbInit()
    .then(() => {
      const createPages = Promise.all([
        Page.create({
          name: 'Home',
          IsHomePage: true
        }),
        Page.create({ name: 'Employees', IsHomePage: false }),
        Page.create({ name: 'Contact', IsHomePage: false })
      ])

      const createContent = Promise.all([
        Content.create({
          name: 'Welcome to the Home Page',
          body: 'So looking forward to having you browser our site'
        }),
        Content.create({
          name: 'Moe',
          body: 'Moe is our CEO!!!'
        }),
        Content.create({
          name: 'Larry',
          body: 'Larry is out CTO!!!'
        }),
        Content.create({
          name: 'Curly',
          body: 'Curly is our COO!!!'
        }),
        Content.create({
          name: 'Phone',
          body: 'call us 212-555-1212'
        }),
        Content.create({
          name: 'Fax',
          body: 'fax us 212-555-1212'
        })
      ])

      return Promise.all([createPages, createContent])
    })
    .then(([pages, content]) => {
      pages[0].setContents(content[0])
      pages[1].setContents(content.slice(1, 4))
      pages[2].setContents(content.slice(4))
    })
}

const getAllPagesInfo = () => {
  return Page.findAll().then(pages => {
    return pages.map(({ id, name, IsHomePage }) => ({
      id,
      name,
      IsHomePage
    }))
  })
}

const getPageContent = pageId => {
  return Content.findAll({ where: { pageId } }).then(items => {
    return items.map(({ name, body }) => ({
      name,
      body
    }))
  })
}

module.exports = {
  seedData,
  getAllPagesInfo,
  getPageContent
}
