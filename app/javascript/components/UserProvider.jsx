import React, { useState, createContext } from 'react';

export const MainContext = createContext();

export default function UserProvider({ current_user, children }){
  const [currentUser, setCurrentUser] = useState(current_user);

  return(
    <MainContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </MainContext.Provider>
  )
}