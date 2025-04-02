import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  LinearProgress,
  Stack,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import {
  TrendingUp,
  Warning,
  CheckCircle,
  Info,
  Link as LinkIcon,
} from '@mui/icons-material';

const SimilarCaseCard = ({ title, description, similarity, outcome, metrics }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" sx={{ flex: 1 }}>
            {title}
          </Typography>
          <Chip
            label={`${similarity}% Similar`}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
            Outcome: {outcome}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={similarity}
            sx={{
              height: 4,
              borderRadius: 2,
              backgroundColor: '#e0e0e0',
            }}
          />
        </Box>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {metrics.map((metric, index) => (
            <Chip
              key={index}
              label={metric}
              size="small"
              variant="outlined"
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

const PatternMatcher = ({ selectedAssets, synthesisResults }) => {
  // Mock data - replace with actual pattern matching analysis
  const similarCases = [
    {
      id: 1,
      title: 'TechCorp Solutions (2023)',
      description: 'Similar scalability challenges in legacy system migration',
      similarity: 85,
      outcome: 'Successful',
      metrics: ['70% cost reduction', '3x performance improvement'],
    },
    {
      id: 2,
      title: 'Global Systems Inc (2022)',
      description: 'Compatible monitoring and observability implementation',
      similarity: 78,
      outcome: 'Successful',
      metrics: ['40% incident reduction', '2x deployment speed'],
    },
    {
      id: 3,
      title: 'Digital Dynamics (2023)',
      description: 'Similar automation requirements in CI/CD pipeline',
      similarity: 72,
      outcome: 'Successful',
      metrics: ['60% time savings', '90% error reduction'],
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Similar Historical Cases
      </Typography>
      <Grid container spacing={2}>
        {similarCases.map((case_) => (
          <Grid item xs={12} md={6} lg={4} key={case_.id}>
            <SimilarCaseCard {...case_} />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="h6" gutterBottom>
          Pattern Analysis
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Common Success Factors
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircle sx={{ color: '#4caf50', mr: 1 }} />
                  <Typography variant="body2">
                    Comprehensive monitoring implementation
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircle sx={{ color: '#4caf50', mr: 1 }} />
                  <Typography variant="body2">
                    Automated deployment pipeline
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircle sx={{ color: '#4caf50', mr: 1 }} />
                  <Typography variant="body2">
                    Scalable architecture design
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Risk Patterns
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Warning sx={{ color: '#ff9800', mr: 1 }} />
                  <Typography variant="body2">
                    Manual deployment processes
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Warning sx={{ color: '#ff9800', mr: 1 }} />
                  <Typography variant="body2">
                    Limited system observability
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Warning sx={{ color: '#ff9800', mr: 1 }} />
                  <Typography variant="body2">
                    Legacy system dependencies
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PatternMatcher; 