import React, { Component } from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";
import { connect } from "react-redux";
import { getBacklog } from "../../actions/backlogActions";

class ProjectBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getBacklog(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
  }

  render() {
    const { projectTasks } = this.props.backlog;
    const { id } = this.props.match.params;
    const { errors } = this.state;
    const BoardData = (projectTasks, errors) => {
      // if (errors && errors.projectNotFound) {
      //   return (
      //     <div className="alert alert-danger text-center" role="alert">
      //       {errors.projectNotFound}
      //     </div>
      //   );
      //}
      if (projectTasks.length == 0) {
        return (
          <div className="alert alert-info text-center" role="alert">
            No Project tasks are available currently...
          </div>
        );
      } else {
        return <Backlog projectTasks={projectTasks} />;
      }
    };

    return (
      <div className="container">
        <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        {BoardData(projectTasks, errors)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    backlog: state.backlog,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { getBacklog }
)(ProjectBoard);
