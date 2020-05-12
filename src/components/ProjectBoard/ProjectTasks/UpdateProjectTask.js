import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getProjectTask,
  updateProjectTask
} from "../../../actions/backlogActions";
import { Link } from "react-router-dom";

class UpdateProjectTask extends Component {
  constructor(props) {
    super(props);

    const { id } = this.props.match.params;

    this.state = {
      id: "",
      summary: "",
      acceptanceCriteria: "",
      status: "",
      priority: "",
      dueDate: "",
      projectIdentifier: id,
      projectSequence: "",
      errors: null
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
    const { errors } = this.state;
    if (errors && errors.summary && this.state.summary)
      this.setState({ errors: null });
  }

  onSubmit(evt) {
    evt.preventDefault();
    const projectTask = {
      ...this.state
    };

    delete projectTask.errors;

    this.props.updateProjectTask(
      this.state.projectIdentifier,
      this.state.projectSequence,
      projectTask,
      this.props.history
    );
    //console.log(projectTask);
  }

  componentDidMount() {
    const { id, ptId } = this.props.match.params;
    this.props.getProjectTask(id, ptId, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors)
      this.setState(st => {
        return {
          ...st,
          errors: nextProps.errors
        };
      });

    this.setState(st => {
      return {
        ...st,
        ...nextProps.projectTask
      };
    });

    if (nextProps.projectTask.dueDate == null) {
      this.setState(st => {
        return {
          ...st,
          dueDate: ""
        };
      });
    }
  }

  render() {
    const { id } = this.props.match.params;
    const { errors } = this.state;
    const style = { color: "red" };
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/projectBoard/${id}`} className="btn btn-primary">
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">Update Project Task</h4>
              <p className="lead text-center font-italic text-wrap">
                Project Name : {this.state.projectIdentifier} | Project Task ID
                :{this.state.projectSequence}
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={`form-control ${errors &&
                      errors.summary &&
                      "is-invalid"}`}
                    name="summary"
                    placeholder="Project Task summary"
                    onChange={this.onChange}
                    value={this.state.summary}
                  />
                  <p style={style}>{errors && errors.summary}</p>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    onChange={this.onChange}
                    value={this.state.acceptanceCriteria}
                  ></textarea>
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    onChange={this.onChange}
                    value={this.state.dueDate}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    onChange={this.onChange}
                    value={this.state.priority}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    onChange={this.onChange}
                    value={this.state.status}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <input type="submit" className="btn btn-primary" />
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
    projectTask: state.backlog.projectTask,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { getProjectTask, updateProjectTask }
)(UpdateProjectTask);
