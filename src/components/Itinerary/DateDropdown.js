import React, { useState } from 'react';

const ItineraryMenu = ({ itinerary }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (date) => {
    setOpenDropdown(date === openDropdown ? null : date);
  };

  return (
    <div>
      {itinerary.map((date) => (
        <Dropdown key={date} date={date} isOpen={openDropdown === date} onToggle={handleDropdownToggle}>
          {/* Cards de esta fechas */}
        </Dropdown>
      ))}
    </div>
  );
};

const Dropdown = ({ date, isOpen, onToggle, children }) => {
  const handleToggle = () => {
    onToggle(date);
  };

  return (
    <div>
      <button onClick={handleToggle}>{date}</button>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

export default ItineraryMenu;
