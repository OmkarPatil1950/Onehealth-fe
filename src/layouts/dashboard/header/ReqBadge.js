import * as React from 'react';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';
import {  useSelector } from 'react-redux/es/hooks/useSelector';



export default function SimpleBadge() {

  const requests = useSelector(state => state.Request); // Map state to props


  console.log(requests,'requests from the badge')
  const requestCount = requests.length;
  console.log(requestCount)
//  console.log(requests[0].length,'--------------requests slice')
  return (
    <Link to="/req" style={{ textDecoration: 'none' }}>
        <Badge badgeContent={requestCount} color="primary" sx={{ margin: 2 }}>
          <MailIcon color="action" />
        </Badge>
      </Link>
  );
}