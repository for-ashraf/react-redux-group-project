import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Rocket from '../components/Rocket';

function Rockets() {
  const rocketList = useSelector((state) => state.rockets.rockets);
  const rocketStatus = useSelector((state) => state.rockets.status);

  useEffect(() => {
    localStorage.setItem('rocketData', JSON.stringify(rocketList));
  }, [rocketList]);

  let content;
  if (rocketStatus === 'succeeded') {
    content = rocketList.map((rocket) => (
      <Rocket
        key={rocket.id}
        rocket_name={rocket.rocket_name}
        description={rocket.description}
        flickr_images={rocket.flickr_images}
        id={rocket.id}
        reserved={rocket.reserved}
      />
    ));
  }

  return (
    <>
      {content}
    </>
  );
}

export default Rockets;
