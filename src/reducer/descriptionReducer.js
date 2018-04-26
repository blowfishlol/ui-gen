import axios from "axios"

import storage from "../storage"
import server from "../util/server"
import ActionList from "./actionList"
import {concatArrayById} from "../util/toolbox"

const defaultDescContent = {
  id: -1,
  templates: [],
  version: ""
}

const defaultTemplate = {
  id: -1,
  name: "",
}

function filterDataNoId(descriptions, descId, descContentId, templateId) {
  return descriptions.map(description => {
    return {
      ...description,
      descriptionContents: description.descriptionContents.filter(descriptionContent => {
        return descriptionContent.id !== -1
      }).map(descriptionContent => {
        return {
          ...descriptionContent,
          templates: descriptionContent.templates.filter(template => {
            return template.id !== -1
          })
        }
      })
    }
  })
}

const defaultState = {
  descriptions: [],
  selected_id: -1,
  selected_desc_content_id: -1,
  selected_template_id: -1,
  fetched: false,
  notifier: 0
}

export default function reducer(state = defaultState, action) {
  if(action.type === ActionList.FETCH_DESCRIPTIONS) {
    return {
      ...state,
      fetched: false
    }
  } else if(action.type === ActionList.ON_DESCRIPTIONS_FETCHED) {
    return {
      ...state,
      descriptions: action.payload.map(description => {
        return {
          ...description,
          descriptionContents: description.descriptionContents.map(content => {
            return {
              ...content,
              data: JSON.parse(content.data),
              templates: content.templates.map(template => {
                return {
                  ...template,
                  data: JSON.parse(template.data)
                }
              })
            }
          })
        }
      }),
      fetched: true
    }
  } else if(action.type === ActionList.ON_DESCRIPTIONS_FETCH_FAIL) {
    return {
      ...state,
      fetched: true
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
  } else if(action.type === ActionList.SAVE_DESCRIPTION) {
    axios.post(server + "/description/create", action.payload)
      .then((response) => {
        storage.dispatch({type: ActionList.ON_DESCRIPTION_SAVED, payload: response.data})
      })
      .catch((err) => {
        console.error("ERROR", err)
        storage.dispatch({type: ActionList.ON_DESCRIPTION_SAVE_FAIL, payload: err.response ? err.response.data.message : err.message})
      })
    return state
  } else if(action.type === ActionList.ON_DESCRIPTION_SAVED) {
    return {
      ...state,
      descriptions: concatArrayById(state.descriptions, action.payload),
      notifier: (state.notifier + 1) % 10
    }
  } else if(action.type === ActionList.DELETE_DESCRIPTION) {
    axios.post(server + "/description/delete", action.payload)
      .then((response) => {
        storage.dispatch({type: ActionList.ON_DESCRIPTION_DELETED, payload: response.data})
      })
      .catch((err) => {
        console.error("ERROR", err)
        storage.dispatch({type: ActionList.ON_DESCRIPTION_DELETE_FAIL, payload: err.response ? err.response.data.message : err.message})
      })
    return state
  } else if(action.type === ActionList.ON_DESCRIPTION_DELETED) {
    return {
      ...state,
      descriptions: state.descriptions.filter(description => description.id !== action.payload)
    }

  } else if(action.type === ActionList.SAVE_DESCRIPTION_CONTENT) {
    axios.post(server + "/description/content/create", action.payload)
      .then((response) => {
        storage.dispatch({type: ActionList.ON_DESCRIPTION_CONTENT_SAVED, payload: response.data})
      })
      .catch((err) => {
        console.error("ERROR", err)
        storage.dispatch({type: ActionList.ON_DESCRIPTION_CONTENT_SAVE_FAIL, payload: err.response ? err.response.data.message : err.message})
      })
    return state
  } else if(action.type === ActionList.ON_DESCRIPTION_CONTENT_SAVED) {
    return {
      ...state,
      descriptions: state.descriptions.map(description => {
        return description.id === state.selected_id ? {
          ...description,
          descriptionContents: concatArrayById(description.descriptionContents.filter(descriptionContent => {
            return descriptionContent.id !== -1
          }), {
            ...action.payload,
            data: JSON.parse(action.payload.data)
          })
        } : description
      })
    }
  } else if(action.type === ActionList.DELETE_DESCRIPTION_CONTENT) {
    axios.post(server + "/description/content/delete", action.payload)
      .then((response) => {
        storage.dispatch({type: ActionList.ON_DESCRIPTION_CONTENT_DELETED, payload: response.data})
      })
      .catch((err) => {
        console.error("ERROR", err)
        storage.dispatch({type: ActionList.ON_DESCRIPTION_CONTENT_DELETE_FAIL, payload: err.response ? err.response.data.message : err.message})
      })
    return state
  } else if(action.type === ActionList.ON_DESCRIPTION_CONTENT_DELETED) {
    return {
      ...state,
      descriptions: state.descriptions.map(description => {
        return {
          ...description,
          descriptionContents: description.descriptionContents.filter(descriptionContent => {
            return descriptionContent.id !== action.payload
          })
        }
      })
    }
  } else if(action.type === ActionList.SAVE_TEMPLATE) {
    axios.post(server + "/template/create", action.payload)
      .then((response) => {
        storage.dispatch({type: ActionList.ON_TEMPLATE_SAVED, payload: response.data})
      })
      .catch((err) => {
        console.error("ERROR", err)
        storage.dispatch({type: ActionList.ON_TEMPLATE_SAVE_FAIL, payload: err.response ? err.response.data.message : err.message})
      })
    return state
  } else if(action.type === ActionList.ON_TEMPLATE_SAVED) {
    return {
      ...state,
      descriptions: state.descriptions.map(description => {
        return description.id === state.selected_id ? {
          ...description,
          descriptionContents: description.descriptionContents.map(descriptionContent => {
            return descriptionContent.id === state.selected_desc_content_id ? {
              ...descriptionContent,
              templates: concatArrayById(descriptionContent.templates.filter(template => {
                return template.id !== -1
              }), {
                ...action.payload,
                data: JSON.parse(action.payload.data)
              })
            } : descriptionContent
          })
        } : description
      })
    }
  } else if(action.type === ActionList.DELETE_TEMPLATE) {
    axios.post(server + "/template/delete", action.payload)
      .then((response) => {
        storage.dispatch({type: ActionList.ON_TEMPLATE_DELETED, payload: response.data})
      })
      .catch((err) => {
        console.error("ERROR", err)
        storage.dispatch({type: ActionList.ON_TEMPLATE_DELETE_FAIL, payload: err.response ? err.response.data.message : err.message})
      })
    return state
  } else if(action.type === ActionList.ON_TEMPLATE_DELETED) {
    return {
      ...state,
      descriptions: state.descriptions.map(description => {
        return {
          ...description,
          descriptionContents: description.descriptionContents.map(descriptionContent => {
            return {
              ...descriptionContent,
              templates: descriptionContent.templates.filter(template => template.id !== action.payload)
            }
          })
        }
      })
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
  } else if(action.type === ActionList.ASSIGN_CONFIG) {
    let configContent = storage.getState().config.configs.find(config => config.id === action.payload).configContent
    return {
      ...state,
      selected_id: configContent.descriptionId,
      selected_desc_content_id: configContent.descriptionContentId,
      selected_template_id: configContent.templateId
    }
  } else if(action.type === ActionList.ADD_NEW_CONFIG) {
    return {
      ...state,
      // configs: state.configs.concat(defaultConfig),
      // selected_id: -1
    }
  } else if(action.type === ActionList.ASSIGN_DESCRIPTION) {
    return {
      ...state,
      selected_id: action.payload,
      selected_desc_content_id: -1,
      selected_template_id: -1
    }
  } else if(action.type === ActionList.ASSIGN_DESC_CONTENT) {
    return {
      ...state,
      selected_desc_content_id: action.payload,
      selected_template_id: -1
    }
  } else if(action.type === ActionList.ADD_NEW_DESC_CONTENT) {
    return {
      ...state,
      descriptions: state.descriptions.map(description => {
        return description.id === state.selected_id ? {
          ...description,
          descriptionContents: description.descriptionContents.concat(action.payload ? action.payload : defaultDescContent)
        } : description
      })
    }
  } else if(action.type === ActionList.ASSIGN_TEMPLATE) {
    return {
      ...state,
      selected_template_id: action.payload
    }
  } else if(action.type === ActionList.ADD_NEW_TEMPLATE) {
    return {
      ...state,
      descriptions: state.descriptions.map(description => {
        return description.id === state.selected_id ? {
          ...description,
          descriptionContents: description.descriptionContents.map(descriptionContent => {
            return descriptionContent.id === state.selected_desc_content_id ? {
              ...descriptionContent,
              templates: descriptionContent.templates.concat(action.payload ? action.payload : defaultTemplate)
            } : descriptionContent
          })
        } : description
      })
    }
  } else if(action.type === ActionList.ON_FORM_EXIT) {
    return {
      ...state,
      selected_id: -1,
      selected_desc_content_id: -1,
      selected_template_id: -1,
      descriptions: filterDataNoId(state.descriptions,
                                   state.selected_id,
                                   state.selected_desc_content_id,
                                   state.selected_template_id)
    }
  } else if(action.type === ActionList.ON_LOGOUT) {
    return defaultState
  } else {
    return state;
  }
}
