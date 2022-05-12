let latit = document.querySelector('.lat')
let longit = document.querySelector('.long')
let continent = document.querySelector('.continent')
let country = document.querySelector('.country')
let city = document.querySelector('.city')
let locality = document.querySelector('.local')
let btn = document.querySelector('.btn')

function getLocation(){
    navigator.geolocation.getCurrentPosition(position, error)
}
function position (coordinates){
//    console.log(coordinates.coords)
   var lat = coordinates.coords.latitude
   var long = coordinates.coords.longitude
   getCity(lat,long)
   showCoordinates(lat, long)  
}
    
function error (){
    console.log(`Can't show position`)
}

function showCoordinates(lat, long){
   latit.innerText = `latitude: ${lat}` 
   longit.innerText = `longitude: ${long}`
}

function getCity (lat, long){
    let url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data)
            continent.innerText = data.continent
            country.innerText = data.countryName
            city.innerText = data.city
            locality.innerText = data.locality
            // if any particular data is not available the following will cover it
            unavailableInfo(continent,country,city,locality)
        })
}

function unavailableInfo(continent,country,city,locality){
    let dataArray = [continent,country,city,locality]
    for (x of dataArray){
        if(x.textContent === ''){
            x.innerText = 'Unavailable'
            x.style.color = 'red'
        }
    }
}

btn.addEventListener('click', getLocation)
