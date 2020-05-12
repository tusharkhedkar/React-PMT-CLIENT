import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "./types";
import axios from "axios";

const createProject = (project, history) => async dispatch => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/project",
      project
    );
    history.push("/dashboard");
  } catch (error) {
    console.log(error);

    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

const getProjects = () => async dispatch => {
  const response = await axios.get("http://localhost:8080/api/project/all");
  console.log(response);

  dispatch({
    type: GET_PROJECTS,
    payload: response.data
  });
};

const getProject = (id, history) => async dispatch => {
  try {
    const response = await axios.get("http://localhost:8080/api/project/" + id);

    dispatch({
      type: GET_PROJECT,
      payload: response.data
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

const deleteProject = id => async dispatch => {
  if (window.confirm("Do you really want to Delete Project with ID " + id)) {
    const response = await axios.delete(
      "http://localhost:8080/api/project/" + id
    );

    dispatch({
      type: DELETE_PROJECT,
      payload: id
    });
  }
};

export { createProject, getProjects, getProject, deleteProject };
