const request = require('request')

const weather = (latitude, logitude, callback) => {

    const url = 'https://api.darksky.net/forecast/95a73f961163b829ba59cb1da8108cb6/'+latitude+','+logitude
    request({url: url, json: true},(error, {body}) => {

        if(error) {
            callback('Unable to connect',undefined)
        }

        else if(body.error) {

            callback('Invalid inputs', undefined)
        }

        else {
            callback(undefined, {

                temperature: body.currently.temperature,
                summary: body.currently.summary,
                temperatureMin: body.daily.data[7].temperatureMin,
                temperatureHigh: body.daily.data[7].temperatureHigh
            
               
            })
        }
    })
}

module.exports = weather