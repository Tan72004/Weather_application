//http://api.weatherapi.com/v1/current.json?key=6726ca2430284bf1bff170353261105&q=Mumbai&aqi=no

const temperatureField = document.querySelector(".temp")
const locationField = document.querySelector(".time_location p")
const dateandtimeField = document.querySelector(".time_location span")
const conditionField = document.querySelector(".condition p")
const searchField = document.querySelector(".search_area")
const searchbutton = document.querySelector(".search_button")
const form = document.querySelector('form')

form.addEventListener(`submit` , searchForLocation)
let localtime = ""
let intervalId

let target = "Mumbai"
const fetchResults = async (city) =>{
 let url = `http://api.weatherapi.com/v1/current.json?key=6726ca2430284bf1bff170353261105&q=${city}&aqi=no`
    const res = await fetch(url)

    const data = await res.json()

    console.log(data)

    let locationName = data.location.name
    let time = data.location.localtime
    localtime = data.location.localtime

    let temp = data.current.temp_c
    let condition = data.current.condition.text

    updateDetails(temp,locationName,time,condition)
}


   function updateDetails(temp , locationName , time ,condition){

    temperatureField.innerText = temp + "°C"

    locationField.innerText = locationName

    conditionField.innerText = condition

    updateClock(time)
}


function searchForLocation(e){
    e.preventDefault()

    target = searchField.value

    fetchResults(target)


}


fetchResults(target)

function getDayName(number){
    switch(number){
        case 0 :
            return `Sunday`

        case 1 :
            return `Monday`

        case 2 :
            return `Tuesday`
        
        case 3 :
            return `Wednesday`

        case 4 :
            return `Thursday`

        case 5 :
            return `Friday`

        case 6 :
            return `Saturday`
    }
}
function updateClock(time){

    if(intervalId){
        clearInterval(intervalId)
    }

    let now = new Date(time)

    intervalId = setInterval(() => {

        now.setSeconds(now.getSeconds() + 1)

        let date = now.toISOString().split('T')[0]

        let currentTime = now.toLocaleTimeString()

        let currentDay = getDayName(now.getDay())

        dateandtimeField.innerText = `${date} ${currentDay} ${currentTime}`

    },1000)
}