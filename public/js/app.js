




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const display1 = document.querySelector('#message-1')
const display2 = document.querySelector('#message-2')
const display0 = document.querySelector('#message-0')



weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()
    
    console.log(search.value)
    const location = search.value


    display0.textContent = 'Loading...'
    display1.textContent = ''
    display2.textContent = ''

    fetch('http://localhost:3000/weather?address='+ location).then((response) => {






    response.json().then((data) => {

        if(data.error) {

            display0.textContent = data.error
        }

        else{
            display0.textContent = 'The weather info for ' + data.address
            display1.textContent = 'Temperature: '+data.temperature + "F"
            display2.textContent = 'Summary: '+ data.summary
        
        }



    

    })

})
})