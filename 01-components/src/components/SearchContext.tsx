import React, { useState } from 'react';
import { MovieData } from 'utils/TMDBinterfaces';

interface SearchContextType {
  renderData: MovieData[];
  setRenderData: React.Dispatch<React.SetStateAction<MovieData[]>>;
}

export const SearchResContext = React.createContext<SearchContextType>(null);

export const SearchResProvider = ({ children }: { children: React.ReactNode }) => {
  const [renderData, setRenderData] = useState([] as MovieData[]);

  const value = { renderData, setRenderData };

  return <SearchResContext.Provider value={value}>{children}</SearchResContext.Provider>;
};
