import storage from "../storage"

export function getSelectedDescription() {
  if(storage.getState().description.fetched) {
    let descriptions = storage.getState().description.descriptions
    let id = storage.getState().description.selected_id
    return descriptions.find(description => {
      return id === description.id
    })
  }
  return {}
}

export function getSelectedConfig() {
  if(storage.getState().config.fetched) {
    let configs = storage.getState().config.configs
    let id = storage.getState().config.selected_id
    return configs.find(config => {
      return id === config.id
    })
  }
  return {}
}

export function getSelectedTemplate() {
  if(storage.getState().description.fetched) {
    let templates = getSelectedDescription().templates
    let id = storage.getState().description.selected_template_id
    return templates.find(template => {
      return id === template.id
    })
  }
  return {}
}