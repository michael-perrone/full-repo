import React from "react";
import styles from "../Nav.module.css";
import { Link, withRouter } from "react-router-dom";

const SecondContainer = props => {
  const [showDropDown, setShowDropDown] = React.useState(false);

  function goToProfileHome() {
    props.history.push("/wdwdwadadwdwdwd");
  }

  function showDropDownHandler() {
    setShowDropDown(prevDropDown => !prevDropDown);
  }

  return (
    <div id={styles.secondContainer}>
      <p
        onClick={props.showSchedule}
        style={{ cursor: "pointer", marginRight: "30px" }}
        className={styles.links}
      >
        Schedule
      </p>
      {props.newVar !== "" &&
        props.instructorProfile.instructor.clubAccepted === true && (
          <Link
            style={{ marginRight: "30px" }}
            className={styles.links}
            to={props.newVar}
          >
            My Club
          </Link>
        )}
      <div style={{ display: "flex" }}>
        <p style={{ cursor: "pointer" }} onClick={goToProfileHome}>
          {showDropDown && props.newNotifications.length > 0 && (
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
              {props.newNotifications.length}
            </span>
          )}
          {props.name}
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
                to={`/instructor/${this.props.instructor.instructor.id}/createeditprofile`}
              >
                Edit Profile
              </Link>
            </div>
            <div
              style={{ cursor: "pointer" }}
              className={styles.dropDownDiv}
              onClick={this.props.showNotifications}
            >
              <p className={styles.dropDownItem}>
                {this.state.instructorProfile &&
                  this.state.newNotifications.length > 0 && (
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
                      {this.state.newNotifications.length}
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
                onClick={this.props.instructorLogout}
                to="/"
              >
                Logout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecondContainer;
