import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
// import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import Appoinments from './pages/Appointment';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import Calender from './pages/Calender';
import DashboardAppPage from './pages/DashboardAppPage';
// import Patients from './pages/Patients'
import Payments from './pages/Payments'
import Documents from './pages/DocumentUpdate'
import ViewMore from './pages/viewMore';
// import DoctorProfilePage from './pages/DoctorProfilePage';
import Addmoreinput from './pages/prescription';
import AddDoctorForm from './pages/Address';
import FeesStructure from './pages/Fees';
import DoctorSchedulePage from './pages/schedule';

import DoctorProfile from './pages/DoctorProfilePage';
import Profile from './pages/GetDoctorProfile';
import BankDetailsForm from './pages/BankDetails';
import BankDetailsInfo from './pages/BankDetailsInfo';
import PatientHistory from './pages/PatientHistory';
import Request from './pages/Request';
import UpdateProfile from './pages/DoctorProfileUpdate';
import Index from './pages/Video';
import BankDetailsUpdate from './pages/backDetailsUpdate';
import DocumentSave from './pages/DocumentSave';
import AddressCard from './pages/showAddress';
import UpdateDoctorForm from './pages/updateAddress';
import DisplaySchedule from './pages/DisplaySchedule';
import UpdateDoctorSchedulePage from './pages/updateSchedule';
/// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/" />, index: true },
        { path: '/app', element: <DashboardAppPage /> },
        { path: 'calender', element: <Calender /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'payments', element: <Payments /> },
        { path: 'documents', element: <Documents /> },
        { path: 'appointment', element: <Appoinments /> },
        { path: 'viewmore', element: <ViewMore/> },
        { path: 'viewprofile', element: <Profile/> },
        { path: 'profile', element: <DoctorProfile/> },
        { path: 'updateprofile', element: <UpdateProfile/> },
        { path: 'saveprofile', element: <DocumentSave/> },
        { path: 'pdf', element: <Addmoreinput/> },
        { path: 'addClinic', element: <AddDoctorForm/> },
        { path: 'fee', element: <FeesStructure/> },
        { path: 'schedule', element: <DoctorSchedulePage/> },
        { path: 'bank', element: <BankDetailsForm/> },
        { path: 'viewbankdetails', element: <BankDetailsInfo/> },      
        { path: 'patients', element: <PatientHistory/> },
        { path: 'req', element: <Request/> },
        { path: 'onlineConsult', element: <Index/> },
        { path: 'bankdetailsupdate', element: <BankDetailsUpdate/> },
        { path: 'showaddress', element: <AddressCard/> },
        { path: 'updateaddress', element: <UpdateDoctorForm/> },
        { path: 'myschedule', element: <DisplaySchedule/> },
        { path: 'updateschedule', element: <UpdateDoctorSchedulePage/> },
      ],
    },
   
    {
      // element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
