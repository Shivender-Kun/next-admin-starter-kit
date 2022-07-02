/**
 * @desc contains constants related to redux actions
 * @author Sahil Siddiqui
 * @since 1st january 2021
 */

import { createAction } from "@reduxjs/toolkit";

export const SWITCH_NAVIGATION = createAction("SWITCH_NAVIGATION");
export const SETTINGS_STATE_ACTION = createAction("SETTINGS_STATE_ACTION");
export const FETCHING = createAction("FETCHING");
export const ERROR = createAction("ERROR");

export const BAR_DATA = createAction("BAR_DATA");

export const EDIT_RECS = createAction("EDIT_RECS");
export const BTS_EDIT = createAction("BTS_EDIT");
export const EDIT_REWARD = createAction("EDIT_REWARD");

export const LOGIN_FETCH = createAction("PAYLOAD_LOGIN");
export const LOGIN_PAYLOAD = createAction("LOGIN_PAYLOAD");

export const SUCCESS = createAction("SUCCESS");
export const TRANSIENT_TOGGLE = createAction("TRANSIENT_TOGGLE");
export const ACTIVITY_EDIT = createAction("ACTIVITY_EDIT");

export const MODAL_ACTION = createAction("MODAL_ACTION");
export const API_MESSAGE = createAction("API_MESSAGE");
export const SET_ID = createAction("SET_ID");

export const SWITCH_NOTIFICATION_LIST = createAction(
  "SWITCH_NOTIFICATION_LIST"
);
export const FAQ_STATE = createAction("FAQ_STATE");
export const FAQ_ADD = createAction("FAQ_ADD");
export const IMG_MODAL = createAction(" IMG_MODAL");
export const SET_PLACE_ID = createAction("SET_PLACE_ID");
export const SIDEBAR_ACTION = createAction("SIDEBAR_ACTION");
