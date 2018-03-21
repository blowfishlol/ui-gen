import ActionList from "./actionList"

export default function reducer(state={
  descriptions: []
}, action) {

  if(action.type === ActionList.SET_DESCRIPTIONS) {
    return {
      ...state,
      descriptions: action.payload,
    }
  } else {
    return state;
  }
}
