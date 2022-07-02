/**
 * This file defines application level constants
 */
const SERVER = "http://44.206.33.81:3000/api/";
const ASSET_URL = "https://shmack-app.s3.us-east-2.amazonaws.com/assets/";
const S3_URL =
  "https://shmack-app.s3.us-east-2.amazonaws.com/development/images/";

// console.log(SERVER, S3_URL, ASSET_URL, process.env.NODE_ENV);

export const SERVER_BASE_URL = SERVER;

export const APPLICATION_ROUTES = {
  // Login
  USER_LOGIN: `${SERVER_BASE_URL}admin/login`,

  // Dashboard Section ( List )
  DASHBOARD: `${SERVER_BASE_URL}admin/dashboard`,

  // Activities ( List & Action )
  ACTIVITIES: `${SERVER_BASE_URL}admin/listActivity`,
  ADD_ACTIVITY: `${SERVER_BASE_URL}admin/addActivity`,
  DELETE_ACTIVITY: `${SERVER_BASE_URL}admin/deleteActivity`,
  EDIT_ACTIVITY: `${SERVER_BASE_URL}admin/editActivity`,

  // Notifications ( Action )
  NOTIFICATION_BROADCAST: `${SERVER_BASE_URL}notification/broadcast`,

  // Posts ( List & Action )
  POSTS: `${SERVER_BASE_URL}admin/postList`,
  DELETE_POST: `${SERVER_BASE_URL}admin/removePost`,

  // Reported ( List )
  REPORTED_USERS: `${SERVER_BASE_URL}admin/reportList`,
  REPORTED_POSTS: `${SERVER_BASE_URL}admin/reportPost`,

  // Settings ( List & Action )
  APP_DETAILS: `${SERVER_BASE_URL}appDetail/list`,
  EDIT_APP_DETAILS: `${SERVER_BASE_URL}appDetail/add`,
  FAQ_ADD: `${SERVER_BASE_URL}faq/add`,
  FAQ_DELETE: `${SERVER_BASE_URL}faq/delete`,
  FAQ_EDIT: `${SERVER_BASE_URL}faq/update`,
  FAQ_LIST: `${SERVER_BASE_URL}faq/list`,

  // Users ( List & Action )
  USERS: `${SERVER_BASE_URL}admin/userList`,
  EDIT_USER: `${SERVER_BASE_URL}admin/editUser`,

  // Other
  GOOGLE_PLACE: `${SERVER_BASE_URL}admin/googlePlaceDetails`,
  PLACES_DETAILS: `${SERVER_BASE_URL}admin/placeid`,
};

export const IMAGE_PREFIXES = {
  IMAGE_SMALL: `${S3_URL}small/`,
  IMAGE_AVERAGE: `${S3_URL}average/`,
  IMAGE_BEST: `${S3_URL}best/`,
};

export const ASSETS = {
  CROSS: `${ASSET_URL}cross.png`,
  APP_LOGO: `${ASSET_URL}logo.png`,
  IMAGE_PLACEHOLDER: `${ASSET_URL}placeholder.png`,
};

// ////////// NAVIGATION CONSTANT ///////////

export const navigationIndexer = {
  dashboard: 1,
  users: 2,
  activities: 3,
  reportedusers: 4,
  notifications: 5,
  settings: 6,
  reportedposts: 7,
  posts: 8,
};

// ////////// SETTINGS CONSTANT ///////////

export const settingsIndexer = {
  aboutUs: 1,
  faq: 2,
  termConditions: 3,
  privacyPolicy: 4,
};

// ///////// MODEL CONSTANT ////////////

export const MODAL_STATE = {
  NONE: 0,
};

// //////// NOTIFICATION LIST TYPE ///////

export const NOTIFICATION_LIST = {
  SELECTED: 1,
  NONE: 2,
  ALL: 0,
};

export const ADMIN_USER_ACTIONS = {
  VERIFIED: 1,
  BLOCKED: 2,
  UNBLOCKED: 3,
  DELETED: 4,
};
