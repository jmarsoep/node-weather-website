const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve :: default route
app.use(express.static(publicDirectoryPath))

// Define routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Johnny McFirst'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Express',
        name: 'Johnny McFirst'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Johnny McFirst',
        helpTxt: 'Commands for the use of the Weather App'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                location,
                forecast : forecastData,
                address : req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 error',
        name: 'Johnny McFirst',
        error: 'Help article not found.'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404 error',
        name: 'Johnny McFirst',
        error: 'Page not found.'
    })
})

// Start Express server
app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})