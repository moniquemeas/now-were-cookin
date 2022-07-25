var recipeUrl = " https://api.edamam.com/api/recipes/v2";
var letsEatBtn = document.querySelector("#letsEat");
var enterRecipeVal = document.querySelector("#inputsection")
var appKey = "bd9223299848b1e42aa64dfa97c4941d";
var app_id = "31cca27b"
var ingNum = "&ingr=ingr%3D1-10&"
var cuisineType = document.querySelector("#cuisineInput")
var mealType = document.querySelector("#mealInput")

letsEatBtn.addEventListener("click", recipeSearch);

function recipeSearch(event) {
    event.preventDefault();

    //var enterRecipe = enterRecipeVal.value.trim();
    //console.log(enterRecipe);

    getRecipes();

};

function getRecipes(enterRecipeVal, cuisineType, mealType) {

    var url = recipeUrl + "?type=public&q=" + enterRecipeVal + app_id + ingNum + "cuisineType=" + cuisineType + "&mealType=" + mealType;


    fetch(url)
    
     .then(function (response){
       if (response.ok) {console.log(response);
        return; 
    } 
    });
       
     //   .then(function (response) {
      //      if (!response.ok) {
      //          console.log("There is an error.");
      //          window.alert("ERROR");

      //          return;

      //      } else {
      //          return response.json();
      //          console.log(response)
      //      }
      //      })
        };


