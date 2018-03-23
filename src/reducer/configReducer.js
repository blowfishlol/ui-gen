import axios from "axios"

import storage from "../storage"
import server from "../util/server"
import ActionList from "./actionList"

export default function reducer(state={
  configs: [],
  current_config: {}
}, action) {

  if(action.type === ActionList.FETCH_CONFIGS) {
    axios.post(server + "/user/login", action.payload)
      .then((response) => {
        console.log(response);
        storage.dispatch({type: ActionList.ON_CONFIGS_FETCHED, payload: response.data})
      })
      .catch((err) => {
        console.log(err)
        // storage.dispatch({type: ActionList.ON_CONFIGS_FETCH_FAIL, payload: err})
        storage.dispatch({type: ActionList.ON_CONFIGS_FETCHED, payload: [
          {
            id: 1,
            name: "Old Configuration",
            version: 1,
            data: {"installation":{"user":{"name":"timothy","accept":true},"mode":"express","statisfied":true},"root":[]}
          },
          {
            id: 2,
            name: "Older Configuration",
            version: 1,
            data: {"installation":{"user":{"name":"timothy","accept":true},"mode":"express","statisfied":true},"root":[]}
          },
          {
            id: 3,
            name: "Old Configuration",
            version: 1,
            data: {"installation":{"user":{"name":"timothy","accept":true},"mode":"express","statisfied":true},"root":[]}
          },
          {
            id: 4,
            name: "Older Configuration",
            version: 1,
            data: {"installation":{"user":{"name":"timothy","accept":true},"mode":"express","statisfied":true},"root":[]}
          },
          {
            id: 5,
            name: "Old Configuration",
            version: 1,
            data: {"installation":{"user":{"name":"timothy","accept":true},"mode":"express","statisfied":true},"root":[]}
          },
          {
            id: 6,
            name: "Older Configuration",
            version: 1,
            data: {"installation":{"user":{"name":"timothy","accept":true},"mode":"express","statisfied":true},"root":[]}
          },
          {
            id: 7,
            name: "Old Configuration",
            version: 1,
            data: {"installation":{"user":{"name":"timothy","accept":true},"mode":"express","statisfied":true},"root":[]}
          },
          {
            id: 8,
            name: "Older Configuration",
            version: 1,
            data: {"installation":{"user":{"name":"timothy","accept":true},"mode":"express","statisfied":true},"root":[]}
          },
          {
            id: 9,
            name: "Old Configuration",
            version: 1,
            data: {"installation":{"user":{"name":"timothy","accept":true},"mode":"express","statisfied":true},"root":[]}
          },
          {
            id: 10,
            name: "Older Configuration",
            version: 1,
            data: {"installation":{"user":{"name":"timothy","accept":true},"mode":"express","statisfied":true},"root":[]}
          },
          {
            id: 11,
            name: "Older Configuration",
            version: 1,
            data: {"installation":{"user":{"name":"timothy","accept":true},"mode":"express","statisfied":true},"root":[]}
          },
          {
            id: 12,
            name: "Older Configuration",
            version: 1,
            data: {"installation":{"user":{"name":"timothy","accept":true},"mode":"express","statisfied":true},"root":[]}
          },
          {
            id: 13,
            name: "Older Configuration",
            version: 1,
            data: {"installation":{"user":{"name":"timothy","accept":true},"mode":"express","statisfied":true},"root":[]}
          },
          {
            id: 14,
            name: "Older Configuration",
            version: 1,
            data: {"installation":{"user":{"name":"timothy","accept":true},"mode":"express","statisfied":true},"root":[]}
          },
          {
            id: 15,
            name: "Older Configuration",
            version: 1,
            data: {"installation":{"user":{"name":"timothy","accept":true},"mode":"express","statisfied":true},"root":[]}
          },
          {
            id: 16,
            name: "Older Configuration",
            version: 1,
            data: {"installation":{"user":{"name":"timothy","accept":true},"mode":"express","statisfied":true},"root":[]}
          },
          {
            id: 17,
            name: "Older Configuration",
            version: 1,
            data: {"installation":{"user":{"name":"timothy","accept":true},"mode":"express","statisfied":true},"root":[]}
          },
          {
            id: 18,
            name: "Older Configuration",
            version: 1,
            data: {"installation":{"user":{"name":"timothy","accept":true},"mode":"express","statisfied":true},"root":[]}
          },
          {
            id: 19,
            name: "Older Configuration",
            version: 1,
            data: {"installation":{"user":{"name":"timothy","accept":true},"mode":"express","statisfied":true},"root":[]}
          },
        ]})
      })
    return state
  } else if(action.type === ActionList.ON_CONFIGS_FETCHED) {
    return {
      ...state,
      configs: action.payload
    }
  } else if(action.type === ActionList.ASSIGN_CONFIG) {
    return {
      ...state,
      current_config: action.payload
    }
  } else if(action.type === ActionList.DELETE_CONFIG) {
    axios.post(server + "/user/login", action.payload)
      .then((response) => {
        console.log(response);
        storage.dispatch({type: ActionList.ON_CONFIG_DELETED, payload: response.data})
      })
      .catch((err) => {
        console.log(err)
        storage.dispatch({type: ActionList.ON_CONFIG_DELETE_FAIL, payload: err})
      })
    return state
  } else if(action.type === ActionList.ON_CONFIG_DELETED) {
    return {
      ...state,
      configs: state.configs.filter(element => element.id !== action.payload.id)
    }
  } else {
    return state
  }
}
