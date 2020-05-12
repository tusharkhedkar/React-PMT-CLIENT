import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWTToken from "../SecurityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

const createNewUser = (newUser, history) => async dispatch => {
  try {
    await axios.post("http://localhost:8080/api/users/register", newUser);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    history.push("/login");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

const login = loginRequest => async dispatch => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/users/login",
      loginRequest
    );

    const { token } = response.data;

    localStorage.setItem("jwtToken", token);

    setJWTToken(token);

    const decoded = jwt_decode(token);

    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

const logout = () => dispatch => {
  localStorage.clear();
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: null
  });
};

export { createNewUser, login, logout };
