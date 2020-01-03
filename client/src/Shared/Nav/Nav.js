import React from "react";
import styles from "./Nav.module.css";
import axios from "axios";
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

  }

  componentDidMount() {
    if (this.props.user) {
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
    } 
  }

  render() {
    return (
      <React.Fragment>
        <div id={styles.navBarContainer}>
          <Title />
          <SecondContainer
            profile={this.state.profile}
            newNotifications={this.state.newNotifications}
            notifications={this.state.notifications}  
          />
        </div>
        
      </React.Fragment>
    );
  }
}

export default Nav;
