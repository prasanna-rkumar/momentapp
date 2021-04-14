import { createContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { galleryAuth as auth } from '../firebase';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [user] = useAuthState(auth);



  useEffect(() => {
    if (user) {
      setLoginModalOpen(false);
    }
  }, [user, setLoginModalOpen])

  const togglePreviewModal = () => setPreviewOpen((oldValue) => !oldValue);
  const toggleLoginModal = () => setLoginModalOpen((oldValue) => !oldValue);

  return (
    <AppContext.Provider value={{
      togglePreviewModal,
      isPreviewOpen,
      toggleLoginModal,
      isLoginModalOpen,
      isAuthenticated: !!user,
      user,
    }}
    >
      {children}
    </AppContext.Provider>
  );
};