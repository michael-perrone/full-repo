import React from "react";

const UserBookedCourtWithInstructor = props => {
  return (
    <div style={{ borderBottom: "2px solid black" }}>
      <p style={{ padding: "6px 14px", fontSize: "14px" }}>
        {props.notification.notificationMessage}
      </p>
    </div>
  );
};

export default UserBookedCourtWithInstructor;
