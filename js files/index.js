    
    let themeToggleBtn = document.getElementById('themeToggle');
    let themeIcon = document.getElementById('themeIcon')

    let storedTheme = JSON.parse(localStorage.getItem('isDark'))
    let isDark = storedTheme || false;

    if (isDark) {
    document.body.classList.add('dark-theme');
    themeIcon.innerHTML = '<i class="fa-solid fa-sun"></i>';
} else {
    document.body.classList.remove('dark-theme');
    themeIcon.innerHTML = '<i class="fa-solid fa-moon"></i>';
}

    function toggleTheme(){
        isDark = !isDark;
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('isDark' , JSON.stringify(isDark))
        if(isDark){
            themeIcon.innerHTML= '<i class="fa-solid fa-sun"></i>'
        }
        else {
            themeIcon.innerHTML = '<i class="fa-solid fa-moon"></i>' 
        }
    }

    themeToggleBtn.addEventListener('click' , toggleTheme)

// ________End Of Dark Mode________

//  http://api.weatherapi.com/v1/search.json?key=be448658fe8749428af182222250311&q=lond

let searchInput = document.getElementById('searchInput')
let findBtn = document.getElementById('findBtn')
let cards = document.getElementById('rowData')

async function getWeather(city){
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=be448658fe8749428af182222250311&q=${city}&days=3`)
        let data = await response.json()
        console.log(data)
        displayData(data)
    }
    catch(error) {
        console.log('errorrr')
        cards.innerHTML = `<p class="alert ">⚠️City not found. Please try again.</p>`;
    }
}

function displayData(data){
    let days = data.forecast.forecastday;
    let location = data.location;
    let box =""
    for(let i=0; i< days.length; i++){
        let dateObj = new Date(days[i].date)
        let weekday = dateObj.toLocaleDateString('en-US' , {weekday:"long"})
        let day = dateObj.getDate();
        let month = dateObj.toLocaleDateString("en-US" , {month:"long"})

        if(i==0){
            box+=`
                <div class="col-sm-12 col-md-4 d-flex">
                        <div class="card flex-fill">
                            <div class="card-title d-flex justify-content-between px-2">
                                <span>${weekday}</span>
                                <span>${day} ${month}</span>
                            </div>
                            <div class="card-body">
                                <h5>${location.name}, ${location.country}</h5>
                                <h2>${days[i].day.avgtemp_c}°C</h2>
                                <img src="https:${days[i].day.condition.icon}" alt="${days[i].day.condition.text}" style="width: 70px;">
                                <p class="condition">${days[i].day.condition.text}</p>
                            </div>
                            <div class="card-footer d-flex justify-content-around">
                                <h6><i class="greenn fa-solid fa-umbrella"></i> ${days[i].day.avghumidity}%</h6>
                                <h6><i class="bluee fa-solid fa-wind"></i>${days[i].day.maxwind_kph}km/h</h6>
                                <h6><i class="redd fa-solid fa-location-dot"></i>${days[i].hour[0].wind_dir}</h6>
                            </div>
                        </div>
                </div>
            `
        }
        else{
            box += `
                    <div class="col-sm-12 col-md-4 d-flex">
                    <div class="card flex-fill">
                        <div class="card-title text-center">
                            <span>${weekday}</span>
                        </div>
                        <div class="card-body text-center">
                            <img src="https:${days[i].day.condition.icon}" alt="${days[i].day.condition.text}" style="width: 100px;">
                            <h3>${days[i].day.maxtemp_c}°C</h3>
                            <h4>${days[i].day.mintemp_c}°C</h4>
                            <p>${days[i].day.condition.text}</p>
                        </div>
                    </div>
                </div>
            `
        }
    }
    cards.innerHTML= box;
}

findBtn.addEventListener('click' , function(){
    let city = searchInput.value.trim()
    if(city !==""){
        getWeather(city)
    }
})
getWeather("cairo")

searchInput.addEventListener('keyup' , function(){
    let city = searchInput.value.trim()
    if(city !==""){
    getWeather(city)
    }
    else{
        getWeather('cairo')
    }
})

function getUserLocation() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success , error)
    }
    else {
        getWeather('cairo')
    }
}
function success(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(`${latitude},${longitude}`)
}

function error(error) {
    getWeather('cairo')
}

getUserLocation()