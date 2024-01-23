//today information
let todayName = document.getElementById('todayName')
let todayNum = document.getElementById('todayNum')
let todayMonth = document.getElementById('todayMonth')
let todayLcation = document.getElementById('todayLcation')
let todayTemp = document.getElementById('todayTemp')
let todayImg = document.getElementById('todayImg')
let todayCond = document.getElementById('todayCond')
let humidity = document.getElementById('humidity')
let wind = document.getElementById('wind')
let direction = document.getElementById('direction')
//next day
let nextDay = document.getElementsByClassName('nextDay')
let nextDayImg = document.getElementsByClassName('nextDayImg')
let nextDayMaxTemp = document.getElementsByClassName('nextDayMaxTemp')
let nextDayMinTemp = document.getElementsByClassName('nextDayMinTemp')
let nextCond = document.getElementsByClassName('nextCond')



async function getweaterdata(citeName){
    let weaterResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=60020525105e4e6eacd174348242201&q=${citeName}&days=3`)
    let weaterdata = await weaterResponse.json()
    return weaterdata
    
}
 //display data
 function displayTodayData(data){
    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString('en-us',{weekday:'long'})
    todayMonth.innerHTML = todayDate.toLocaleDateString('en-us',{month:'long'})
    todayNum.innerHTML = todayDate.getDate()
    todayLcation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayCond.innerHTML = data.current.condition.text
    todayImg.setAttribute("src",data.current.condition.icon)
    humidity.innerHTML += data.current.humidity
    wind.innerHTML = data.current.wind_kph +" km/h"
    direction.innerHTML += data.current.wind_dir

   
 }
 //display next data
function displayNextDayData(data){

   for (let i = 0; i < 2; i++) {
    let nextDate = new Date(data.forecast.forecastday[i+1].date)
       nextDay[i].innerHTML = nextDate.toLocaleDateString('en-us',{weekday:'long'})
       nextDayMaxTemp[i].innerHTML = data.forecast.forecastday[i+1].day.maxtemp_c +"<sup> o</sup>c"
       nextDayMinTemp[i].innerHTML = data.forecast.forecastday[i+1].day.mintemp_c +"<sup> o</sup>c"
       nextDayImg[i].setAttribute("src",data.forecast.forecastday[i+1].day.condition.icon)
       nextCond[i].innerHTML = data.forecast.forecastday[i+1].day.condition.text

     
     }

 }

 //show Data
 async function showdata(cite="alexandria"){
    let weaterdata = await getweaterdata(cite)
   if(!weaterdata.error){
    displayTodayData(weaterdata )
    displayNextDayData(weaterdata)

   }
   else{
    alert('please enter a real city')
   }
   

 }
 showdata()

 //search
 let searchInput = document.getElementById('search')
 let submit = document.getElementById('submit')
 submit.addEventListener("click",function(){
   // console.log(searchInput.value);
    showdata(searchInput.value)
 })

 
