import React, { useState } from 'react';
import { MovieData } from 'utils/TMDBinterfaces';
import { MovieReqData } from './MovieReqCard';

interface UserContextType {
  movieReqData: MovieReqData[];
  addRequest: (cameraData: MovieReqData) => void;
  renderData: MovieData[];
  setRenderData: React.Dispatch<React.SetStateAction<MovieData[]>>;
}

export const UserContext = React.createContext<UserContextType>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [movieReqData, setMovieReqData] = useState([] as MovieReqData[]);
  const [renderData, setRenderData] = useState([] as MovieData[]);

  const addRequest = (cameraData: MovieReqData) => {
    const newCameraData = cameraData;
    newCameraData.num = movieReqData.length + 1;
    setMovieReqData([...movieReqData, newCameraData]);
  };

  const value = { movieReqData, addRequest, renderData, setRenderData };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
