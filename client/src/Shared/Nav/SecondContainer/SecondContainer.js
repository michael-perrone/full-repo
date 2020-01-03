import React from "react";
import styles from "../Nav.module.css";
import { Link, withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import AdminSecondContainer from "./AdminSecondContainer/AdminSecondContainer"
import InstructorSecondContainer from "./InstructorSecondContainer/InstructorSecondContainer"
import UserSecondContainer from "./UserSecondContainer/UserSecondContainer"

const SecondContainer = props => {
  const [showDropDown, setShowDropDown] = React.useState(false);

  return (
    
    <div>
       {props.admin && <AdminSecondContainer/>}
       {props.instructor && <InstructorSecondContainer/>}
       {props.user && <UserSecondContainer/>}
  
  </div>
  )};

const mapStateToProps = (state) => {
  return {
    admin: state.authReducer.admin,
    instructor: state.authReducer.instructor,
    user: state.authReducer.user
  }
}

export default connect(mapStateToProps)(SecondContainer);
