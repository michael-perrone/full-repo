import React from "react";
import styles from "../../Nav.module.css";
import axios from "axios";
import { connect } from "react-redux";
import DropDown from "../../DropDown/DropDown";
import Notifications from "../../../../Notifications/Notifications";

const UserSecondContainer = props => {
  const [notifications, setNotifications] = React.useState(undefined);

  React.useEffect(() => {
    axios
      .get("/api/notifications/user", {
        headers: { "x-auth-token": props.token }
      })
      .then(response => {
        console.log(response.data);
        setNotifications(response.data.userNotifications);
      })
      .catch(error => {
        console.log("thhere was an error");
      });
  }, []);

  return (
    <div id={styles.secondContainer}>
      <p className={styles.links}>View Clubs</p>
      {props.showNotifications && (
        <Notifications notifications={notifications} />
      )}
      <DropDown />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    token: state.authReducer.token,
    showNotifications: state.booleanReducers.showNotifications
  };
};

export default connect(mapStateToProps)(UserSecondContainer);
