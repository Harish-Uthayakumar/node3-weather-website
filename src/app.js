const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/temperature')


console.log(__dirname)
console.log(path.join(__dirname,'../public'))




//setup views

const viewPath = path.join(__dirname,'../templates/views')
const publicDirectoryPath = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'../templates/partials')



//setup handlebars

app.set('views',viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => {

    res.render('index',{
        title: 'Homepage',
        name: 'Shreyans'
    })
})




app.get('/about', (req, res) => {

    res.render('about',{
        name: 'Harish',
        title:'About Us'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address)
    {

        return res.send({
            error: 'No search term'
        })
    }

    const geocoded_address = geocode(req.query.address,(error, {latitude, longitude, location}) => {

        if(error) {
            return res.send({
                error
            })
        }

        const temperatur = forecast(latitude, longitude, (error, {temperature, summary}) => {

            if(error){
                return res.send({

                    error
                })
                    
                
            }

            res.send({

                temperature,
                summary,
                address: req.query.address

            })




        })


    })
    // const temperature = forecast(geocoded_address, (error, response))

    // res.send({
    //     forecast: 'Rainy',
    //     location: 'Nashik',
    //     address: address
    // })
    
})

app.get('/products', (req,res) => {

    if(!req.query.search) {

       return res.send({

        
            message: 'Provide a search term'

        })
    }

        

    

    console.log(req.query.search)

    res.send({

        
        products : []
    })
})

app.get('/help', (req, res) => {

    res.render('help',{
        help: 'This is a weather app',
        title: 'Help page',
        name: 'Kenan'
    })
})

app.get('/help/*', (req, res) => {

    res.render('404',{
        error: 'Help article not found'
    })
    })


app.get('*',(req, res) => {

    res.render('404',{
        error: 'Page not found'
    })
})

app.listen(3000, () => {

    console.log('The app is listening at port 3000')
})