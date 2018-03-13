import ActionList from "./actionList"

export default function reducer(state={}, action) {

    if(action.type === ActionList.SET) {
        return {
            ...state,
            [action.payload.path]: action.payload.value,
        };
    } else if(action.type === ActionList.SET_CONFIG) {
        return {
            ...state,
            config : action.payload
        }
    } else {
        return state;
    }
}
