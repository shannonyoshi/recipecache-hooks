import React, {createContext, useReducer} from "react"
import truncRecipeReducer from "./truncRecipeReducer"

const initialState= {
    truncatedRecipes:[],
    loading: false,
    error: false,
    tags: ["all"]
}

const URL = 'https://localhost:8080'

export const TruncRecipes = createContext(initialState)
export const TruncRecipesProvider = async({children})=> {
    const [state, dispatch] = useReducer(truncRecipeReducer, initialState)
    
    function fetchTruncRecipes() {
        dispatch({type: "FETCH_TRUNC_START"})
        const response = await fetch(`${URL}/api/truncRecipes`)
            if (!response.ok) {
                console.log(response)
            } dispatch({type: "FETCH_TRUNC_SUCCESS", payload: response.data})
        
    }
    return(<TruncRecipes.Provider value = {{truncState: state, fetchTruncRecipes}}>
        {children}
    </TruncRecipes.Provider>)
}