import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Box, 
  Breadcrumbs, 
  Typography, 
  Link as MuiLink,
  IconButton,
  Avatar,
  Badge,
  LinearProgress,
  Chip,
  Collapse,
  Grid,
  Divider,
  Tooltip,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  NavigateNext as ChevronRight,
  KeyboardArrowDown as ChevronDown,
  AccessTime as Clock,
  Group as Users,
  BarChart as BarChart2,
  Notifications as Bell,
  Logout as LogOut,
  CalendarToday as Calendar,
  EmojiEvents as Award,
  Person as Person,
  Info as InfoIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

const StyledNav = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderBottom: '1px solid #e0e0e0',
  marginBottom: theme.spacing(3),
  width: '100%'
}));

const TopBar = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 4),
  borderBottom: '1px solid #e0e0e0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1440px'
}));

const NavLink = styled(Link)(({ theme, active }) => ({
  color: active ? '#cc0000' : '#333',
  textDecoration: 'none',
  padding: theme.spacing(1),
  paddingLeft: '28px',
  paddingRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    color: '#cc0000',
    backgroundColor: 'rgba(204, 0, 0, 0.04)'
  },
  '&.MuiBreadcrumbs-li': {
    padding: 0
  }
}));

const AssessmentDetailsPanel = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 4),
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid #e0e0e0',
  '& > div': {
    maxWidth: '1440px'
  }
}));

const NavTabs = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(0, 0),
  borderBottom: '1px solid #e0e0e0',
  maxWidth: '1440px',
  marginLeft: theme.spacing(4)
}));

