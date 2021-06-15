import React from 'react';
import '../MapComponet/Marker.scss';
import '../../../../styles/_animations.scss';

const Marker = (props: any) => {
  const { color, name, id } = props;
  return (
    <div>
      <div
        className="pin bounce"
        style={{ backgroundColor: color, cursor: 'pointer' }}
        title={name}
      />
      <div className="pulse" />
    </div>
  );
  };

  export default Marker;