//CARD index.js
import React, { useState, useEffect } from "react";
import "./card.css"
import API from "../../utils/API.js"
import { Link } from "react-router-dom";
import { useSessionContext } from "../../utils/GlobalState";
import { ADD_FAVORITE, UPDATE_FAVORITE } from "../../utils/actions"

const Card = (props) => {

    const [state, dispatch] = useSessionContext();
    const [favorite, setFavorite] = useState();
    const [style, setStyle] = useState({})

    let recipe = props.recipe.Recipe ? props.recipe.Recipe : props.recipe;

    useEffect(() => {
        state.favorites[recipe.id] ?
        setFavorite(true) :
        setFavorite(false)
        
        recipe.photo ?
        setStyle({backgroundImage: "url(" + recipe.photo + ")", backgroundRepeat: "no-repeat", backgroundPosition: "center", height: "200px", backgroundSize: "cover" }):
        setStyle({backgroundImage: "url(missingImage.svg)", backgroundRepeat: "no-repeat", backgroundPosition: "center", height: "200px", backgroundSize: "cover" })



    }, [])

    const addFavorite = (id) => {
        setFavorite(true);

        let tempFavs = { ...state.favorites };
        tempFavs[id] = true;
        console.log(tempFavs);
        dispatch({
            type: ADD_FAVORITE,
            favorites: tempFavs
        });

        const addFavorite = {
            RecipeId: id,
            UserId: state.user.id,
            userRecipeKey: `${state.user.id}-${id}`,
            favorite: true
        };

        API.postUserRecipe(addFavorite)
            .then(favAdded => {
                console.log(favAdded);
                
            }).catch(err => console.log(err))
    }

    const updateFavorite = (id) => {
        setFavorite(!favorite);
        console.log(`changeFavorite(${id})`);
        
        let tempFavs = { ...state.favorites };
        tempFavs[id] = favorite;
        dispatch({
            type: UPDATE_FAVORITE,
            favorites: tempFavs
        });

        const chgUserRecipeFav = {
            RecipeId: id,
            UserId: state.user.id,
            userRecipeKey: `${state.user.id}-${id}`,
            favorite: favorite
        };

        API.updateUserRecipe(chgUserRecipeFav)
            .then(favUpdated => {
                console.log(favUpdated);
            })
    };

    const changeFavorite = (id) => {
        console.log(`Get User Recipe to change Favorite: ${state.user.id}-${id}`)
        API.getUserRecipe(state.user.id, id)
            .then(res => {
                res.data ? updateFavorite(id, state.user.id) : addFavorite(id);
            })
    };

    

    return (
        <div className="col-md-4 col-sm-12 recipe-div">
            <div className="card">
                <Link to={"/recipes/" + recipe.id}>
                    <div className="card-body" style={style}> 
                    </div>
                    <div className="card-title"><h5 className="card-title" >{recipe.name}</h5></div>
                </Link>
                <img id={`like-${recipe.id}`} src={favorite ? "favorite.svg" : "favoriteNot.svg"} height="30px" style={{ opacity: ".75", position: "absolute", right: "10px", top: "10px" }} onClick={() => { changeFavorite(recipe.id) }} />

            </div>
        </div>
    )
}

export default Card;