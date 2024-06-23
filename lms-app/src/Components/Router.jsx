import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./TeacherSignup";
import Login from "./TeacherLogin";
import ClassroomJoin from "./StudentJoinClassroom";
import Main from "./Main";
import StudentSignup from "./StudentSignUp";
import StudentLogin from "./SudentLogin";
import StudentHomepage from "./SudentHomePage";
import ClassroomComponent from "./StudentClassroomPage";
import TeacherHomepage from "./TeacherHomepage";
import TeacherClassroom from "./TeacherClassroom";
import ClassroomCreation from "./TeacherCreateClassroom";
import MaterialList from "./TeacherMaterialDisplay";
import StudentMaterialList from "./StudentMaterialDisplay";
import StudentList from "./StudentsList";
import AssignmentList from "./TeacherAssignementList";
import StudentAssignmentList from "./StudentAssignmentList";
import StudentAssignmentUpload from "./StudentAssignmentUpload";
import SubmittedStudents from "./SubmittedStudents";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import ClassroomUpdate from "./TeacherClassroomUpdate";
import YourComponent from "./ChatRoomJoined";
import StudentClassDetailPage from "./StudentClassDetailsPage";
import TeacherClassDetailPage from "./TeacherClassDetailPage";

export const NameContext=createContext()

function Router() {
  const [Name, setName] = useState('')
  return (
    <div>
      <NameContext.Provider value={[Name,setName]}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavigationBar />
                <Main />
                <Footer/>
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <NavigationBar />
                <Signup />
                <Footer/>
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <NavigationBar />
                <Login />
                <Footer/>
              </>
            }
          />
          <Route
            path="/studentsignup"
            element={
              <>
                <NavigationBar />
                <StudentSignup />
                <Footer/>
              </>
            }
          />
          <Route
            path="/studentlogin"
            element={
              <>
                <NavigationBar />
                <StudentLogin />
                <Footer/>
              </>
            }
          />
          <Route
            path="/addclass/:Email"
            element={
              <>
                <NavigationBar />
                <ClassroomCreation />
                <Footer/>
              </>
            }
          />
          <Route
            path="/home/:Email"
            element={
              <>
                <NavigationBar />
                <TeacherHomepage />
                <Footer/>
              </>
            }
          />
          <Route
            path="/joinclass/:Email"
            element={
              <>
                <NavigationBar />
                <ClassroomJoin />
                <Footer/>
              </>
            }
          />
          <Route
            path="/studenthomepage/:Email"
            element={
              <>
                <NavigationBar />
                <StudentHomepage />
                <Footer/>
              </>
            }
          />
          <Route
            path="/studentclassroompage/:Email/:uniqueLink"
            element={
              <>
                <NavigationBar />
                <ClassroomComponent />
                <Footer/>
              </>
            }
          />
          <Route
            path="/teacherclassroompage/:Email/:uniqueLink"
            element={
              <>
                <NavigationBar />
                <TeacherClassroom />
                <Footer/>
              </>
            }
          />
          <Route
            path="/teachermaterialget/:uniqueLink"
            element={
              <>
                <NavigationBar />
                <MaterialList />
                <Footer/>
              </>
            }
          />
          <Route
            path="/studentmaterial/:uniqueLink"
            element={
              <>
                <NavigationBar />
                <StudentMaterialList />
                <Footer/>
              </>
            }
          />
          <Route
            path="/studentlist/:uniqueLink"
            element={
              <>
                <NavigationBar />
                <StudentList />
                <Footer/>
              </>
            }
          />
          <Route
            path="/studentassignmentlist/:Email/:uniqueLink"
            element={
              <>
                <NavigationBar />
                <StudentAssignmentList />
                <Footer/>
              </>
            }
          />
          <Route
            path="/assignmentlist/:uniqueLink"
            element={
              <>
                <NavigationBar />
                <AssignmentList />
                <Footer/>
              </>
            }
          />
          <Route
            path="/studentAssUpload/:Email/:uniqueLink/:topic"
            element={
              <>
                <NavigationBar />
                <StudentAssignmentUpload />
                <Footer/>
              </>
            }
          />
          <Route
            path="/assignmentsubmittedstudents/:uniqueLink/:topic"
            element={
              <>
                <NavigationBar />
                <SubmittedStudents />
                <Footer/>
              </>
            }
          />
          <Route
            path="/UpdateClassroom/:uniqueLink"
            element={
              <>
                <NavigationBar />
                <ClassroomUpdate />
                <Footer/>
              </>
            }
          />
          <Route
            path="/chatroom/:Email/:uniqueLink"
            element={
              <>
                <NavigationBar />
                <YourComponent/>
                {/* <Footer/> */}
              </>
            }
          />
          <Route
            path="/studentclassroomDetails/:Email"
            element={
              <>
                <NavigationBar />
                <StudentClassDetailPage/>
                <Footer/>
              </>
            }
          />
          <Route
            path="/teacherclassroomDetails/:Email"
            element={
              <>
                <NavigationBar />
                <TeacherClassDetailPage/>
                <Footer/>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
      </NameContext.Provider>
    </div>
  );
}

export default Router;
