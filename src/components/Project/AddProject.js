import React, { Component } from "react";
import { createProject } from "../../actions/projectActions";
import { connect } from "react-redux";
class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      projectIdentifier: "",
      description: "",
      start_date: "",
      end_date: "",
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
    const newProject = { ...this.state };
    console.log(newProject);
    delete newProject.errors;
    console.log(newProject);
    this.props.createProject(newProject, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
  }

  render() {
    const { errors } = this.state;
    const style = { color: "red" };

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Project form</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={`form-control ${errors &&
                      errors.projectName &&
                      "is-invalid"}`}
                    placeholder="Project Name"
                    name="projectName"
                    onChange={this.onChange}
                    value={this.state.projectName}
                  />
                  <p style={style}>{errors && errors.projectName}</p>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={`form-control ${errors &&
                      errors.projectIdentifier &&
                      "is-invalid"}`}
                    placeholder="Unique Project ID"
                    name="projectIdentifier"
                    onChange={this.onChange}
                    value={this.state.projectIdentifier}
                  />
                  <p style={style}>{errors && errors.projectIdentifier}</p>
                </div>

                <div className="form-group">
                  <textarea
                    className={`form-control ${errors &&
                      errors.description &&
                      "is-invalid"}`}
                    placeholder="Project Description"
                    name="description"
                    onChange={this.onChange}
                    value={this.state.description}
                  ></textarea>
                  <p style={style}>{errors && errors.description}</p>
                </div>
                <h6>Start Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control"
                    name="start_date"
                    onChange={this.onChange}
                    value={this.state.start_date}
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control"
                    name="end_date"
                    onChange={this.onChange}
                    value={this.state.end_date}
                  />
                </div>

                <input type="submit" className="btn btn-primary mt-4" />
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
    errors: state.errors
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createProject: (project, history) => dispatch(project, history)
  };
};

export default connect(
  mapStateToProps,
  { createProject }
)(AddProject);
