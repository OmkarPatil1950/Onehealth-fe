// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/app',
    icon: icon('ic_analytics'),
  },


  {
    title: 'Schedule',
    path: '/schedule',
    icon: icon('ic_schedule'),
  },
  {
    title: 'Appointments',
    path: '/appointment',
    icon: icon('ic_appointment'),
  },
  {
    title: 'Calender',
    path: '/calender',
    icon: icon('ic_cart'),
  },
  {
    title: 'Patients',
    path: '/patients',
    icon: icon('ic_user'),
  },
  {
    title: 'Online Consultation',
    path: '/onlineConsult',
    icon: icon('ic_online'),
  },
 
  {
    title: 'Documents',
    path: '/documents',
    icon: icon('ic_lock'),
  },
 
  {
    title: 'Blogs',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
