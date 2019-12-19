import React, { useState } from "react";
import styles from "../../Notifications.module.css";
import Axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OtherAlert from "../../../OtherAlerts/OtherAlerts";

const ClubAddedInstructorNotification = props => {
  const [clubAccepted, setClubAccepted] = useState(false);
  const [clubNameState, setClubNameState] = useState("");
  function getClubName() {
    const clubNameArray = [];
    let newArray = props.notification.notificationMessage.split("");
    let a;
    let b;
    let c;
    let d;
    let e;
    let f;
    for (let i = 0; i < newArray.length; i++) {
      a = i + 0;
      b = i + 1;
      c = i + 2;
      d = i + 3;
      e = i + 4;
      f = i + 5;
      if (newArray[a] === "b" && newArray[b] === "y" && newArray[c] === " ") {
        break;
      }
    }

    for (let x = d; x < newArray.length; x++) {
      d = x;
      e = x + 1;
      f = x + 2;
      if (newArray[d] === "." && newArray[e] === " " && newArray[f] === "I") {
        break;
      }
    }

    for (let z = c; z < d; z++) {
      c = z;
      clubNameArray.push(newArray[z]);
    }
    clubNameArray.shift();
    let clubName = clubNameArray.join("");
    setClubNameState(clubName);
  }

  function accept() {
    getClubName();
    const objectToSend = {
      clubId: props.notification.notificationFromTennisClub,
      clubName: clubNameState,
      instructorId: props.instructor.instructor.id,
      notificationId: props.notification._id
    };
    setClubAccepted(true);
    Axios.post(
      "http://localhost:8080/api/notifications/instructorclickedyes",
      objectToSend
    ).then(response => {
      if ((response.status = 200)) {
        props.setNew(response.data.newNotifications)();
      }
    });
  }
  function deny() {
    // DONT KNOW YET
  }

  return (
    <div className={styles.notificationContainer}>
      <p
        style={{
          padding: "6px 8px",
          width: "215px",
          fontSize: "14px"
        }}
      >
        {props.notification.notificationMessage}
      </p>
      {!props.notification.answer && !clubAccepted && (
        <div
          style={{
            width: "100px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <button onClick={accept}>Accept</button>
          <button onClick={deny}>Deny</button>
        </div>
      )}
      {(props.notification.answer === "Accepted" || clubAccepted) && (
        <div
          style={{
            display: "flex",
            position: "relative",
            top: "30px",
            right: "5px",
            padding: "0px 2px"
          }}
        >
          <i className="far fa-check-square"></i>
          <p
            style={{
              marginLeft: "4px",
              fontFamily: "sans",
              fontWeight: "bold",
              height: "20px",
              color: "black"
            }}
          >
            Accepted
          </p>
        </div>
      )}
      <OtherAlert
        showAlert={clubAccepted ? true : false}
        alertType={clubAccepted ? "success" : "no-success"}
        alertMessage={
          clubAccepted === true
            ? `You have joined ${clubNameState} as an instructor.`
            : "You have denied this request."
        }
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    instructor: state.authReducer.instructor
  };
};

export default withRouter(
  connect(mapStateToProps)(ClubAddedInstructorNotification)
);
