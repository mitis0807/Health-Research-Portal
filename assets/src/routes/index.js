import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";



const Page404 = React.lazy(() => {
  return import("../MyComponents/Page404");
});
const serverError500 = React.lazy(() => {
  return import("../MyComponents/serverError");
});


const ForbiddenRequest = React.lazy(() => {
  return import("../MyComponents/ForbiddenRequest");
});
const BadRequest = React.lazy(() => {
  return import("../MyComponents/BadRequest");
});

const CourseScheduleChair = React.lazy(() => {
  return import("../MyComponents/CouseChair/CouseScheduleChair");
});
const ViewAllCourseSchedule= React.lazy(() => {
  return import("../MyComponents/ViewAllCourseDetails");
});
const CourseScheduleAdmin= React.lazy(() => {
  return import("../MyComponents/Admin/CourseScheduleAdmin");
});
const CourseScheduleForm = React.lazy(() => {
  return import("../MyComponents/CourseScheduleForm");
});
const CourseScheduleDean = React.lazy(() => {
  return import("../MyComponents/CourseDean/CourseScheduleDean");
});
let userData;

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    userData = this.props.authUser;
  }

  render() {
    console.log("pathname***************");
    console.log(this.props.match.path);

    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          {userData !== undefined && userData ? (
            [
              <Switch>
               {
                  <Route
                  exact
                  path="/courseScheduleChair"
                  component={CourseScheduleChair}
                />
                 
               }
                 {
                  <Route
                  exact
                  path="/viewAllCourseDeatils"
                  component={ViewAllCourseSchedule}
                />
                 
               }
                 {
                  <Route
                  exact
                  path="/courseScheduleAdmin"
                  component={CourseScheduleAdmin}
                />
                 
               }
                 {
                  <Route
                  exact
                  path="/courseScheduleForm"
                  component={CourseScheduleForm}
                />
                 
               }
                 {
                  <Route
                  exact
                  path="/courseScheduleDean"
                  component={CourseScheduleDean}
                />
                 
               }
               
               

            
                <Route exact path="/serverError" component={serverError500} />

                <Route
                  exact
                  path="/forbiddenRequest"
                  component={ForbiddenRequest}
                />
                <Route exact path="/badRequest" component={BadRequest} />
                <Route component={Page404} />
              </Switch>,
            ]
          ) : (
            <Redirect to="/signIn" />
          )}
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return { authUser };
};

export default connect(mapStateToProps)(App);
