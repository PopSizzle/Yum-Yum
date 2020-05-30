import React, { useState, useEffect } from "react";
import API from "../utils/API.js"
import MainBody from "../components/Containers/mainBody";
import Card from "../components/Card/index";
import SearchBar from "../components/Search/Search-Bar"
import CardContainer from "../components/Card/CardContainer";
import CardRow from "../components/Card/CardRow"
import { useSessionContext } from "../utils/GlobalState";

const MyRecipes = () => {
  // brings in global state : we are storing, search, global user id, favorites, user generated
  const [state, dispatch] = useSessionContext();

  // a local state variable will help us track what we display to the user
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState("")

  function loadRecipes() {
    console.log(`Making a request as user: ${state.user.id}`)
    API.getUserRecipes(state.user.id)
    .then(res => {
      console.log(res);
      setRecipes(res.data);
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    loadRecipes();
    setSearch("");
  }, [])

  function titleSearch(e) {
    e.preventDefault();

    let filter = recipes.filter(recipe =>
          recipe.Recipe.name.toLowerCase().indexOf(search) >= 0
        );
        setRecipes(filter);
  }


  // function filterRecipes() {
  //   search.toLowerCase();
  //   console.log(recipes)
  //   let filter = recipes.filter(recipe => {
  //     let lcRecipe = recipe.name.toLowerCase();
  //     return lcRecipe.indexOf(search) >= 0;
  //   })
  //   console.log(filter)
  // }


  return (
    <div>
      <MainBody >
        <SearchBar placeholder="Search for your recipes" setSearch={setSearch} titleSearch={titleSearch}/>
        <a type="button" href="/add-recipe" id="route-to-recipe" className="btn btn-primary">Add Recipe</a>
        <CardContainer>
          <CardRow>
            {recipes.map(recipe => (
              <Card recipe={recipe} key={recipe.id} />
            ))}
          </CardRow>
        </CardContainer>
      </MainBody>
    </div>
  );
}

export default MyRecipes;
