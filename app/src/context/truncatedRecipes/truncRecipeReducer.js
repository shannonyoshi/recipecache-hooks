export default (state, action)=> {
    switch(action.type) {
        case "FETCH_TRUNC_START":
            return {
                ...state, 
                loading: true,
                error:false
            }
        case "FETCH_TRUNC_SUCCES":
            return {
                ...state,
                loading: false,
                error:false,
                truncatedRecipes: action.payload
            }
        case "FETCH_TRUNC_FAIL":
            return {
                ...state,
                loading:false,
                error: true
            }
    }
}