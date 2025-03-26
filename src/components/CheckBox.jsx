import { useEffect, useState } from "react";

export const CheckBox = ({ index, checked, toggle }) => {
  return (
    <>
      <div className="checkbox-wrapper-26">
        <input
          type="checkbox"
          id={`checkbox-wrapper-${index}`}
          onChange={() => toggle(index, !checked)}
          checked={checked}
        />
        <label htmlFor={`checkbox-wrapper-${index}`}>
          <div className="tick_mark"></div>
        </label>
      </div>
    </>
  );
};
