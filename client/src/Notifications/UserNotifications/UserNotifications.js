import React from "react";
import InstructorAddeduser from "./InstructorAddedUser/InstructorAddedUser";

const UserNotifications = props => {
  console.log(props);
  return (
    <div style={{ height: "95px", borderBottom: "2px solid black" }}>
      {props.userNotifications.map(notification => {
        if (notification.notificationType === "InstructorBookedUser") {
          return <InstructorAddeduser notification={notification} />;
        }
      })}
    </div>
  );
};
export default UserNotifications;
