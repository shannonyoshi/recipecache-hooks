export default (state, action) => {
  switch (action.type) {
    case "FETCH_TRUNC_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_TRUNC_SUCCESS":
      return {
        ...state,
        loading: false,
        truncatedRecipes: action.payload,
      };
    case "FETCH_TRUNC_FAIL":
      return {
        ...state,
        loading: false,
        error: true,
      };
  }
};
