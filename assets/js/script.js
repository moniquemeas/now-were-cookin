var dishName = document.querySelector("#dishInput");
var searchDish = document.querySelector("#searchBtn");

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
    
    
    var recipeList = data.map(data => {
       
        return `<div class="recipeCard"> 
        <img src = ${data.recipe.image} />
        <p>Name: ${data.recipe.label}</p>
        <p>Type of cuisine: ${data.recipe.cuisineType}</p>
        <p>Calories: ${data.recipe.calories.toFixed(0)}</p>
        <a href = ${data.recipe.url} alt="" target ="_blank">Let's cook!<a>
    </div>`

    }).join("");
    
    
    
    document.querySelector("#recipeContainer").innerHTML = recipeList
    
}
searchDish.addEventListener("click", submitHandler);
