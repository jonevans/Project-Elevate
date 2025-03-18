import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Breadcrumbs, Typography, Link as MuiLink } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledNav = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderBottom: '1px solid #e0e0e0',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3)
}));

const NavLink = styled(Link)(({ theme, active }) => ({
  color: active ? '#cc0000' : '#333',
  textDecoration: 'none',
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    color: '#cc0000',
    backgroundColor: 'rgba(204, 0, 0, 0.04)'
  }
}));

function AssessmentNav({ customerName }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <StyledNav>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <NavLink to="/assessments">
          Assessments
        </NavLink>
        <Typography color="text.primary">{customerName}</Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', gap: 2 }}>
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
      </Box>
    </StyledNav>
  );
}

export default AssessmentNav; 