import axios from "axios";


export default {

    // RECIPES
    postRecipe: function (recipe) {
        return axios.post("/api/recipe", recipe);
    },

    getAllRecipes: function () {
        console.log("API call to  api/recipe for all recipes ")
        return axios.get("/api/recipe");
    },

    getSingleRecipe: function (recipeId) {
        return axios.get(`/api/recipe/${recipeId}`)
    },

    // USER ROUTES
    postUser: function (user) {
        return axios.post(`/api/user`, user)
    },
    
    getUserByEmail: function (userEmail) {
        return axios.get(`/api/user/${userEmail}`)
    },

    getAllUsers: function() {
        return axios.get(`/api/user`);
    },

    // USER RECIPE ROUTES
    getUserRecipes: function (userId) {
        // Users Recipes
        return axios.get(`/api/user/${userId}/recipe`);
    },

    // USER FAVORITE ROUTES
    getUserRecipeFavorite: function (userId) {
        // Users Favorites
        return axios.get(`/api/user/${userId}/favorite`);
    },

    // INGREDIENTS
    postIngredient: function (ingredient) {
        return axios.post("/api/ingredient", ingredient);
    },

    // RECIPE INGREDIENTS
    getAllRecipeIngredients: function () {
        return axios.get("/api/recipeIngredient");
    },

    postRecipeIngredient: function (recipeIngredient) {
        return axios.post("/api/recipeIngredient", recipeIngredient);
    },

    // TAG ROUTES
    getAllTags: function() {
        return axios.get("/api/tag");
    },

    postTag: function(tag) {
        return axios.post("/api/tag", tag)
    },

    postImage: function(image){
        return axios.post(image)
    }
};