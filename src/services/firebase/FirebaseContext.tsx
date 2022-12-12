import { createContext, useContext } from 'react';

import Firebase, { FirebaseClass } from './firebase';

const FirebaseContext = createContext<FirebaseClass | null>(null);

const FirebaseContextProvider = ({
  children
}: {
  children: React.ReactNode | React.ReactNode[];
}): JSX.Element => {
  return <FirebaseContext.Provider value={new Firebase()}>{children}</FirebaseContext.Provider>;
};

export const useFirebaseContext = (): FirebaseClass | null => useContext(FirebaseContext);

export default FirebaseContextProvider;
