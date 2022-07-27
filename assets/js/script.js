//assigned variable to elements
var dishName = document.querySelector("#dishInput");
var searchDish = document.querySelector("#searchBtn");
var hide = document.querySelector(".hide");

//create function to fetch edamam api
getFood = function() {fetch (`https://api.edamam.com/api/recipes/v2?type=public&q=${dishName.value}&app_id=03d221fa&app_key=b0f1cb14c1336a271d6b3d52219b5f0b`)

.then((response) => response.json())
.then((data) => displayRecipe(data.hits))
.catch(error => console,log("Error"))
}
//create submithandler variable to for the function
var submitHandler = function(event){
    event.preventDefault();
    var inputVal = dishName.value;
    getFood(inputVal);
    
}


//create the display function
displayRecipe = function(data){
    console.log(data)
    hide.classList.remove("hide");
    
    //map the data to the ouput elements
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
    
    //assigned the recipe list to the container
    document.querySelector("#recipeContainer").innerHTML = recipeList
    
            
}
//add event listener to the search button
searchDish.addEventListener("click", submitHandler);

//call function from google map api
function initMap(){

	//get current location of a user
	x= navigator.geolocation;
	x.getCurrentPosition(sucess, failure);

	//create a function when user is ok to pull the current location
	function sucess(position)
	{
		//assigned the latitude and longitude
		var myLat = position.coords.latitude
		var myLng = position.coords.longitude;
		
		var coords = new google.maps.LatLng(myLat, myLng);
		
		//option to display map
		var mapOptions ={
			center: coords,
			zoom:10,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}

		//assigned map to the element
		var map = new 
		google.maps.Map(document.getElementById('map'), mapOptions);

		//marker is marked current location
		new google.maps.Marker({map:map, position: coords});
		
		
		//create autocomplete to pull the business name, nearest location and address
		autocomplete = new google.maps.places.Autocomplete(document.getElementById('locationInput'), {
			componentRestrictions: {'country': ['us']},
			fields: ['geometry', 'name', 'formatted_address'],
			types: ['establishment']
		})
		
		autocomplete.addListener("place_changed", () => {
			const place = autocomplete.getPlace();
			new google.maps.Marker({
				position: place.geometry.location,
				title:place.name,
				
				map: map
			})

		//pull the location address and display in the address field
			document.getElementById('address').innerHTML = place.formatted_address;
		
		//create a direction object to use the route method
		var directionsService = new google.maps.DirectionsService();
		
		//created a direction renderer object to display the route
	  	var directionsDisplay = new google.maps.DirectionsRenderer();
		
		//bind the direction renderer to the map
	  	directionsDisplay.setMap(map);

		//create a function to calculate the route
	  	function calcRoute() {
			//create request
		  var request = {
			  origin: coords, //origin is the current location
			  destination: place.formatted_address, // destination is the business address
			  travelMode: google.maps.TravelMode.DRIVING, // Travel mode
			  unitSystem: google.maps.UnitSystem.IMPERIAL // to display unit in miles 
		  }

		  //pass the request to route method
		  directionsService.route(request, (result, status) => {
			  if (status == google.maps.DirectionsStatus.OK) {
				//get distance and time
				  const output = document.querySelector('#distance');
				  output.innerHTML= "Distance: " + result.routes[0].legs[0].distance.text;
				  const duration = document.querySelector('#duration');
				  duration.innerHTML = "Driving Duration: " + result.routes[0].legs[0].duration.text;

				//display route
				  directionsDisplay.setDirections(result);
			  } else {
				//delete route from map	
				  directionsDisplay.setDirections({routes: []});
				  
				//center the current location 
				  map.setCenter(position);
					}
		  })
	  }
	  calcRoute();
		
	  });
	  
	}
	function failure(){}
}

