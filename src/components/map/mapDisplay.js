import React from 'react';
import MyComponent from './mapGoogle';
import CardComponent from './CardComponent';

const MapDisplay = ({ cards }) => (
  <div style={{ display: 'flex' }}>
    <div style={{ flex: '1', paddingRight: '16px' }}>
      {cards && cards.map((card) => (
        <CardComponent key={card.id} card={card} />
      ))}
    </div>
    <div style={{ flex: '1' }}>
      <MyComponent />
    </div>
  </div>
);

export default MapDisplay;
