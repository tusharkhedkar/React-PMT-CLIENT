import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/securityActions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
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

    const loginRequest = {
      ...this.state
    };

    delete loginRequest.errors;

    this.props.login(loginRequest);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.security.validToken) this.props.history.push("/dashboard");

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
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <form onSubmit={this.onSubmit}>
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
                <input type="submit" className="btn btn-info" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors,
    security: state.security
  };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
