import axios from "axios";
import {
  GET_ERRORS,
  GET_BACKLOG,
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK
} from "./types";

const addProjectTask = (projectTask, backlogId, history) => async dispatch => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/backlog/" + backlogId,
      projectTask
    );

    dispatch({
      type: GET_ERRORS,
      payload: {}
    });

    history.push("/projectBoard/" + backlogId);
  } catch (err) {
    console.error(err);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

const deleteProjectTask = (backlogId, ptId) => async dispatch => {
  if (window.confirm("Do you want to delete Project Task " + ptId)) {
    await axios.delete(
      "http://localhost:8080/api/backlog/" + backlogId + "/" + ptId
    );

    dispatch({
      type: DELETE_PROJECT_TASK,
      payload: ptId
    });
  }
};

const getBacklog = backlogId => async dispatch => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/backlog/" + backlogId
    );

    dispatch({
      type: GET_BACKLOG,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

const getProjectTask = (backogId, ptId, history) => async dispatch => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/backlog/" + backogId + "/" + ptId
    );

    dispatch({
      type: GET_PROJECT_TASK,
      payload: response.data
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

const updateProjectTask = (
  backlogId,
  ptId,
  projectTask,
  history
) => async dispatch => {
  try {
    await axios.put(
      "http://localhost:8080/api/backlog/" + backlogId + "/" + ptId,
      projectTask
    );

    dispatch({
      type: GET_ERRORS,
      payload: {}
    });

    history.push("/projectBoard/" + backlogId);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export {
  addProjectTask,
  deleteProjectTask,
  getBacklog,
  getProjectTask,
  updateProjectTask
};
