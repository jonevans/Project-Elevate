import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  LinearProgress,
  Divider,
  Stack,
  Modal,
  CircularProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  BarChart as BarChartIcon,
  AccessTime as ClockIcon,
  Group as GroupIcon,
  Add as AddIcon,
  ChevronRight as ChevronRightIcon,
  CheckCircle as CheckCircleIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as DollarIcon,
  Business as BuildingIcon,
  Warning as AlertIcon,
  Sync as SyncIcon
} from '@mui/icons-material';

const AssessmentCard = ({ assessment, onOpen }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'In Progress': return { bg: 'rgba(0, 0, 0, 0.04)', text: 'rgba(0, 0, 0, 0.87)' };
      case 'Scheduled': return { bg: 'rgba(0, 0, 0, 0.04)', text: 'rgba(0, 0, 0, 0.87)' };
      case 'Completed': return { bg: 'rgba(0, 0, 0, 0.04)', text: 'rgba(0, 0, 0, 0.87)' };
      default: return { bg: 'rgba(0, 0, 0, 0.04)', text: 'rgba(0, 0, 0, 0.87)' };
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#cc0000';
      case 'medium': return 'rgba(0, 0, 0, 0.6)';
      case 'low': return 'rgba(0, 0, 0, 0.38)';
      default: return 'rgba(0, 0, 0, 0.38)';
    }
  };

  const getTeamMemberColor = (index) => {
    const colors = ['#2196f3', '#4caf50', '#ff9800'];
    return colors[index % colors.length];
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        cursor: 'pointer',
        '&:hover': { 
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          borderColor: '#757575'
        },
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.08)',
        transition: 'all 0.2s ease-in-out',
        borderRadius: '12px'
      }}
      onClick={() => onOpen(assessment)}
    >
      <Grid container spacing={3}>
        {/* Left: Basic Info */}
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box 
              sx={{ 
                width: 10, 
                height: 10, 
                borderRadius: '50%', 
                bgcolor: getPriorityColor(assessment.priority),
                mr: 2 
              }} 
            />
            <Typography 
              variant="h5" 
              sx={{ 
                color: '#212121',
                mr: 2,
                fontWeight: 600,
                letterSpacing: '-0.5px'
              }}
            >
              {assessment.name}
            </Typography>
            <Chip 
              label={assessment.status}
              size="small"
              sx={{ 
                bgcolor: getStatusColor(assessment.status).bg,
                color: getStatusColor(assessment.status).text,
                fontWeight: 500,
                height: '24px',
                '& .MuiChip-label': {
                  px: 1.5,
                  fontSize: '0.75rem'
                }
              }}
            />
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <BuildingIcon sx={{ color: '#757575', mr: 1.5, fontSize: '1.25rem' }} />
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {assessment.industry}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarIcon sx={{ color: '#757575', mr: 1.5, fontSize: '1.25rem' }} />
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Started: {assessment.startDate}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <DollarIcon sx={{ color: '#757575', mr: 1.5, fontSize: '1.25rem' }} />
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                  ${assessment.contractValue.toLocaleString()}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <GroupIcon sx={{ color: '#757575', mr: 1.5, fontSize: '1.25rem' }} />
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Contact: {assessment.primaryContact}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AlertIcon sx={{ color: '#757575', mr: 1.5, fontSize: '1.25rem' }} />
                <Typography variant="body1" color="text.primary" sx={{ fontWeight: 500 }}>
                  {assessment.nextAction}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Right: Progress and Team */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
            {assessment.status !== 'Scheduled' && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    Progress: {assessment.progress}%
                  </Typography>
                  {assessment.aheadOfSchedule !== 0 && (
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#757575' }}>
                      Ahead by {assessment.aheadOfSchedule} days
                    </Typography>
                  )}
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={assessment.progress}
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    bgcolor: 'rgba(204, 0, 0, 0.08)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#cc0000'
                    }
                  }}
                />
              </Box>
            )}

            {assessment.performance && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                <BarChartIcon sx={{ color: '#757575', mr: 1.5, fontSize: '1.25rem' }} />
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Performance:{' '}
                  <Typography component="span" sx={{ fontWeight: 600, color: '#757575' }}>
                    {assessment.performance}
                  </Typography>
                </Typography>
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3 }}>
              <Stack direction="row" spacing={-1}>
                {assessment.team.map((member, index) => (
                  <Avatar
                    key={index}
                    sx={{
                      width: 32,
                      height: 32,
                      border: '2px solid white',
                      bgcolor: `${getTeamMemberColor(index)}`,
                      color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: 600
                    }}
                  >
                    {member}
                  </Avatar>
                ))}
              </Stack>
              <Button
                endIcon={<ChevronRightIcon />}
                sx={{ 
                  color: '#757575',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: 'rgba(158, 158, 158, 0.04)'
                  }
                }}
              >
                Open
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