function AssessmentNav({ customerName }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [showAssessmentDetails, setShowAssessmentDetails] = useState(false);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'info',
      message: 'New comment added to TechCorp assessment',
      time: '10 minutes ago'
    },
    {
      id: 2,
      type: 'success',
      message: 'Data synthesis completed successfully',
      time: '1 hour ago'
    },
    {
      id: 3,
      type: 'warning',
      message: 'Upcoming deadline: Strategy review',
      time: '2 hours ago'
    }
  ]);

  const handleMarkAllAsRead = () => {
    setNotifications([]);
    setNotificationAnchor(null);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'info':
        return <InfoIcon sx={{ color: 'info.main' }} />;
      case 'success':
        return <CheckIcon sx={{ color: 'success.main' }} />;
      case 'warning':
        return <WarningIcon sx={{ color: 'warning.main' }} />;
      default:
        return <InfoIcon />;
    }
  };

  return (
    <StyledNav>
      {/* Top Bar */}
      <TopBar>
        {/* Left: App Info and Assessment */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Breadcrumbs 
            aria-label="breadcrumb" 
            sx={{ 
              mr: 2,
              '& .MuiBreadcrumbs-separator': {
                mx: '10px'
              },
              '& .MuiBreadcrumbs-li': {
                display: 'flex'
              }
            }}
          >
            <NavLink to="/assessments" style={{ padding: 0, display: 'flex', alignItems: 'center' }}>
              <img 
                src="/small_logo.jpg" 
                alt="Logo" 
                style={{ 
                  height: '1em',
                  marginRight: '10px'
                }} 
              />
              Assessments
            </NavLink>
            <Typography 
              color="text.primary"
              sx={{ 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                '&:hover': { color: '#cc0000' }
              }}
              onClick={() => setShowAssessmentDetails(!showAssessmentDetails)}
            >
              {customerName}
              <ChevronDown sx={{ ml: 0.5 }} />
            </Typography>
          </Breadcrumbs>
        </Box>

        {/* Right: User, Alerts, Progress */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {/* Assessment Progress */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Assessment Progress: 47%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Ahead of schedule by 2 days
              </Typography>
            </Box>
            <Box sx={{ width: 100, height: 8, bgcolor: 'grey.200', borderRadius: 4, overflow: 'hidden' }}>
              <LinearProgress 
                variant="determinate" 
                value={47}
                sx={{ 
                  height: '100%',
                  bgcolor: 'grey.200',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: `rgba(204, 0, 0, ${47/100})`,
                    transition: 'background-color 0.3s ease'
                  }
                }}
              />
            </Box>
          </Box>

          {/* Benchmark Indicator */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BarChart2 sx={{ color: 'text.secondary' }} />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Performance: Top 25%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Compared to similar assessments
              </Typography>
            </Box>
          </Box>

          {/* Notification */}
          <IconButton onClick={handleNotificationClick}>
            <Badge badgeContent={notifications.length} color="error">
              <Bell />
            </Badge>
          </IconButton>
          <Popover
            open={Boolean(notificationAnchor)}
            anchorEl={notificationAnchor}
            onClose={handleNotificationClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: {
                width: 320,
                maxHeight: 400,
                overflow: 'auto'
              }
            }}
          >
            <List>
              {notifications.length === 0 ? (
                <ListItem>
                  <ListItemText 
                    primary="No new notifications"
                    sx={{ color: 'text.secondary' }}
                  />
                </ListItem>
              ) : (
                <>
                  <ListItem sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    pr: 2 
                  }}>
                    <ListItemText 
                      primary="Notifications"
                      primaryTypographyProps={{
                        variant: 'subtitle1',
                        fontWeight: 500
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#cc0000',
                        cursor: 'pointer',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                      onClick={handleMarkAllAsRead}
                    >
                      Mark All As Read
                    </Typography>
                  </ListItem>
                  <Divider />
                  {notifications.map((notification) => (
                    <ListItem 
                      key={notification.id}
                      sx={{ 
                        '&:hover': { 
                          bgcolor: 'rgba(0, 0, 0, 0.04)',
                          cursor: 'pointer'
                        }
                      }}
                    >
                      <ListItemIcon>
                        {getNotificationIcon(notification.type)}
                      </ListItemIcon>
                      <ListItemText 
                        primary={notification.message}
                        secondary={notification.time}
                        primaryTypographyProps={{
                          variant: 'body2',
                          sx: { mb: 0.5 }
                        }}
                        secondaryTypographyProps={{
                          variant: 'caption',
                          color: 'text.secondary'
                        }}
                      />
                    </ListItem>
                  ))}
                </>
              )}
            </List>
          </Popover>

          {/* User menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Sarah Johnson
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Senior Consultant
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
              SJ
            </Avatar>
            <IconButton size="small">
              <LogOut />
            </IconButton>
          </Box>
        </Box>
      </TopBar>

      {/* Assessment Details Panel */}
      <Collapse in={showAssessmentDetails}>
        <AssessmentDetailsPanel>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Client Information
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>TC</Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    TechCorp Solutions
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Technology Services • 250-500 employees
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Assessment Details
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Calendar sx={{ color: 'text.secondary', fontSize: 16 }} />
                  <Typography variant="body2">
                    Started: Feb 15, 2025 • Due: Apr 10, 2025
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Award sx={{ color: 'text.secondary', fontSize: 16 }} />
                  <Typography variant="body2">
                    Type: Full Business Transformation Assessment
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Team
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', mr: 1 }}>
                  <Avatar sx={{ width: 28, height: 28, bgcolor: 'success.main', border: '2px solid white' }}>SJ</Avatar>
                  <Avatar sx={{ width: 28, height: 28, bgcolor: 'secondary.main', border: '2px solid white', ml: -1 }}>MR</Avatar>
                  <Avatar sx={{ width: 28, height: 28, bgcolor: 'warning.main', border: '2px solid white', ml: -1 }}>DP</Avatar>
                </Box>
                <Box>
                  <Typography variant="body2">
                    Sarah Johnson (Lead), Michael Rogers, David Patel
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Last activity: Today at 10:23 AM
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </AssessmentDetailsPanel>
      </Collapse>

      {/* Navigation Tabs */}
      <NavTabs>
        <NavLink 
          to={`/assessments/${customerName}/dashboard`}
          active={currentPath.endsWith('/dashboard')}
        >
          Dashboard
        </NavLink>
        <NavLink 
          to={`/assessments/${customerName}/planning`}
          active={currentPath.includes('planning')}
        >
          Planning
        </NavLink>
        <NavLink 
          to={`/assessments/${customerName}/data-synthesis`}
          active={currentPath.includes('data-synthesis')}
        >
          Data Synthesis
        </NavLink>
        <NavLink 
          to={`/assessments/${customerName}/deliverables`}
          active={currentPath.includes('deliverables')}
        >
          Deliverables
        </NavLink>
        <NavLink 
          to={`/assessments/${customerName}/strategy`}
          active={currentPath.includes('strategy')}
        >
          Strategy
        </NavLink>
        <NavLink 
          to={`/assessments/${customerName}/growth`}
          active={currentPath.includes('growth')}
        >
          Growth
        </NavLink>
      </NavTabs>
    </StyledNav>
  );
}

export default AssessmentNav; 