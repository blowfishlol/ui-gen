import ActionList from "./actionList"

export default function reducer(state={
  configs: [],
  current_config: {}
}, action) {

  if(action.type === ActionList.SET_CONFIGS) {
    return {
      ...state,
      configs: action.payload
    }
  } else if(action.type === ActionList.ASSIGN_CONFIG) {
    return {
      ...state,
      current_config: action.payload
    }
  } else {
    return state;
  }
}
