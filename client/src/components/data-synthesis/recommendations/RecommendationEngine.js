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
  Button,
} from '@mui/material';
import {
  TrendingUp,
  Warning,
  CheckCircle,
  Info,
  ArrowForward,
} from '@mui/icons-material';

const RecommendationCard = ({ title, description, impact, effort, successRate, metrics }) => {
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

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" sx={{ flex: 1 }}>
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
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              Effort Required
            </Typography>
            <LinearProgress
              variant="determinate"
              value={effort}
              sx={{
                height: 4,
                borderRadius: 2,
                backgroundColor: '#e0e0e0',
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              Success Rate
            </Typography>
            <LinearProgress
              variant="determinate"
              value={successRate}
              sx={{
                height: 4,
                borderRadius: 2,
                backgroundColor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: getImpactColor(impact),
                },
              }}
            />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
          {metrics.map((metric, index) => (
            <Chip
              key={index}
              label={metric}
              size="small"
              variant="outlined"
            />
          ))}
        </Stack>

        <Button
          endIcon={<ArrowForward />}
          variant="outlined"
          fullWidth
          sx={{
            borderColor: getImpactColor(impact),
            color: getImpactColor(impact),
            '&:hover': {
              borderColor: getImpactColor(impact),
              backgroundColor: `${getImpactColor(impact)}10`,
            },
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

const RecommendationEngine = ({ selectedAssets, synthesisResults }) => {
  // Mock data - replace with actual recommendation engine analysis
  const recommendations = [
    {
      id: 1,
      title: 'Implement Automated CI/CD Pipeline',
      description: 'Replace manual deployment processes with automated CI/CD pipeline to reduce deployment time and errors.',
      impact: 'high',
      effort: 60,
      successRate: 95,
      metrics: ['70% faster deployments', '90% fewer errors'],
    },
    {
      id: 2,
      title: 'Enhance Monitoring System',
      description: 'Implement comprehensive monitoring and alerting system to improve system reliability and incident response.',
      impact: 'high',
      effort: 40,
      successRate: 88,
      metrics: ['40% fewer incidents', '60% faster resolution'],
    },
    {
      id: 3,
      title: 'Modernize Architecture',
      description: 'Update system architecture to support horizontal scaling and improve performance.',
      impact: 'medium',
      effort: 80,
      successRate: 85,
      metrics: ['3x scalability', '50% cost reduction'],
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Strategic Recommendations
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<TrendingUp />}
        >
          Generate New Recommendations
        </Button>
      </Box>

      <Grid container spacing={2}>
        {recommendations.map((recommendation) => (
          <Grid item xs={12} md={6} lg={4} key={recommendation.id}>
            <RecommendationCard {...recommendation} />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="h6" gutterBottom>
          Recommendation Analysis
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                High-Impact Opportunities
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp sx={{ color: '#cc0000', mr: 1 }} />
                  <Typography variant="body2">
                    CI/CD Automation (95% success rate)
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp sx={{ color: '#cc0000', mr: 1 }} />
                  <Typography variant="body2">
                    Monitoring Enhancement (88% success rate)
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Risk Mitigation
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Warning sx={{ color: '#ff9800', mr: 1 }} />
                  <Typography variant="body2">
                    Legacy System Dependencies
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Warning sx={{ color: '#ff9800', mr: 1 }} />
                  <Typography variant="body2">
                    Manual Process Bottlenecks
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

export default RecommendationEngine; 