function AssessmentList() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('all');
  const [filterActive, setFilterActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const userName = "Sarah"; // This would typically come from a user context or prop

  // Mock data for assessments
  const assessments = [
    {
      id: 1,
      name: 'TechCorp Solutions',
      industry: 'Technology',
      status: 'In Progress',
      startDate: '2/29/2024',
      contractValue: 75000,
      primaryContact: 'John Smith',
      progress: 47,
      aheadOfSchedule: 2,
      team: ['SJ', 'MR', 'DP'],
      performance: 'Top 25%',
      nextAction: 'Complete Data Synthesis by 3/15/2024',
      priority: 'high'
    },
    {
      id: 2,
      name: 'Healthcare Plus',
      industry: 'Healthcare',
      status: 'Scheduled',
      startDate: '3/31/2024',
      contractValue: 95000,
      primaryContact: 'Sarah Johnson',
      progress: 0,
      aheadOfSchedule: 0,
      team: ['SJ', 'TK'],
      performance: '',
      nextAction: 'Kickoff meeting on 3/31/2024',
      priority: 'medium'
    },
    {
      id: 3,
      name: 'Manufacturing Pro',
      industry: 'Manufacturing',
      status: 'Completed',
      startDate: '2/14/2024',
      contractValue: 120000,
      primaryContact: 'Mike Wilson',
      progress: 100,
      aheadOfSchedule: 3,
      team: ['MR', 'DP', 'AK'],
      performance: 'Top 10%',
      nextAction: 'Schedule follow-up call',
      priority: 'low'
    }
  ];

  const handleOpenAssessment = (assessment) => {
    navigate(`/assessments/${encodeURIComponent(assessment.name)}/dashboard`);
  };

  // Filter assessments based on view mode and search query
  const getFilteredAssessments = () => {
    let filtered = [...assessments];

    // Filter by status
    if (viewMode !== 'all') {
      const statusMap = {
        inProgress: 'In Progress',
        scheduled: 'Scheduled',
        completed: 'Completed'
      };
      filtered = filtered.filter(assessment => assessment.status === statusMap[viewMode]);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(assessment => 
        assessment.name.toLowerCase().includes(query) ||
        assessment.industry.toLowerCase().includes(query) ||
        assessment.primaryContact.toLowerCase().includes(query) ||
        assessment.nextAction.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  // Get filtered assessments
  const filteredAssessments = getFilteredAssessments();

  // Function to handle sync process
  const handleSync = () => {
    setSyncModalOpen(true);
    // Here you would typically make an API call to sync data
    // For demo purposes, we'll use a timeout to simulate the sync
    setTimeout(() => {
      setSyncModalOpen(false);
    }, 3000);
  };

  return (
    <Box sx={{ p: 2, bgcolor: '#f5f7fa', minHeight: '100vh' }}>
      {/* Sync Modal */}
      <Modal
        open={syncModalOpen}
        aria-labelledby="sync-modal-title"
        aria-describedby="sync-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: '12px',
          boxShadow: 24,
          p: 4,
          textAlign: 'center'
        }}>
          <CircularProgress sx={{ color: '#cc0000', mb: 2 }} />
          <Typography id="sync-modal-title" variant="h6" sx={{ mb: 1, color: '#212121', fontWeight: 600 }}>
            Grabbing the latest data, please hold
          </Typography>
          <Typography id="sync-modal-description" sx={{ color: 'text.secondary' }}>
            This may take a few moments...
          </Typography>
        </Box>
      </Modal>

      {/* Welcome Message with Sync Button */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 3,
          borderRadius: '12px',
          border: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.08)',
          bgcolor: 'white',
          position: 'relative'
        }}
      >
        <Box sx={{ pr: 12 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 2,
              fontWeight: 600,
              letterSpacing: '-0.5px',
              color: '#212121'
            }}
          >
            Welcome to Project Elevate, {userName}
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ 
              fontSize: '1.1rem',
              lineHeight: 1.6
            }}
          >
            Project Elevate helps you create consistent, high-quality assessments while saving valuable time. 
            Select an assessment below to continue your work, or create a new one to start the journey. Our AI-assisted 
            platform will guide you through each step of the process, from data collection to final recommendations.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<SyncIcon />}
          onClick={handleSync}
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            bgcolor: '#cc0000',
            '&:hover': { bgcolor: '#b30000' },
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            py: 1
          }}
        >
          Sync Assessments
        </Button>
      </Paper>

      {/* Actions and Filters */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button
            variant={viewMode === 'all' ? 'contained' : 'outlined'}
            onClick={() => setViewMode('all')}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1,
              color: viewMode === 'all' ? 'white' : 'rgba(0, 0, 0, 0.87)',
              borderColor: 'rgba(0, 0, 0, 0.23)',
              bgcolor: viewMode === 'all' ? '#cc0000' : 'transparent',
              '&:hover': {
                bgcolor: viewMode === 'all' ? '#b30000' : 'rgba(0, 0, 0, 0.04)',
                borderColor: viewMode === 'all' ? '#b30000' : 'rgba(0, 0, 0, 0.23)'
              }
            }}
          >
            All
          </Button>
          <Button
            variant={viewMode === 'inProgress' ? 'contained' : 'outlined'}
            startIcon={<ClockIcon />}
            onClick={() => setViewMode('inProgress')}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1,
              color: viewMode === 'inProgress' ? 'white' : 'rgba(0, 0, 0, 0.87)',
              borderColor: 'rgba(0, 0, 0, 0.23)',
              bgcolor: viewMode === 'inProgress' ? '#cc0000' : 'transparent',
              '&:hover': {
                bgcolor: viewMode === 'inProgress' ? '#b30000' : 'rgba(0, 0, 0, 0.04)',
                borderColor: viewMode === 'inProgress' ? '#b30000' : 'rgba(0, 0, 0, 0.23)'
              }
            }}
          >
            In Progress
          </Button>
          <Button
            variant={viewMode === 'scheduled' ? 'contained' : 'outlined'}
            startIcon={<CalendarIcon />}
            onClick={() => setViewMode('scheduled')}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1,
              color: viewMode === 'scheduled' ? 'white' : 'rgba(0, 0, 0, 0.87)',
              borderColor: 'rgba(0, 0, 0, 0.23)',
              bgcolor: viewMode === 'scheduled' ? '#cc0000' : 'transparent',
              '&:hover': {
                bgcolor: viewMode === 'scheduled' ? '#b30000' : 'rgba(0, 0, 0, 0.04)',
                borderColor: viewMode === 'scheduled' ? '#b30000' : 'rgba(0, 0, 0, 0.23)'
              }
            }}
          >
            Scheduled
          </Button>
          <Button
            variant={viewMode === 'completed' ? 'contained' : 'outlined'}
            startIcon={<CheckCircleIcon />}
            onClick={() => setViewMode('completed')}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1,
              color: viewMode === 'completed' ? 'white' : 'rgba(0, 0, 0, 0.87)',
              borderColor: 'rgba(0, 0, 0, 0.23)',
              bgcolor: viewMode === 'completed' ? '#cc0000' : 'transparent',
              '&:hover': {
                bgcolor: viewMode === 'completed' ? '#b30000' : 'rgba(0, 0, 0, 0.04)',
                borderColor: viewMode === 'completed' ? '#b30000' : 'rgba(0, 0, 0, 0.23)'
              }
            }}
          >
            Completed
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <TextField
            placeholder="Search assessments..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                bgcolor: 'white',
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#cc0000'
                }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'rgba(0, 0, 0, 0.54)' }} />
                </InputAdornment>
              ),
            }}
          />
          <IconButton
            onClick={() => setFilterActive(!filterActive)}
            sx={{
              border: '1px solid',
              borderColor: filterActive ? '#cc0000' : 'rgba(0, 0, 0, 0.23)',
              bgcolor: filterActive ? 'rgba(204, 0, 0, 0.04)' : 'white',
              '&:hover': {
                bgcolor: filterActive ? 'rgba(204, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <FilterIcon sx={{ color: filterActive ? '#cc0000' : 'rgba(0, 0, 0, 0.54)' }} />
          </IconButton>
        </Box>
      </Box>

      {/* Show message when no results found */}
      {filteredAssessments.length === 0 && (
        <Paper 
          elevation={0}
          sx={{ 
            p: 4, 
            mb: 4,
            borderRadius: '12px',
            border: '1px solid',
            borderColor: 'rgba(0, 0, 0, 0.08)',
            bgcolor: 'white',
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              color: 'rgba(0, 0, 0, 0.6)',
              mb: 1
            }}
          >
            No assessments found
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
          >
            Try adjusting your search or filters to find what you're looking for
          </Typography>
        </Paper>
      )}

      {/* Assessment Cards */}
      <Stack spacing={3}>
        {filteredAssessments.map((assessment) => (
          <AssessmentCard
            key={assessment.id}
            assessment={assessment}
            onOpen={handleOpenAssessment}
          />
        ))}
      </Stack>

      {/* Recent Activity Feed */}
      <Paper 
        elevation={0}
        sx={{ 
          mt: 4, 
          p: 3,
          borderRadius: '12px',
          border: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.08)',
          bgcolor: 'white'
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 3, 
            fontWeight: 600,
            letterSpacing: '-0.5px',
            color: '#212121'
          }}
        >
          Recent Activity
        </Typography>
        <Stack spacing={2}>
          <Box sx={{ py: 1.5, borderBottom: '1px solid', borderColor: 'rgba(0, 0, 0, 0.08)' }}>
            <Typography variant="body1">
              <Typography component="span" sx={{ fontWeight: 600, color: '#212121' }}>
                TechCorp Solutions
              </Typography>
              {' - Data Synthesis phase started (2 hours ago)'}
            </Typography>
          </Box>
          <Box sx={{ py: 1.5, borderBottom: '1px solid', borderColor: 'rgba(0, 0, 0, 0.08)' }}>
            <Typography variant="body1">
              <Typography component="span" sx={{ fontWeight: 600, color: '#212121' }}>
                Healthcare Plus
              </Typography>
              {' - Assessment scheduled for March 31 (Yesterday)'}
            </Typography>
          </Box>
          <Box sx={{ py: 1.5 }}>
            <Typography variant="body1">
              <Typography component="span" sx={{ fontWeight: 600, color: '#212121' }}>
                Manufacturing Pro
              </Typography>
              {' - Final report delivered (3 days ago)'}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}

export default AssessmentList; 