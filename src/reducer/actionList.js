export default({

  FETCH_CONFIGS:              "fetch_configs",
  ON_CONFIGS_FETCHED:         "configs_fetched",
  ON_CONFIGS_FETCH_FAIL:      "fetch_configs_fail",
  ASSIGN_CONFIG:              "assign_config",
  DELETE_CONFIG:              "delete_config",
  ON_CONFIG_DELETED:          "on_config_deleted",
  ON_CONFIG_DELETE_FAIL:      "on_config_delete_fail",
  CHANGE_CURRENT_CONFIG_NAME: "change_config_name",
  SAVE_CONFIG:                "save_config",
  ON_CONFIG_SAVED:            "config_saved",
  ON_CONFIG_SAVE_FAIL:        "config_save_fail",
  ON_BACK_PRESSED_CONFIG:     "cancel_config",
  ON_GOTO_IMPORT_CONFIG:      "goto_import_config",
  IMPORT_CONFIG:              "import_config",
  ON_CONFIG_IMPORTED:         "config_imported",
  ON_CONFIG_IMPORT_FAIL:      "config_import_fail",
  ADD_NEW_CONFIG:             "new_config",

  SET_DATA:                   "set_data",
  SET_DATA_BY_INDEX:          "set_data_by_index",
  POP_DATA:                   "remove_data",
  POP_DATA_BY_INDEX:          "destroy_data",
  ADD_PATH:                   "add_path",
  REMOVE_PATH:                "remove_path",
  SET_CONFIG:                 "set_config",
  SET_DESCRIPTION:            "set_page",
  PUSH_APP_STATE:             "push_state",
  POP_APP_STATE:              "pop_state",
  CLEAR_STATE:                "pop_all_state",
  SET_NEW_FORM_FLAG:          "set_new_form_flag",
  ALLOW_JUMP:                 "allow_jump",
  CLEAR_DATA:                 "destroy_all_data",
  ADD_EXT_FILE_REF:           "add_external_file_reference",
  REMOVE_EXT_FILE_REF:        "remove_external_file_reference",
  ADD_REMOVED_EXT_FILE_REF:   "add_removed_external_file_reference",
  ADD_ELEMENT_REF:            "add_element_reference",
  REMOVE_ELEMENT_REF:         "remove_element_reference",

  FETCH_DESCRIPTIONS:         "fetch_descs",
  ON_DESCRIPTIONS_FETCHED:    "descs_fetched",
  ON_DESCRIPTIONS_FETCH_FAIL: "fetch_descs_fail",
  ASSIGN_DESCRIPTION:         "assign_description",
  ASSIGN_TEMPLATE:            "assign_template",

  ON_LOGIN:                    "login",
  ON_LOGIN_SUCCESS:            "login_success",
  ON_LOGIN_FAIL:               "login_fail",
  ON_LOGOUT:                   "logout",

  SET_DIALOG_MESSAGE:          "set_dialog_message",
  SET_ADDITIONAL_METHOD:       "set_methods",
  SET_DIALOG_DEFAULT:          "revert_default",

  SET_WINDOW_TITLE:            "set_window_title",
  SET_WINDOW_CONTENT:          "set_window_content",
  SET_WINDOW_SIZE:             "set_window_size",
  SET_WINDOW_DEFAULT:          "set_window_default"
})

export const NavKey = {
  CONFIGURATION_MENU: "configuration",
  FORM_PAGE:          "form",
  LOGIN_PAGE:         "login",
  IMPORT_CONFIG_PAGE: "import_config"
}
