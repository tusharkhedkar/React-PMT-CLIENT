import React, { Component } from "react";
import ProjectTask from "./ProjectTasks/ProjectTask";

class Backlog extends Component {
  render() {
    const { projectTasks } = this.props;

    const prTaskstodo = projectTasks
      .filter(pt => pt.status === "TO_DO")
      .map(pt => <ProjectTask key={pt.id} projectTask={pt} />);

    const prTasksinProgress = projectTasks
      .filter(pt => pt.status === "IN_PROGRESS")
      .map(pt => <ProjectTask key={pt.id} projectTask={pt} />);

    const prTasksdone = projectTasks
      .filter(pt => pt.status === "DONE")
      .map(pt => <ProjectTask key={pt.id} projectTask={pt} />);

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>TO DO</h3>
              </div>
            </div>

            {prTaskstodo}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>In Progress</h3>
              </div>
            </div>
            {prTasksinProgress}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Done</h3>
              </div>
            </div>
            {prTasksdone}
          </div>
        </div>
      </div>
    );
  }
}

export default Backlog;
