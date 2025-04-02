import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Modal,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import {
  Business,
  Category,
  Groups,
  AttachMoney,
  Person,
  Description,
  Assessment,
  Email,
  Timeline,
  ContactPhone,
  Close as CloseIcon
} from '@mui/icons-material';
import AssessmentNav from '../components/AssessmentNav';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

const InfoCard = ({ title, icon, children }) => (
  <Paper sx={{ p: 3, height: '100%' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      {React.cloneElement(icon, { sx: { color: '#cc0000' } })}
      <Typography variant="h6" sx={{ ml: 1 }}>
        {title}
      </Typography>
    </Box>
    <Divider sx={{ mb: 2 }} />
    {children}
  </Paper>
);

function AssessmentDashboard() {
  const { customerName } = useParams();
  const [openStakeholderModal, setOpenStakeholderModal] = useState(false);
  const [openInteractionsModal, setOpenInteractionsModal] = useState(false);
  const [newStakeholder, setNewStakeholder] = useState({
    name: '',
    role: '',
    email: '',
    phone: ''
  });

  // Mock data - replace with actual data from your backend
  const [stakeholders, setStakeholders] = useState([
    { name: 'John Smith', role: 'CTO', email: 'john@example.com', phone: '555-0123' },
    { name: 'Sarah Johnson', role: 'IT Director', email: 'sarah@example.com', phone: '555-0124' }
  ]);

  const handleAddStakeholder = () => {
    if (newStakeholder.name && newStakeholder.role) {
      setStakeholders([...stakeholders, newStakeholder]);
      setNewStakeholder({ name: '', role: '', email: '', phone: '' });
      setOpenStakeholderModal(false);
    }
  };

  const handleStakeholderChange = (field) => (event) => {
    setNewStakeholder({
      ...newStakeholder,
      [field]: event.target.value
    });
  };

  const companyInfo = {
    name: customerName,
    industry: 'Technology',
    size: 'Enterprise',
    revenue: '$50M - $100M',
    employeeCount: '250-500'
  };

  const salesTeam = [
    { name: 'Mike Wilson', role: 'Account Executive', email: 'mike@impact.com', phone: '555-0125' },
    { name: 'Lisa Brown', role: 'Solutions Architect', email: 'lisa@impact.com', phone: '555-0126' }
  ];

  const assessmentScope = {
    contractValue: '$75,000',
    services: ['Network Assessment', 'Security Audit', 'Cloud Migration Planning'],
    timeline: '3 months'
  };

  const interactions = [
    { type: 'Presentation', date: '2024-03-10', title: 'Initial Proposal' },
    { type: 'Meeting', date: '2024-03-12', title: 'Technical Deep Dive' },
    { type: 'Email', date: '2024-03-15', title: 'Follow-up Questions' }
  ];

  return (
    <Box>
      <AssessmentNav customerName={customerName} />
      
      <Box>
        <Grid container spacing={3}>
          {/* Company Information */}
          <Grid item xs={12}>
            <InfoCard title="Company Information" icon={<Business />}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Business sx={{ mr: 1, color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Company Name</Typography>
                      <Typography variant="body1">{companyInfo.name}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Category sx={{ mr: 1, color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Industry</Typography>
                      <Typography variant="body1">{companyInfo.industry}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Business sx={{ mr: 1, color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Size</Typography>
                      <Typography variant="body1">{companyInfo.size}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AttachMoney sx={{ mr: 1, color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Revenue</Typography>
                      <Typography variant="body1">{companyInfo.revenue}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Groups sx={{ mr: 1, color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Employee Count</Typography>
                      <Typography variant="body1">{companyInfo.employeeCount}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </InfoCard>
          </Grid>

          {/* Assessment Scope */}
          <Grid item xs={12}>
            <InfoCard title="Assessment Scope" icon={<Assessment />}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AttachMoney sx={{ mr: 1, color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Contract Value</Typography>
                      <Typography variant="body1">{assessmentScope.contractValue}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Timeline sx={{ mr: 1, color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Timeline</Typography>
                      <Typography variant="body1">{assessmentScope.timeline}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Description sx={{ mr: 1, color: 'text.secondary', mt: 0.5 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Services Sold</Typography>
                      <Typography variant="body1" sx={{ 
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {assessmentScope.services.join(', ')}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </InfoCard>
          </Grid>

          {/* Key Stakeholders */}
          <Grid item xs={12}>
            <InfoCard title="Key Stakeholders" icon={<Person />}>
              <Grid container spacing={2}>
                {stakeholders.map((stakeholder, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', p: 1 }}>
                      <Person sx={{ mr: 2, color: 'text.secondary' }} />
                      <Box>
                        <Typography variant="subtitle1">{stakeholder.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{stakeholder.role}</Typography>
                        <Typography variant="body2">{stakeholder.email}</Typography>
                        <Typography variant="body2">{stakeholder.phone}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Button 
                variant="outlined"
                sx={{ 
                  mt: 2,
                  color: '#cc0000',
                  borderColor: '#cc0000',
                  '&:hover': {
                    borderColor: '#aa0000',
                    backgroundColor: 'rgba(204, 0, 0, 0.04)'
                  }
                }}
                onClick={() => setOpenStakeholderModal(true)}
              >
                Add Stakeholder
              </Button>
            </InfoCard>
          </Grid>

          {/* Sales Team */}
          <Grid item xs={12}>
            <InfoCard title="Sales Team" icon={<Groups />}>
              <Grid container spacing={2}>
                {salesTeam.map((member, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', p: 1 }}>
                      <Person sx={{ mr: 2, color: 'text.secondary' }} />
                      <Box>
                        <Typography variant="subtitle1">{member.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{member.role}</Typography>
                        <Typography variant="body2">{member.email}</Typography>
                        <Typography variant="body2">{member.phone}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </InfoCard>
          </Grid>

          {/* Prior Interactions */}
          <Grid item xs={12}>
            <InfoCard title="Prior Interactions" icon={<Email />}>
              <Grid container spacing={2}>
                {interactions.map((interaction, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', p: 1 }}>
                      {interaction.type === 'Email' ? <Email sx={{ mr: 2, color: 'text.secondary' }} /> : 
                       interaction.type === 'Meeting' ? <Groups sx={{ mr: 2, color: 'text.secondary' }} /> : 
                       <Description sx={{ mr: 2, color: 'text.secondary' }} />}
                      <Box>
                        <Typography variant="subtitle1">{interaction.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {interaction.type} - {new Date(interaction.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Button 
                variant="outlined"
                sx={{ 
                  mt: 2,
                  color: '#cc0000',
                  borderColor: '#cc0000',
                  '&:hover': {
                    borderColor: '#aa0000',
                    backgroundColor: 'rgba(204, 0, 0, 0.04)'
                  }
                }}
                onClick={() => setOpenInteractionsModal(true)}
              >
                View All Interactions
              </Button>
            </InfoCard>
          </Grid>
        </Grid>
      </Box>

      {/* Add Stakeholder Modal */}
      <Dialog 
        open={openStakeholderModal} 
        onClose={() => setOpenStakeholderModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Add New Stakeholder
          <IconButton
            aria-label="close"
            onClick={() => setOpenStakeholderModal(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'text.secondary'
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={newStakeholder.name}
              onChange={handleStakeholderChange('name')}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Role"
              value={newStakeholder.role}
              onChange={handleStakeholderChange('role')}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              value={newStakeholder.email}
              onChange={handleStakeholderChange('email')}
              margin="normal"
              type="email"
            />
            <TextField
              fullWidth
              label="Phone"
              value={newStakeholder.phone}
              onChange={handleStakeholderChange('phone')}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenStakeholderModal(false)}
            sx={{ color: 'text.secondary' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAddStakeholder}
            sx={{ 
              color: '#cc0000',
              '&:hover': {
                backgroundColor: 'rgba(204, 0, 0, 0.04)'
              }
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* View All Interactions Modal */}
      <Dialog
        open={openInteractionsModal}
        onClose={() => setOpenInteractionsModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          All Interactions
          <IconButton
            aria-label="close"
            onClick={() => setOpenInteractionsModal(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'text.secondary'
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <List>
            {interactions.map((interaction, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {interaction.type === 'Email' ? <Email color="action" /> : 
                   interaction.type === 'Meeting' ? <Groups color="action" /> : 
                   <Description color="action" />}
                </ListItemIcon>
                <ListItemText
                  primary={interaction.title}
                  secondary={`${interaction.type} - ${new Date(interaction.date).toLocaleDateString()}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenInteractionsModal(false)}
            sx={{ color: 'text.secondary' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AssessmentDashboard; 