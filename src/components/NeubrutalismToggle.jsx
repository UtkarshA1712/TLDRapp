import React, { useState } from 'react';

const NeubrutalismToggle = ({ onToggle }) => {
  const [toggled, setToggled] = useState(true);

  const handleToggle = () => {
    const newState = !toggled;
    setToggled(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <button
      className={
        'relative h-[19px] w-[30px] translate-x-1 translate-y-1 cursor-pointer rounded-full bg-[#222222]'
      }
      onClick={handleToggle}
    >
      <span
        className={`flex h-full w-full items-center justify-center rounded-full border-[2px] border-[#222222] ${toggled ? 'translate-x-[3px] translate-y-[-3px] bg-[#ff527a]' : 'bg-gray-300'} p-[2px] transition-all duration-300`}
      >
        <span
          className={`aspect-square h-full transform rounded-full border-[2px] border-[#222222] bg-white shadow-lg ${toggled ? 'translate-x-[6px]' : 'translate-x-[-6px]'} transition-all duration-300`}
        />
      </span>
    </button>
  );
};

export default NeubrutalismToggle;
