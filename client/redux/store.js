import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import axios from "axios";
import thunkMiddleware from "redux-thunk";

// ACTION TYPES go here:
const GOT_STUDENTS = "GOT_STUDENTS";
const GOT_SINGLE_STUDENT = "GOT_SINGLE_STUDENT";
const GOT_STUDENT_TO_DELETE = "GOT_STUDENT_TO_DELETE";

// ACTION CREATORS go here:
const gotStudents = (students) => ({
  type: GOT_STUDENTS,
  students,
});

const gotSingleStudent = (student) => ({
  type: GOT_SINGLE_STUDENT,
  student,
});

const gotStudentToDelete = (id) => ({
  type: GOT_STUDENT_TO_DELETE,
  id,
});

// THUNK CREATORS go here:
export const fetchStudents = () => async (dispatch) => {
  const { data } = await axios.get("/api/students");
  dispatch(gotStudents(data));
};

export const fetchSingleStudent = (id) => async (dispatch) => {
  const { data } = await axios.get(`/api/students/${id}`);
  dispatch(gotSingleStudent(data));
};

export const fetchStudentToDelete = (id) => async (dispatch) => {
  const { data } = await axios.delete(`/api/students/${id}`);
  console.log(data);
  dispatch(gotStudentToDelete(id));
};

const initialState = {
  students: [],
  singleStudent: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_STUDENTS:
      return {
        ...state,
        students: action.students,
      };
    case GOT_SINGLE_STUDENT:
      return {
        ...state,
        singleStudent: action.student,
      };
    case GOT_STUDENT_TO_DELETE:
      return {
        ...state,
        students: state.students.filter((student) => student.id !== action.id),
      };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default store;
