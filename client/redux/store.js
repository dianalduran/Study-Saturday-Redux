import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import axios from "axios";
import thunkMiddleware from "redux-thunk";

// ACTION TYPES go here:
//constants
const FETCH_STUDENTS = "FETCH_STUDENTS";
const FETCH_TESTS = "FETCH_TESTS";

// ACTION CREATORS go here:
const gotStudents = (students) => ({
  type: FETCH_STUDENTS,
  students,
});

const gotTests = (tests) => ({
  type: FETCH_TESTS,
  tests,
});

// THUNK CREATORS go here:
export const getStudents = () => {
  return async (dispatch) => {
    // const { data } = await axios.get("/api/students");

    dispatch(gotStudents());
  };
};

export const getTests = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/tests");
    dispatch(gotTests(data));
  };
};

const initialState = {
  students: [],
  tests: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENTS:
      return { ...state, students: action.students };
    case FETCH_TESTS:
      return { ...state, tests: action.tests };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

// dispatch your own actions here to test your store functionality:
store.dispatch({
  type: FETCH_STUDENTS,
  students: [
    {
      id: 1,
      fullName: "Jordan Walke",
      firstName: "Jordan",
      lastName: "Walke",
      email: "jw@react.com",
    },
  ],
});

// ^ you can see the logs above in your console, thanks to redux-logger!

export default store;
