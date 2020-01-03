import React from "react";
import styles from "./Nav.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  INSTRUCTOR_LOGOUT,
  SHOW_NOTIFICATIONS,
  SHOW_SCHEDULE
} from "../../actions/actions";
import axios from "axios";
import Notifications from "../../Notifications/Notifications";
import { withRouter } from "react-router-dom";
import Schedule from "./Schedule/Schedule";
import Title from "./Title/Title";
import SecondContainer from "./SecondContainer/SecondContainer";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropDown: false,
      notifications: "",
      newNotifications: [],
      profile: {}
    };

    this.goToProfileHome = this.goToProfileHome.bind(this);
    this.setNewNotifications = this.setNewNotifications.bind(this);
    // this.logoutHandler = this.logoutHandler.bind(this);
  }

  componentDidMount() {
    if (this.props.instructor) {
      axios
        .get("/api/instructorProfile/myprofile", {
          headers: {
            "x-auth-token": this.props.instructorToken
          }
        })
        .then(response => {
          this.setState({ instructorProfile: response.data.instructorProfile });
        });
      axios
        .get("/api/notifications/instructornotifications", {
          headers: { "x-auth-token": this.props.instructorToken }
        })
        .then(response => {
          let newNotifications = [];
          this.setState({ notifications: response.data.notifications });
          if (response.data.notifications) {
            for (let i = 0; i < response.data.notifications.length; i++) {
              if (response.data.notifications[i].notificationRead === false) {
                newNotifications.push(response.data.notifications[i]);
              }
            }
          }
          this.setState({ newNotifications });
        });
    } else if (this.props.user) {
      axios
        .get("/api/notifications/user", {
          headers: { "x-auth-token": this.props.userToken }
        })
        .then(response => {
          console.log(response.status);
          this.setState({ notifications: response.data.userNotifications });
        })
        .catch(error => {
          console.log("thhere was an error");
        });
    } else if (this.props.admin) {
    }
  }

  setNewNotifications(notificationsFromUpDate) {
    return () => {
      this.setState({ notifications: notificationsFromUpDate });
      this.setState({ newNotifications: [] });
    };
  }

  goToProfileHome() {
    this.props.history.push(
      `/instructor/${this.props.instructor.instructor.id}`
    );
  }

  render() {
    let newVar = "";
    if (this.state.profile.instructor) {
      newVar = `/clubs/${this.state.instructorProfile.instructor.tennisClub
        .split(" ")
        .reduce((accum, element) => accum + element)}`;
    }

    return (
      <React.Fragment>
        <div id={styles.navBarContainer}>
          <Title />
          <SecondContainer
            profile={this.state.profile}
            notifications={this.state.notifications}
            newVar={newVar}
          />
        </div>
        {this.props.showScheduleState && <Schedule />}
        {this.props.showNotificationsState && (
          <Notifications
            setNew={this.setNewNotifications}
            instructorNotifications={this.state.notifications}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    instructor: state.authReducer.instructor,
    instructorToken: state.authReducer.instructorToken,
    instructorProfile: state.authReducer.instructorProfile.instructorProfile,
    showNotificationsState: state.booleanReducers.showNotifications,
    showScheduleState: state.booleanReducers.showSchedule,
    user: state.authReducer.user,
    admin: state.authReducer.admin,
    userToken: state.authReducer.token,
    adminToken: state.authReducer.adminToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showSchedule: () => dispatch({ type: SHOW_SCHEDULE }),
    instructorLogout: () => dispatch({ type: INSTRUCTOR_LOGOUT }),
    showNotifications: () => dispatch({ type: SHOW_NOTIFICATIONS })
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
