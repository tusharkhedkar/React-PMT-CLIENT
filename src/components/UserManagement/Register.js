import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewUser } from "../../actions/securityActions";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      errors: null
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });

    this.setState({ errors: null });
  }

  onSubmit(evt) {
    evt.preventDefault();
    const newUser = {
      ...this.state
    };
    delete newUser.errors;
    console.log(newUser);
    this.props.createNewUser(newUser, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
  }

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    const { errors } = this.state;
    const style = {
      color: "red"
    };

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={`form-control ${errors &&
                      errors.fullName &&
                      "is-invalid"}`}
                    placeholder="Name"
                    name="fullName"
                    onChange={this.onChange}
                    value={this.state.fullName}
                  />
                  <p style={style}>{errors && errors.fullName}</p>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={`form-control ${errors &&
                      errors.username &&
                      "is-invalid"}`}
                    placeholder="Email Address"
                    name="username"
                    onChange={this.onChange}
                    value={this.state.username}
                  />
                  <p style={style}>{errors && errors.username}</p>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={`form-control ${errors &&
                      errors.password &&
                      "is-invalid"}`}
                    placeholder="Password"
                    name="password"
                    onChange={this.onChange}
                    value={this.state.password}
                  />
                  <p style={style}>{errors && errors.password}</p>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={`form-control ${errors &&
                      errors.confirmPassword &&
                      "is-invalid"}`}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={this.onChange}
                    value={this.state.confirmPassword}
                  />
                  <p style={style}>{errors && errors.confirmPassword}</p>
                </div>
                <input type="submit" className="btn btn-info" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security
});

export default connect(
  mapStateToProps,
  { createNewUser }
)(Register);
