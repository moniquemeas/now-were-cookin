var dishName = document.querySelector("#dishInput");
var searchDish = document.querySelector("#searchBtn");
var hide = document.querySelector(".hide");
getFood = function() {fetch (`https://api.edamam.com/api/recipes/v2?type=public&q=${dishName.value}&app_id=03d221fa&app_key=b0f1cb14c1336a271d6b3d52219b5f0b`)

.then((response) => response.json())
.then((data) => displayRecipe(data.hits))
.catch(error => console,log("Error"))
}
var submitHandler = function(event){
    event.preventDefault();
    var inputVal = dishName.value;
    getFood(inputVal);
    
}



displayRecipe = function(data){
    console.log(data)
    hide.classList.remove("hide");
    
    var recipeList = data.map(data => {
       
        return `
        <div class="card-panel hoverable light-blue lighten-5 recipeCard">
        <h6 class="center-align black-text"> ${data.recipe.label}</h6> 

        <div class="card-image">
        <img class="materialboxed circle responsive-img" width="650" src = ${data.recipe.image} >
        </div>

        <div class="card-content center-align">
        <span class="truncate black-text">Type of Cuisine: ${data.recipe.cuisineType}</span>
        <span class="black-text">Calories: ${data.recipe.calories.toFixed(0)}</span>
        <p><a class="red-text" href = ${data.recipe.url} alt="" target ="_blank">Let's cook!<a></p>
        </div>
      </div>`;

    }).join("");

    $(document).ready(function(){
        $('.materialboxed').materialbox();
      });
    
    
    document.querySelector("#recipeContainer").innerHTML = recipeList
    
            
}
searchDish.addEventListener("click", submitHandler);

var map;

function initMap() {

	// pick center coordinates for your map
	var myMapCenter = {lat: 40.785091, lng: -73.968285};

	// append map to map class
	var map = new google.maps.Map(document.getElementById('map'), {
		center: myMapCenter,
		zoom: 15
	});
}

  // Search 
  var request = {
    location: myMapCenter(),
    radius: '500',
    query: 'Grocery Store'
  };

  var service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);


// Checks that the PlacesServiceStatus is OK, and adds a marker
// using the place ID and location from the PlacesService.
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var marker = new google.maps.Marker({
      map: map,
      place: {
        placeId: results[0].place_id,
        location: results[0].geometry.location
      }
    });
  }
}

google.maps.event.addDomListener(window, 'load', initialize);


