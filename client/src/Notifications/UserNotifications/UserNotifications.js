import React from "react";
import InstructorAddeduser from "./InstructorAddedUser/InstructorAddedUser";

const UserNotifications = props => {
  console.log(props);
  return props.userNotifications ? (
    props.userNotifications.map(notification => {
      if (notification.notificationType === "InstructorBookedUser") {
        return (
          <div style={{ height: "95px", borderBottom: "2px solid black" }}>
            <InstructorAddeduser notification={notification} />
          </div>
        );
      }
    })
  ) : (
    <div></div>
  );
};
export default UserNotifications;
