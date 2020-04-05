const request = require('request')

const geocode = (address, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoidWhhcmlzaGt1bWEiLCJhIjoiY2s4NXkwNWxnMDMxZjNncDdhaWdtYTBwYyJ9.O5tyKApGSvxNk20A2-ZdOw"

    request({url, json:true}, (error, {body}) => {

        if(error) {
           callback('Unable to connect to services', undefined)

        }

        else if(body.length === 0 ) {

            callback('Invalid location', undefined)

            
        }

        else{

            callback(undefined, {

                latitude: body.features[0].geometry.coordinates[1],
            longitude: body.features[0].geometry.coordinates[0],
            location: body.features[0].place_name


            })

            
        }


    })

}


module.exports = geocode