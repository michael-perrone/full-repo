import React from "react";
import styles from "./InstructorProfileCreate.module.css";
import InstructorProfileCreateForm from "./InstructorProfileCreateForm/InstructorProfileCreateForm";
import InstructorNav from "../../InstructorNav/InstructorNav";
import { connect } from "react-redux";
import axios from "axios";

class InstructorProfileCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileCreated: false,
      instructorProfile: {}
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/instructorProfile/myprofile", {
        headers: { "x-auth-token": this.props.instructorToken }
      })
      .then(response => {
        this.setState({ profileCreated: response.data.profileCreated });
        this.setState({ instructorProfile: response.data.instructorProfile });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.profileCreated && this.props.instructor && (
          <InstructorNav />
        )}
        {!this.state.profileCreated && (
          <div id={styles.fakeNav}>
            <p id={styles.title}>Tennis Mate</p>
          </div>
        )}
        <div id={styles.instructorProfileCreateContainer}>
          <div id={styles.paragraphContainer}>
            {!this.state.profileCreated && (
              <p>
                Thanks for joining Tennis Mate{" "}
                {this.props.instructor.instructor.instructorName.split(" ", 1)}.
                You can now finish creating your profile. To the right you can
                fill out information telling other tennis players a little more
                about you. You can add information about past jobs,
                certifications you have obtained, years teaching, pricing and
                other great things about you. If you devcide to skip making a
                profile for now, you can always come back to it later.
              </p>
            )}
            {this.state.profileCreated && (
              <p>
                On this page you can edit any of the profile information you
                have previously entered about yourself. You can also add new
                jobs that you have started working at or add new ceritificates
                that you have been awared. You can also change your bio and
                lesson rate and location. You do not need to update your years
                teaching, we will do that for you.
              </p>
            )}
          </div>
          <InstructorProfileCreateForm />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    instructor: state.authReducer.instructor,
    instructorToken: state.authReducer.instructorToken
  };
};

export default connect(mapStateToProps)(InstructorProfileCreate);
