import React, { useState, useEffect } from "react";
import { useSessionContext } from "../../utils/GlobalState";
import {
    GET_MYRECIPES,
    ADD_RECIPE,
    ADD_FAVORITE,
    LOADING,
    UPDATE_FAVORITE,
    UPDATE_RECIPES,
    REMOVE_RECIPE,
    SET_CURRENT_RECIPE,
    COPY_RECIPE,
    REMOVE_FAVORITE,
    ADD_CURRENT_INGREDIENT
} from "../../utils/actions";

function AddIngredient() {
    const [state, dispatch] = useSessionContext();

    const [getIngredients, setIngredients] = useState([]);
    const [getName, setName] = useState();
    const [getAmount, setAmount] = useState();
    const [getMeasurement, setMeasurement] = useState();

    useEffect(() => {
        setIngredients(state.currentIngredients);
        console.log(state.currentIngredients);
        setName ("");
        setAmount ("");
        setMeasurement ("");
    }, []);

    const ingredients = getIngredients;

    const handleInputChange = function(event) {
        const field = event.target.name

        switch(field) {
            case "name":
              return setName(event.target.value)
            case "amount":
                return setAmount(event.target.value)
            case "measurement":
                return setMeasurement(event.target.value)
            default:
              console.log("invalid field");
          }
    }

    const updateIngredients = (newIngredient) => {
        console.log("adding a new ingredient");
        console.log(newIngredient);
        dispatch({
          type: ADD_CURRENT_INGREDIENT,
          ingredient: newIngredient
        });
      };

    const handleIngSubmit = function(event) {
        event.preventDefault();
        console.log("Submitting ingredient");
        const newIngredient = {name: getName, amount: getAmount, measurement: getMeasurement, id:ingredients.length}
        setIngredients([...getIngredients, newIngredient] );
        updateIngredients(newIngredient)
        setName("");
        setAmount("");
        setMeasurement("");
        console.log(state.currentIngredients);
    }
    
        return (
            <div>
            {ingredients.map(object => (
            <div className="row" key={object.id}>
                <input type="text" className="form-control col-md-3" id="name"
                    defaultValue={object.name}
                    name="name"
                    // onChange={handleInputChange}
                    placeholder="Ingredients Name" />
                <input type="text" className="form-control col-md-3" id="amount"
                    defaultValue={object.amount}
                    name="amount"
                    // onChange={handleInputChange}
                    placeholder="Quantity" />
                <input type="text" className="form-control col-md-3" id="measurement"
                    defaultValue={object.measurement}
                    name="measurement"
                    // onChange={handleInputChange}
                    placeholder="Measurement" />
                    {/* This button should add the current ingredient being typed to the ingredients array */}
                <button>+</button>
            </div>
            ))}
            <div className="row">
                <input type="text" className="form-control col-md-3" id="name"
                    value={getName}
                    name="name"
                    onChange={handleInputChange}
                    placeholder="Ingredients Name" />
                <input type="text" className="form-control col-md-3" id="amount"
                    value={getAmount}
                    name="amount"
                    onChange={handleInputChange}
                    placeholder="Quantity" />
                <input type="text" className="form-control col-md-3" id="measurement"
                    value={getMeasurement}
                    name="measurement"
                    onChange={handleInputChange}
                    placeholder="Measurement" />
                    {/* This button should add the current ingredient being typed to the ingredients array */}
                <button onClick={handleIngSubmit}>+</button>
            </div>
            </div>
        )

}

export default AddIngredient;