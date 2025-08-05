import * as React from 'react';
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Badge
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeColor = 'primary';

  const unreadNotices = 4;
  const pendingComplaints = 2;

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate('/login');
  };

  const navItems = [
    { to: '/Admin', label: 'Home', icon: <HomeIcon />, match: ["/Admin"] },
    { to: '/Admin/classes', label: 'Classes', icon: <ClassOutlinedIcon />, matchPrefix: '/Admin/classes' },
    { to: '/Admin/subjects', label: 'Subjects', icon: <AssignmentIcon />, matchPrefix: '/Admin/subjects' },
    { to: '/Admin/teachers', label: 'Teachers', icon: <SupervisorAccountOutlinedIcon />, matchPrefix: '/Admin/teachers' },
    { to: '/Admin/students', label: 'Students', icon: <PersonOutlineIcon />, matchPrefix: '/Admin/students' },
    {
      to: '/Admin/notices',
      label: 'Notices',
      icon: (
        <Badge badgeContent={unreadNotices} color="secondary">
          <AnnouncementOutlinedIcon />
        </Badge>
      ),
      matchPrefix: '/Admin/notices'
    },
     {
      to: '/Admin/complains',
      label: 'Complaints',
      icon: (
        <Badge badgeContent={pendingComplaints} color="error">
          <ReportIcon />
        </Badge>
      ),
      matchPrefix: '/Admin/complains'
    }
  ];

  const userItems = [
    { to: '/Admin/profile', label: 'Profile', icon: <AccountCircleOutlinedIcon />, matchPrefix: '/Admin/profile' },
    { to: '/ChoosePage', label: 'Logout', icon: <ExitToAppIcon />, action: handleLogout }
  ];

  const isActive = (path, exactMatch, matchPrefix) => {
    if (exactMatch) return path === location.pathname;
    if (matchPrefix) return location.pathname.startsWith(matchPrefix);
    return false;
  };

  return (
    <div className="h-full w-full bg-white shadow-lg rounded-lg p-2 text-sm"
    >
      <div className="space-y-1">
        {navItems.map((item, index) => (
          <ListItemButton
            key={index}
            component={Link}
            to={item.to}
            className={`rounded-md hover:bg-purple-50 transition-all duration-200 ${
              isActive(item.to, item.match?.includes(location.pathname), item.matchPrefix) ? 'bg-purple-100' : ''
            }`}
          >
            <ListItemIcon className="text-purple-700">
              {React.cloneElement(item.icon, {
                color: isActive(item.to, item.match?.includes(location.pathname), item.matchPrefix)
                  ? activeColor
                  : 'inherit'
              })}
            </ListItemIcon>
            <ListItemText primary={item.label} className="text-gray-800" />
          </ListItemButton>
        ))}
      </div>

      <Divider className="my-3" />

      <ListSubheader component="div" inset className="text-gray-500 font-semibold text-xs">
        User
      </ListSubheader>

      <div className="space-y-1">
        {userItems.map((item, index) => (
          <ListItemButton
            key={index}
            component={item.action ? "button" : Link}
            to={item.to}
            onClick={item.action}
            className={`rounded-md hover:bg-purple-50 transition-all duration-200 ${
              isActive(item.to, false, item.matchPrefix) ? 'bg-purple-100' : ''
            }`}
          >
            <ListItemIcon className="text-purple-700">
              {React.cloneElement(item.icon, {
                color: isActive(item.to, false, item.matchPrefix) ? activeColor : 'inherit'
              })}
            </ListItemIcon>
            <ListItemText primary={item.label} className="text-gray-800" />
          </ListItemButton>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
