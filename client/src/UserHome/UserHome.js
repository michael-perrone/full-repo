import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import UserNav from "../UserNav/UserNav";
import UserHomeContainer from "./UserHomeContainer/UserHomeContainer";

const UserHome = props => {
  const [userProfile, setUserProfile] = useState({});
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/userProfile/myProfile", {
        headers: {
          "x-auth-token": props.userToken
        }
      })
      .then(response => {
        if (response.status === 200) {
          setUserProfile(response.data.profile);
        }
      });
  }, []);

  function searchingHandler(trueOrFalse) {
    setSearching(trueOrFalse);
  }

  return (
    <div style={{ backgroundColor: "rgb(217,217,217)" }}>
      {searching && (
        <div
          style={{
            position: "fixed",
            top: "0px",
            height: "100vh",
            width: "100%",
            backgroundColor: "rgb(0,0,0,0.92)",
            zIndex: 100
          }}
        ></div>
      )}
      <UserNav />
      <UserHomeContainer
        searching={searching}
        searchingHandler={searchingHandler}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    userToken: state.authReducer.token
  };
};

export default withRouter(connect(mapStateToProps)(UserHome));
