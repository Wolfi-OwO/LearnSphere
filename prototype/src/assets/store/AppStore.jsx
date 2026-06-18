import React, { useReducer } from "react";
import PropTypes from "prop-types";
import { AppStoreContext, reducer, initialState } from "./appStore.js";

export function AppStoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStoreContext.Provider>
  );
}

AppStoreProvider.propTypes = {
  children: PropTypes.node,
};
