import React from 'react';

const InitialIcon = ({ initials }) => {
  return (
    <div
      style={{
        backgroundColor: 'blueviolet',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
      }}
    >
      <span style={{ color: 'white', fontSize: '25px' }}>{initials}</span>
    </div>
  );
};
export default InitialIcon;
