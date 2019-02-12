const morgan = require('morgan')
const express = require('express')
const app = express()
const { getAllPagesInfo, getPageContent } = require('./db')

const renderHTML = (pages, pageId, pageContent) => {
  return `<html>
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
            <link rel = "stylesheet" href="/static/styles.css">
            <title>Acme: ${
              pages.find(page => {
                return page.id === pageId
              }).name
            }</title>
            </head>
            <body>
            <h1>Acme Web</h1>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                ${pages
                  .map(page => {
                    return `<li class ="nav-iten">
                            <a class = "nav-link ${
                              page.id === pageId ? 'chosen-link' : ''
                            }" href="/pages/${page.id}">${page.name}</a>
                          </li>`
                  })
                  .join('')}
                </ul>
              </div>
            </nav>
            ${pageContent
              .map(element => {
                return `<h2>${element.name}</h2>
                            <div>${element.body}</div>`
              })
              .join(' ')}
            </body>
          </html>`
}

app.use(morgan('dev'))
app.use('/static', express.static('assets'))

app.use((req, res, next) => {
  getAllPagesInfo()
    .then(pages => {
      req.pages = pages
      next()
    })
    .catch(next)
})

app.get('/', (req, res) => {
  res.redirect(`/pages/${req.pages.find(page => page.IsHomePage).id}`)
})

app.get('/pages', (req, res) => {
  res.redirect(`/pages/${req.pages.find(page => page.IsHomePage).id}`)
})

app.get('/pages/:id', (req, res, next) => {
  getPageContent(Number(req.params.id))
    .then(content => {
      res.send(renderHTML(req.pages, Number(req.params.id), content))
    })
    .catch(next)
})

module.exports = app
