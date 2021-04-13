import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const togglePreviewModal = () => setIsPreviewOpen((oldValue) => !oldValue);

  return (
    <AppContext.Provider value={{
      togglePreviewModal,
      isPreviewOpen
    }}
    >
      {children}
    </AppContext.Provider>
  );
};