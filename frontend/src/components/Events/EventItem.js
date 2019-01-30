import React from "react";

import "./EventItem.css";

const eventItem = props => {
  return (
    <li key={props.eventId} className="events__list-item">
      <div>
        <h1>{props.title}</h1>

        <h2>${props.price} - {new Date(props.date).toLocaleDateString()}</h2>
      </div>
      <div>
        {props.userId !== props.creatorId ? (
          <button onClick={props.onDetails.bind(this, props.eventId)} className="btn">View Details</button>
        ) : (
          <p>Your the Owner of the event</p>
        )}
      </div>
    </li>
  );
};

export default eventItem;
