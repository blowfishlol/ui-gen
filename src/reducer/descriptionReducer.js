import axios from "axios"

import storage from "../storage"
import server from "../util/server"
import ActionList from "./actionList"

const defaultState = {
  descriptions: [],
  selected_id: 0,
  selected_template_id: 0,
  fetched: false
}

export default function reducer(state = defaultState, action) {
  /**
   * @param (in action.payload)
   * Object {
   *   number id (user's id),
   *   string token
   * }
   */
  if(action.type === ActionList.FETCH_DESCRIPTIONS) {
    axios.post(server + "/description/list", action.payload)
      .then((response) => {
        storage.dispatch({type: ActionList.ON_DESCRIPTIONS_FETCHED, payload: response.data})
      })
      .catch((err) => {
        console.error("ERROR", err)
        storage.dispatch({type: ActionList.ON_DESCRIPTIONS_FETCH_FAIL, payload: err.response ? err.response.data.message : err.message})
      })
    return {
      ...state,
      fetched: false
    }
  /**
   * @param (in action.payload)
   * [data from server]
   * not intended to be called manually
   */
  } else if(action.type === ActionList.ON_DESCRIPTIONS_FETCHED) {
    return {
      ...state,
      descriptions: action.payload.map(description => {
        return {
          ...description,
          data: JSON.parse(description.data),
          templates: description.templates.map(template => {
            return {
              ...template,
              data: JSON.parse(template.data)
            }
          })
        }
      }),
      fetched: true
    }
  /**
   * @param (in action.payload)
   * Object containing error message from server (used in another reducer)
   * not intended to be called manually
   */
  } else if(action.type === ActionList.ON_DESCRIPTIONS_FETCH_FAIL) {
    return {
      ...state,
      fetched: true
    }
  } else if(action.type === ActionList.ASSIGN_DESCRIPTION) {
    return {
      ...state,
      selected_id: action.payload,
      selected_template_id: state.descriptions.find(description => description.id === action.payload).templates[0].id
    }
  } else if(action.type === ActionList.ASSIGN_TEMPLATE) {
    return {
      ...state,
      selected_template_id: action.payload
    }
  /**
   * @param (in action.payload)
   * [empty]
   * used to reset this reducer back to default
   */
  } else if(action.type === ActionList.ON_LOGOUT) {
    return defaultState
  } else {
    return state;
  }
}
