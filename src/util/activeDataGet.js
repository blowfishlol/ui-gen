import storage from "../storage"

export function getSelectedDescription() {
  if(storage.getState().description.fetched) {
    let descriptions = storage.getState().description.descriptions
    let id = storage.getState().description.selected_index
    return descriptions.find(description => {
      return id === description.id
    }).data
  }
  return {}
}

export function getSelectedConfig() {
  if(storage.getState().config.fetched) {
    let configs = storage.getState().config.configs
    let id = storage.getState().config.selected_index
    return configs.find(config => {
      return id === config.id
    }).data
  }
  return {}
}

export function getSelectedTemplate() {
  if(storage.getState().config.fetched) {
    let templates = storage.getState().template.templates
    let id = storage.getState().config.selected_index
    return templates.find(template => {
      return id === template.id
    }).data // --> edited later
  }
  return {}
}