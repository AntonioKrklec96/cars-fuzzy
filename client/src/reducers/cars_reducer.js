export default function (state = {}, action) {
  switch (action.type) {
    case "GET_CARS":
      return { ...state, list: action.payload };
    case "ADD_CAR":
      return { ...state, newcar: action.payload };
    case "CLEAR_NEWCAR":
      return { ...state, newcar: action.payload };
    default:
      return state;
  }
}
