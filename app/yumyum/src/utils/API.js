import axios from "axios";

export default {
    getUserRecipes: function (id) {
        // *****Change this in future********
        return axios.get(`/api/${id}/recipe`);
    },

    getAllRecipes: function () {
        console.log("tried to call the api from API")
        return axios.get("/api/recipe");
    },

    postRecipe: function (recipe) {
        return axios.post("/api/recipe", recipe);

    }

};