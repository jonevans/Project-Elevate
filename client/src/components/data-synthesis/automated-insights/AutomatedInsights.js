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
} from '@mui/material';
import {
  TrendingUp,
  Warning,
  CheckCircle,
  Info,
} from '@mui/icons-material';

const InsightCard = ({ title, description, impact, type, confidence }) => {
  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return '#cc0000';
      case 'medium':
        return '#ff9800';
      case 'low':
        return '#4caf50';
      default:
        return '#757575';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'opportunity':
        return <TrendingUp />;
      case 'risk':
        return <Warning />;
      case 'solution':
        return <CheckCircle />;
      default:
        return <Info />;
    }
  };

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {React.cloneElement(getTypeIcon(type), { sx: { color: getImpactColor(impact) } })}
        <Typography variant="subtitle1" sx={{ ml: 1, flex: 1 }}>
          {title}
        </Typography>
        <Chip
          label={impact}
          size="small"
          sx={{
            backgroundColor: `${getImpactColor(impact)}20`,
            color: getImpactColor(impact),
            fontWeight: 'bold',
          }}
        />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {description}
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
          Confidence: {confidence}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={confidence}
          sx={{
            height: 4,
            borderRadius: 2,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: getImpactColor(impact),
            },
          }}
        />
      </Box>
    </Paper>
  );
};

const AutomatedInsights = ({ selectedAssets, synthesisResults }) => {
  // Mock data - replace with actual AI analysis
  const insights = [
    {
      id: 1,
      title: 'Scalability Bottleneck Identified',
      description: 'Current architecture shows significant limitations in handling projected 3x growth over next 18 months.',
      impact: 'high',
      type: 'risk',
      confidence: 92,
    },
    {
      id: 2,
      title: 'Automation Opportunity',
      description: 'Manual deployment processes identified as major time sink. Automation could reduce deployment time by 70%.',
      impact: 'high',
      type: 'opportunity',
      confidence: 88,
    },
    {
      id: 3,
      title: 'Monitoring Gap',
      description: 'Limited observability in production environment. Implementing comprehensive monitoring could prevent 40% of incidents.',
      impact: 'medium',
      type: 'solution',
      confidence: 85,
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        AI-Powered Insights
      </Typography>
      <Grid container spacing={2}>
        {insights.map((insight) => (
          <Grid item xs={12} md={6} lg={4} key={insight.id}>
            <InsightCard {...insight} />
          </Grid>
        ))}
      </Grid>
      
      <Divider sx={{ my: 3 }} />
      
      <Box>
        <Typography variant="h6" gutterBottom>
          Key Themes
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip label="Scalability" color="error" />
          <Chip label="Automation" color="primary" />
          <Chip label="Monitoring" color="info" />
          <Chip label="Deployment" color="warning" />
          <Chip label="Architecture" color="success" />
        </Stack>
      </Box>
    </Box>
  );
};

export default AutomatedInsights; 