var ActionList = {

  FETCH_CONFIGS:              "fetch_configs",
  ON_CONFIGS_FETCHED:         "configs_fetched",
  ON_CONFIGS_FETCH_FAIL:      "fetch_configs_fail",
  ASSIGN_CONFIG:              "assign_config",
  DELETE_CONFIG:              "delete_config",
  ON_CONFIG_DELETED:          "on_config_deleted",
  ON_CONFIG_DELETE_FAIL:      "on_config_delete_fail",

  SET_DATA:                   "set_data",
  SET_DATA_BY_INDEX:          "set_data_by_index",
  SET_CONFIG:                 "set_config",
  SET_DESCRIPTION:            "set_page",
  PUSH_APP_STATE:             "push_state",
  POP_APP_STATE:              "pop_state",
  CLEAR_STATE:                "pop_all_state",
  POP_DATA_BY_INDEX:          "destroy_data",
  CLEAR_DATA:                 "destroy_all_data",

  FETCH_DESCRIPTIONS:         "fetch_descs",
  ON_DESCRIPTIONS_FETCHED:    "descs_fetched",
  ON_DESCRIPTIONS_FETCH_FAIL: "fetch_descs_fail",

  ON_LOGIN:                    "login",
  ON_LOGIN_SUCCESS:            "login_success",
  ON_LOGIN_FAIL:               "login_fail",
};

export default(ActionList);

export const NavKey = {
  CONFIGURATION_MENU: "configuration",
  FORM_PAGE:          "form",
  LOGIN_PAGE:         "login"
}
