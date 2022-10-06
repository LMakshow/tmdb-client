import { CameraData } from 'assets/cameraData';
import CameraForm from 'components/Form';
import ShopCard from 'components/ShopCard';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function FormPage() {
  const [userCameraData, setUserCameraData] = useState([] as CameraData[]);

  const addCamera = (cameraData: CameraData) => {
    const newCameraData = cameraData;
    newCameraData.num = String(userCameraData.length + 1);
    setUserCameraData([...userCameraData, newCameraData]);
  };

  const cards = userCameraData.map((item) => <ShopCard key={item.num} {...item} />);

  return (
    <div className="root">
      <Header pageName="Form: Add a Movie Request" />
      <div className="used-cameras-container">
        <div className="used-cameras-left">
          <h2 className="used-cameras-heading">Add your request for a movie</h2>
          <CameraForm addCamera={addCamera} />
          <Link to="/">
            <button className="button_big">Return to main</button>
          </Link>
        </div>
        <div className="shop-page">
          {cards.length === 0 ? 'No requests so far. Please add some!' : cards}
        </div>
      </div>
      <Footer />
    </div>
  );
}
