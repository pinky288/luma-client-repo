import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx"; 
import Hero from "../components/Hero.jsx"; 
import CourseList from "../components/CourseList.jsx"; 
import CourseDetails from "../pages/CourseDetails.jsx";
import AllCourses from "../pages/AllCourses.jsx";
import FeatureBento from "../components/FeatureBento.jsx";
import TechMarquee from "../components/TechMarquee.jsx";
import LiveStats from "../components/LiveStats.jsx";
import Roadmap from "../components/Roadmap.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Instructors from "../pages/Instructors.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import MyEnrolledCourses from "../pages/MyEnrolledCourses.jsx";
import StudentLayout from "../layouts/StudentLayout.jsx";
import DashboardOverview from "../pages/DashboardOverview.jsx";
import ProfileSettings from "../pages/ProfileSettings.jsx";
import CoursePlayer from "../pages/CoursePlayer.jsx";
import Wishlist from "../pages/Wishlist.jsx";
import OrderHistory from "../pages/OrderHistory.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      {
        path: "/",
        element: (
          <>
            <Hero />
            <FeatureBento />
            <CourseList />
            <LiveStats />
            <Roadmap />
            <Testimonials />
            <TechMarquee />
          </>
        ), 
      },
      {
        path: "course/:id", 
        element: <CourseDetails />,
        loader: ({params}) => fetch(`http://localhost:5000/courses/${params.id}`)
      },
      { path: "courses", element: <AllCourses /> },
      { path: "instructors", element: <Instructors /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
  path: "/dashboard",
  element: <StudentLayout />, 
  children: [
    { index: true, element: <DashboardOverview /> },
    { path: "overview", element: <DashboardOverview /> },
    { path: "my-courses", element: <MyEnrolledCourses /> },
    { path: "profile", element: <ProfileSettings /> },
    { path: "wishlist", element: <Wishlist/> },
    { path: "payments", element: <OrderHistory /> },
    ],
  },
    {
    path: "/watch/:id", 
    element: <CoursePlayer />
  }
  
]); 