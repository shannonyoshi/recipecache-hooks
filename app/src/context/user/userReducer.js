export default (state, action) => {
  switch (action.type) {
    case "FETCH_STATUS_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_STATUS_SUCCESS":
      return {
        ...state,
        loading: false,
        userName: action.payload.name,
        isLoggedIn: action.payload.logInStatus,
      };
    case "FETCH_STATUS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
  }
};
