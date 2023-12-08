import React, { createContext } from 'react';

import * as ExamsRepository from './Repositories/ExamsRepository';
import * as QuestionsRepository from './Repositories/QuestionsRepository';
import * as SubjectsRepository from './Repositories/SubjectsRepository';

export const StorageContext = createContext({});

export function StorageProvider({ children }) {
  const contextValue = {
    ...ExamsRepository,
    ...QuestionsRepository,
    ...SubjectsRepository,
  };

  return (
    <StorageContext.Provider
      value={{
        ...contextValue,
      }}>
      {children}
    </StorageContext.Provider>
  );
}
