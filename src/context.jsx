import React from 'react';

export const AppContext = React.createContext(null);

export const AppProvider = ({ app, children }) => {
	return <AppContext.Provider value={app}>{children}</AppContext.Provider>;
};
