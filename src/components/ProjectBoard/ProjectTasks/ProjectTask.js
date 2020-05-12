import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteProjectTask } from "../../../actions/backlogActions";
import { connect } from "react-redux";

class ProjectTask extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id, ptId) {
    this.props.deleteProjectTask(id, ptId);
  }

  render() {
    const { projectTask } = this.props;

    let priorityString, priorityClass;

    switch (projectTask.priority) {
      case 1:
        priorityString = "HIGH";
        priorityClass = "bg-danger text-light";
        break;
      case 2:
        priorityString = "MEDIUM";
        priorityClass = "bg-warning text-light";
        break;
      default:
        priorityString = "LOW";
        priorityClass = "bg-info text-dark";
    }

    return (
      <div className="card mb-1 bg-light">
        <div className={`card-header text-primary ${priorityClass}`}>
          ID: {projectTask.projectSequence} -- Priority: {priorityString}
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">{projectTask.summary}</h5>
          <p className="card-text text-truncate ">
            {projectTask.acceptanceCriteria}
          </p>
          <Link
            to={`/updateProjectTask/${projectTask.projectIdentifier}/${projectTask.projectSequence}`}
            className="btn btn-primary"
          >
            View / Update
          </Link>

          <button
            onClick={() =>
              this.handleDelete(
                projectTask.projectIdentifier,
                projectTask.projectSequence
              )
            }
            className="btn btn-danger ml-4"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteProjectTask }
)(ProjectTask);
