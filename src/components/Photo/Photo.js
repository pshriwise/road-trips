import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Overlay from '../Overlay/Overlay';

import './Photo.scss';

export default function Photo(props) {

  const { tripId, photoId } = props.match.params;

  const onClick = props.history.goBack;

  let img_src = "";

  if (photoId.includes(".jpg")) {
      img_src = `/images/${tripId}/photos/${photoId}`;
  } else {
      img_src = `https://drive.google.com/uc?export=view&id=${photoId}`;
  }

  return (
    <Fragment>
      <Overlay onClick={onClick} className="Photo-overlay" zIndex={300} />
      <img onClick={onClick} className="Photo" src={`${img_src}`} />
    </Fragment>
  );
}

Photo.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
