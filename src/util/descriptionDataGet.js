import storage from "../storage"

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

export function getSelectedDescriptionContent() {
  if(storage.getState().description.fetched) {
    let descContents = getSelectedDescription().descriptionContents
    let id = storage.getState().description.selected_desc_content_id
    return descContents.find(descContent => {
      return id === descContent.id
    })
  }
  return {}
}

export function getSelectedTemplate() {
  if(storage.getState().description.fetched) {
    let templates = getSelectedDescriptionContent().templates
    let id = storage.getState().description.selected_template_id
    return templates.find(template => {
      return id === template.id
    })
  }
  return {}
}

export function findDescIdByDescContentId(descContentId) {
  let descriptions = storage.getState().description.descriptions
  for(let i = 0; i < descriptions.length; i++) {
    let descriptionContents = descriptions[i].descriptionContents
    for(let j = 0; j < descriptionContents.length; j++) {
      if(descriptionContents[j].id === descContentId) {
        return descriptions[i].id
      }
    }
  }
  return -1
}

export function findDescIdByTemplateId(templateId) {
  let descriptions = storage.getState().description.descriptions
  for(let i = 0; i < descriptions.length; i++) {
    let descriptionContents = descriptions[i].descriptionContents
    for(let j = 0; j < descriptionContents.length; j++) {
      let templates = descriptionContents[j].templates
      for(let k = 0; k < templates.length; k++) {
        if (templates[k].id === templateId) {
          return descriptions[i].id
        }
      }
    }
  }
  return -1
}

export function findDescContentIdByTemplateId(templateId) {
  let descriptions = storage.getState().description.descriptions
  for(let i = 0; i < descriptions.length; i++) {
    let descriptionContents = descriptions[i].descriptionContents
    for(let j = 0; j < descriptionContents.length; j++) {
      let templates = descriptionContents[j].templates
      for(let k = 0; k < templates.length; k++) {
        if (templates[k].id === templateId) {
          return descriptionContents[j].id
        }
      }
    }
  }
  return -1
}
