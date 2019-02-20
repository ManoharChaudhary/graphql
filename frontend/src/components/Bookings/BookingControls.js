import React from "react";

import "./BookingControls.css";

const bookingControls = props => {
  return (
    <div className="bookings-controls">
      <button className={props.activeTab === 'list' ? 'active' : '' } onClick={props.onChange.bind(this, "list")}>List</button>
      <button className={props.activeTab === 'chart' ? 'active' : '' } onClick={props.onChange.bind(this, "chart")}>Chart</button>
    </div>
  );
};
export default bookingControls;
