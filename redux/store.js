/**
 * The application store
 * @author Sahil Siddiqui
 * @since 1st January 2021
 */

import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import * as reducers from "./reducers";

const store = (initialState = {}) =>
  configureStore({
    reducer: {
      activities: reducers.activities,
      apiMessage: reducers.apiMessage,
      appDetails: reducers.appDetails,
      dashboard: reducers.dashboard,
      error: reducers.error,
      faqs: reducers.faqs,
      faqAddState: reducers.faqAddState,
      fetching: reducers.fetch,
      login: reducers.login,
      navigation: reducers.navigation,
      reportedPosts: reducers.reportedPosts,
      reportedUsers: reducers.reportedUsers,
      settingsState: reducers.settingsState,
      sidebar: reducers.sidebar,
      switchNotificationsState: reducers.switchNotificationsState,
      users: reducers.users,
      placeId: reducers.placeId,
      placeDetails: reducers.placeDetails,
      posts: reducers.posts,
      googlePlace: reducers.googlePlace,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        process.env.NODE_ENV === "production" ? [] : createLogger()
      ),
    initialState,
  });

const wrapper = createWrapper(store);

export default wrapper;
