import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';

function AssessmentList() {
  const navigate = useNavigate();

  // Mock data for assessments
  const assessments = [
    {
      id: 1,
      customerName: 'TechCorp Solutions',
      industry: 'Technology',
      status: 'In Progress',
      startDate: '2024-03-01',
      contractValue: '$75,000',
      primaryContact: 'John Smith'
    },
    {
      id: 2,
      customerName: 'Healthcare Plus',
      industry: 'Healthcare',
      status: 'Scheduled',
      startDate: '2024-04-01',
      contractValue: '$95,000',
      primaryContact: 'Sarah Johnson'
    },
    {
      id: 3,
      customerName: 'Manufacturing Pro',
      industry: 'Manufacturing',
      status: 'Completed',
      startDate: '2024-02-15',
      contractValue: '$120,000',
      primaryContact: 'Mike Wilson'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return '#2196f3';
      case 'Scheduled':
        return '#ff9800';
      case 'Completed':
        return '#4caf50';
      default:
        return '#757575';
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 500 }}>
          My Assessments
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#cc0000',
            '&:hover': { backgroundColor: '#b30000' }
          }}
        >
          New Assessment
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Industry</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Contract Value</TableCell>
              <TableCell>Primary Contact</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assessments.map((assessment) => (
              <TableRow key={assessment.id}>
                <TableCell>
                  <Link 
                    to={`/assessments/${encodeURIComponent(assessment.customerName)}/dashboard`}
                    style={{ 
                      color: '#cc0000', 
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    {assessment.customerName}
                  </Link>
                </TableCell>
                <TableCell>{assessment.industry}</TableCell>
                <TableCell>
                  <Chip
                    label={assessment.status}
                    size="small"
                    sx={{
                      backgroundColor: getStatusColor(assessment.status),
                      color: 'white'
                    }}
                  />
                </TableCell>
                <TableCell>{new Date(assessment.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{assessment.contractValue}</TableCell>
                <TableCell>{assessment.primaryContact}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AssessmentList; 