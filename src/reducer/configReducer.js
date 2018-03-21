import ActionList from "./actionList"

export default function reducer(state={
  configs: []
}, action) {

  if(action.type === ActionList.SET_CONFIGS) {
    return {
      ...state,
      configs: action.payload
    }
  } else {
    return state;
  }
}
