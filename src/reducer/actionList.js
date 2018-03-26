var ActionList = {

  FETCH_CONFIGS:              "fetch_configs",
  ON_CONFIGS_FETCHED:         "configs_fetched",
  ON_CONFIGS_FETCH_FAIL:      "fetch_configs_fail",
  SET_CONFIGS:                "set_configurations",
  ASSIGN_CONFIG:              "assign_config",

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
  SET_DESCRIPTIONS:           "set_descriptions",

  ON_LOGIN:                    "login",
  ON_LOGIN_SUCCESS:            "login_success",
  ON_LOGIN_FAIL:               "login_fail",
  SET_USER:                    "set_user",

  CHANGE_LOCATION:             "navigate_to",
};

export default(ActionList);

export const NavKey = {
  CONFIGURATION_MENU: "configuration",
  FORM_PAGE:          "form",
  LOGIN_PAGE:         "login"
}
