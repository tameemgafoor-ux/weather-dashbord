let city_input=document.getElementById("cityInput")
let search_button=document.getElementById("search-button")

search_button.addEventListener("click",async function(){

const city = city_input.value
    if (!city.trim()) {
    return;
}

  const data = await getweather(city);
  if(data){
    setweather(data);}

})

const API_KEY= "2af70bc59baa4bd25063818d383b8a3e"

let want = document.getElementById("weather_add1")

//
async function getweather(city){

try{

const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

const response =await fetch(url)
if(!response.ok){
    throw new Error("City not found or API error") 
}

const data= await response.json()
 return data

}catch(error){
    console.log(error.message)
    let er =want.textContent="city not found"
     
}
}
//

function setweather(data){
 want.innerHTML=""

 let div=document.createElement("div")
 div.innerHTML=`<h2> ${data.name} </h2>
               <h1>${data.main.temp}°C</h1>
               <p>Humidity: ${data.main.humidity}%</p>
               <p>wind.speed:${data.wind.speed}</P>`
div.classList.add("result")

 want.appendChild(div)
}

let fvrt_button = document.getElementById("favorite-button");

fvrt_button.addEventListener("click", function() {

    let items = document.querySelectorAll(".city-info");
    
    let stored = JSON.parse(localStorage.getItem("card") || "[]");

    for(let key of items){
        if(key.textContent.trim()==="" &&
          !stored.includes(want.innerHTML)
){

          key.innerHTML= want.innerHTML//data2[index]
              
          stored.push(key.innerHTML)
    
          localStorage.setItem("card",JSON.stringify(stored))

          break;
        }
    }

});
//relode fvrt card take from loacal storage
let stored = JSON.parse(localStorage.getItem("card") || "[]");

let items = document.querySelectorAll(".city-info");
items.forEach((key, index) => {
    key.innerHTML = stored[index] || "";
});

console.log(JSON.parse(localStorage.getItem("card")));

//fvrt remove fg
let cards=document.querySelectorAll(".favorite-card")
for(let i=0;i<cards.length;i++){
   let key=cards[i]
   let btn= key.querySelector(".remove-btn")
   btn.addEventListener("click", function() {
    let store=JSON.parse(localStorage.getItem("card")||"[]")
    store.splice(i,1)
    localStorage.setItem("card", JSON.stringify(store))
    key.querySelector(".city-info").innerHTML=""
   })
   
   
}
let btn = document.getElementById("theme-button");

btn.addEventListener("click", function() {
    document.body.classList.toggle("bright-mode");
});

// let cards = document.querySelectorAll(".favorite-card");

// cards.forEach((card, index) => {

//     let btn = card.querySelector(".remove-btn");

//     btn.addEventListener("click", function() {

//         let stored = JSON.parse(localStorage.getItem("card") || "[]");

//         stored.splice(index, 1);

//         localStorage.setItem("card", JSON.stringify(stored));

//         card.querySelector(".city-info").innerHTML = "";

//     });

// });
//localStorage.removeItem("card");