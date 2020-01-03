import React from "react";
import styles from "../../Nav.module.css";
import { Link, withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import { SHOW_SCHEDULE, INSTRUCTOR_LOGOUT, SHOW_NOTIFICATIONS } from "../../../../actions/actions";
import Schedule from "../../Schedule/Schedule";
import axios from 'axios';
import Notifications from '../../../../Notifications/Notifications';

const InstructorSecondContainer = props => {
  const [instructorProfile, setInstructorProfile] = React.useState(undefined)
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [notifications, setNotifications] = React.useState()
  const [newNotifications, setNewNotificationsState] = React.useState();

  console.log(props)
  let newVar = "";
  if (instructorProfile && instructorProfile.instructor) {
    newVar = `/clubs/${instructorProfile.instructor.tennisClub
      .split(" ")
      .reduce((accum, element) => accum + element)}`;
  } 

  function setNewNotifications(notificationsFromUpDate) {
    return () => {
      this.setState({ notifications: notificationsFromUpDate });
      this.setState({ newNotifications: [] });
    };
  }


  function goToProfileHome() {
    props.history.push("/wdwdwadadwdwdwd");
  }

  function showDropDownHandler() {
    setShowDropDown(prevDropDown => !prevDropDown);
  }
  

  React.useEffect(() => {
    axios
    .get("/api/instructorProfile/myprofile", {
      headers: {
        "x-auth-token": props.instructorToken
      }
    })
    .then(response => {
      setInstructorProfile(response.data.instructorProfile)
    });
  axios
    .get("/api/notifications/instructornotifications", {
      headers: { "x-auth-token": props.instructorToken }
    })
    .then(response => {
      let newNotifications = [];
      setNotifications(response.data.notifications)
      if (response.data.notifications) {
        for (let i = 0; i < response.data.notifications.length; i++) {
          if (response.data.notifications[i].notificationRead === false) {
            newNotifications.push(response.data.notifications[i]);
          }
        }
      }
      setNewNotificationsState(newNotifications)
    });
  },[])

  console.log(notifications)

  return (
    <React.Fragment>
    <div id={styles.secondContainer}>
      <p
        onClick={props.showSchedule}
        style={{ cursor: "pointer", marginRight: "30px" }}
        className={styles.links}
      >
        Schedule
      </p>
      {props.newVar !== "" &&
        instructorProfile && instructorProfile.instructor.clubAccepted === true && (
          <Link
            style={{ marginRight: "30px" }}
            className={styles.links}
            to={newVar}
          >
            My Club
          </Link>
        )}
      <div style={{ display: "flex" }}>
        <p style={{ cursor: "pointer" }} onClick={goToProfileHome}>
          {showDropDown && newNotifications && newNotifications.length > 0 && (
            <span
              style={{
                position: "relative",
                left: "-6px",
                padding: "0 5px",
                boxShadow: "0px 0px 8px red",
                color: "red",
                borderRadius: "30px",
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "'Averia Serif Libre', cursive"
              }}
            >
              {newNotifications.length}
            </span>
          )}
        </p>{" "}
        <i
          onClick={showDropDownHandler}
          style={{
            position: "relative",
            left: "3px",
            top: "5px",
            cursor: "pointer"
          }}
          className="fas fa-bars"
        />
        {showDropDown && (
          <div id={styles.dropDownMenu}>
            <div className={styles.dropDownDiv}>
              <Link
                className={styles.dropDownItem}
                to={`/instructor/${instructorProfile.instructor._id}/createeditprofile`}
              >
                Edit Profile
              </Link>
            </div>
            <div
              style={{ cursor: "pointer" }}
              className={styles.dropDownDiv}
              onClick={props.showNotifications}
            >
              <p className={styles.dropDownItem}>
                {instructorProfile && newNotifications &&
                  newNotifications.length > 0 && (
                    <span
                      style={{
                        position: "relative",
                        left: "-6px",
                        padding: "0 5px",
                        boxShadow: "0px 0px 8px red",
                        color: "red",
                        borderRadius: "30px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        top: "-1px"
                      }}
                    >
                      {newNotifications.length}
                    </span>
                  )}
                Notifications
              </p>
            </div>
            <div
              style={{ borderBottom: "none" }}
              className={styles.dropDownDiv}
            >
              <Link
                className={styles.dropDownItem}
                onClick={props.instructorLogout}
                to="/"
              >
                Logout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
    {props.showScheduleState && <Schedule instructor={props}/>}
    {props.showNotificationsState && (
          <Notifications
            setNew={setNewNotifications}
            instructorNotifications={notifications}
          />
        )}
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    instructorLogout: () => dispatch({type: INSTRUCTOR_LOGOUT}),
    showSchedule: () => dispatch({type: SHOW_SCHEDULE}),
    showNotifications: () => dispatch({type: SHOW_NOTIFICATIONS})  
  }
}


const mapStateToProps = (state) => {
  return {
    showScheduleState: state.booleanReducers.showSchedule,
    instructorToken: state.authReducer.instructorToken,
    showNotificationsState: state.booleanReducers.showNotifications
    
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InstructorSecondContainer));
