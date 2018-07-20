const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
    let now = new Date().toString()
    let log = `${now}: ${req.method} ${req.url}`
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error)
            console.log('Unable to append to server.log')
    })
    console.log(log)
    next()
})

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'))
hbs.registerHelper('getCurrentYear', () => { return new Date().getFullYear() })

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>')
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'Welcome Humans!'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad Request'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})