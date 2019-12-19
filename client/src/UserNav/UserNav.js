import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../InstructorNav/InstructorNav.module.css";
import { USER_LOGOUT, SHOW_NOTIFICATIONS } from "../actions/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import Notifications from "../Notifications/Notifications";

const UserNav = props => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [userNotifications, setUserNotifications] = useState([]);

  React.useEffect(() => {
    Axios.get("http://localhost:8080/api/notifications/user", {
      headers: { "x-auth-token": props.userToken }
    }).then(response => {
      setUserNotifications(response.data.userNotifications);
    });
  }, []);

  function showDropDownHandler() {
    setShowDropDown(oldDropDownState => !oldDropDownState);
  }

  function goToClubs() {
    props.history.push("/clubs");
  }

  function goToUser() {
    props.history.push("/wdjwkdjawkd");
  }

  return (
    <div id={styles.navBarContainer}>
      <p id={styles.title}>Tennis Mate</p>
      <div id={styles.secondContainer}>
        <p
          onClick={goToClubs}
          style={{ cursor: "pointer", marginRight: "25px", height: "32px" }}
        >
          View Clubs
        </p>
        <div onClick={showDropDownHandler} style={{ display: "flex" }}>
          <p
            className={styles.links}
            onClick={goToUser}
            style={{ cursor: "pointer", height: "32px" }}
          >
            {props.user.user.userName}
          </p>{" "}
          <i
            style={{
              position: "relative",
              left: "3px",
              top: "5px",
              cursor: "pointer",
              color: "black"
            }}
            className="fas fa-caret-down"
          />
          {showDropDown && (
            <div id={styles.dropDownMenu}>
              <div className={styles.dropDownDiv}>
                <Link className={styles.dropDownItem} to="/Settings">
                  Settings
                </Link>
              </div>
              <div className={styles.dropDownDiv}>
                <Link
                  className={styles.dropDownItem}
                  onClick={props.showNotifications}
                >
                  Notifications
                </Link>
              </div>
              <div
                style={{ borderBottom: "none" }}
                className={styles.dropDownDiv}
              >
                <Link
                  className={styles.dropDownItem}
                  onClick={props.userLogout}
                  to="/"
                >
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      {props.showNotificationsState && (
        <Notifications userNotifications={userNotifications} />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    showNotificationsState: state.booleanReducers.showNotifications,
    user: state.authReducer.user,
    userToken: state.authReducer.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogout: () => dispatch({ type: USER_LOGOUT }),
    showNotifications: () => dispatch({ type: SHOW_NOTIFICATIONS })
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserNav)
);
