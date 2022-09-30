import { CameraData } from 'assets/cameraData';
import CameraForm from 'components/Form';
import ShopCard from 'components/ShopCard';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

interface FormPageState {
  userCameraData: CameraData[];
}

export default class FormPage extends React.Component<unknown, FormPageState> {
  constructor(props: unknown) {
    super(props);
    this.state = { userCameraData: [] };
  }

  addCamera = (cameraData: CameraData) => {
    const { userCameraData } = this.state;
    cameraData.num = String(userCameraData.length + 1);
    userCameraData.push(cameraData);
    this.setState({
      userCameraData: userCameraData,
    });
  };

  render() {
    const cards = this.state.userCameraData.map((item) => <ShopCard key={item.num} {...item} />);
    return (
      <div className="root">
        <Header pageName="Used Cameras: Browse And Add Yourself!" />
        <div className="used-cameras-container">
          <div className="used-cameras-left">
            <h2 className="used-cameras-heading">Add your custom camera here:</h2>
            <CameraForm addCamera={this.addCamera} />
            <Link to="/">
              <button className="button_big">Return to main</button>
            </Link>
          </div>
          <div className="shop-page">
            {cards.length === 0 ? 'No user added cameras so far. Please add some!' : cards}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
