import ActionList from "./actionList"

export default function reducer(state={
    dataRandom1: null,
    dataRandom2: "nulljuga"
  }, action) {

    if(action.type === ActionList.SET) {
      return {
        ...state,
        [action.payload.prop_name]: action.payload.prop_value
      };
    } else {
      return state;
    }
}
