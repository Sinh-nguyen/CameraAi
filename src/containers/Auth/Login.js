import { push } from "connected-react-router";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import "./Login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.btnLogin = React.createRef();
  }

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-center"></div>
            <div className="col-12 form-group login-input">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
              />
            </div>
            <div className="col-12 form-group">
              <label>Password</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your password"
              />
            </div>
            <div className="col-12">
              <button className="btn-login">Login</button>
            </div>
            <div className="col-12">
              <span>Forgot your password</span>
            </div>
            <div className="col-12 text-center">
              <span className="text-other-login">Or Login with:</span>
            </div>
            <div className="col-12 social-lgi">
              <i class="fab fa-google-plus-g google"></i>
              <i class="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
