import React from "react";
import { fetchStudent } from "../redux/store";
import { connect } from "react-redux";

const avgGrade = (tests) => {
  return Math.round(
    tests.map((test) => test.grade).reduce((x, y) => x + y) / tests.length
  );
};

// const DUMMY_DATA = {
//   id: 1,
//   fullName: "Student McDummydata",
//   firstName: "Student",
//   lastName: "McDummydata",
//   email: "sm@dummydata.com",
//   tests: [
//     {
//       id: 1,
//       subject: "Computer Science",
//       grade: 45,
//     },
//     {
//       id: 6,
//       subject: "Art",
//       grade: 60,
//     },
//     {
//       id: 12,
//       subject: "ullam",
//       grade: 45,
//     },
//   ],
// };

class SingleStudent extends React.Component {
  constructor(props) {
    super(props);
    console.log("single student props", props);
  }

  componentDidMount() {
    this.props.loadStudentInReact(this.props.match.params.id);
  }

  render() {
    const student = this.props.student;
    const hasTests = student.tests && student.tests.length;

    return (
      <div>
        <h3>Detail: {student.fullName}</h3>
        {hasTests ? (
          <React.Fragment>
            <h3>Average grade: {avgGrade(student.tests)}%</h3>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {student.tests.map((test) => {
                    return (
                      <tr key={test.id}>
                        <td>{test.subject}</td>
                        <td>{test.grade}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </React.Fragment>
        ) : (
          <h4>No tests on record.</h4>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    student: state.student,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadStudentInReact: (id) => dispatch(fetchStudent(id)),
  };
};

const connectedStudent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleStudent);

export default connectedStudent;
