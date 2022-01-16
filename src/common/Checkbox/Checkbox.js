import React from "react";
import './Checkbox.scss';

export function Checkbox({ label, checked, onChange = () => {} }) {
  const handleCheckBox = (e) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <div className="checkbox-custom">
      <label>
        <input type="checkbox" checked={checked} onChange={handleCheckBox} />
        <span className="checkbox-custom__checkbox" />
      </label>
      <h4 className="checkbox-custom__title">{label}</h4>
    </div>
  );
}
