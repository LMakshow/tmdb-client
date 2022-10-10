import React, { useState } from 'react';
import { MovieReqData } from './MovieReqCard';

interface UserContextType {
  movieReqData: MovieReqData[];
  addRequest: (cameraData: MovieReqData) => void;
}

export const UserContext = React.createContext<UserContextType>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [movieReqData, setMovieReqData] = useState([] as MovieReqData[]);

  const addRequest = (cameraData: MovieReqData) => {
    const newCameraData = cameraData;
    newCameraData.num = movieReqData.length + 1;
    setMovieReqData([...movieReqData, newCameraData]);
  };

  const value = { movieReqData, addRequest };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
