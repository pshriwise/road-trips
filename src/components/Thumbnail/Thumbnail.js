import React from 'react';
import PropTypes from 'prop-types';

import './Thumbnail.scss';

export default function Thumbnail({ id, caption, tripId }) {

    let img_src = "";

    if (id.includes(".jpg")) {
        img_src = `/images/${tripId}/thumbs/${id}`;
    } else {
        img_src = `https://drive.google.com/uc?export=view&id=${id}`;
    }

  return (
          <div className="Thumbnail">
          <img className="Thumbnail-image" src={`${img_src}`}
      alt={caption} />
          {caption && <p className="Thumbnail-caption">{caption}</p>}
      </div>
  );
}

Thumbnail.propTypes = {
  caption: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  tripId: PropTypes.string.isRequired,
};
