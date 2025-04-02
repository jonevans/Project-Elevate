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
  MonetizationOn,
  Speed,
  Security,
  Analytics,
} from '@mui/icons-material';

const ConversionCard = ({ title, description, impact, probability, metrics, template }) => {
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

        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
            Conversion Probability: {probability}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={probability}
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
          Use Template
        </Button>
      </CardContent>
    </Card>
  );
};

const ConversionMetrics = ({ selectedAssets, synthesisResults }) => {
  // Mock data - replace with actual conversion analysis
  const conversionOpportunities = [
    {
      id: 1,
      title: 'Cost Optimization',
      description: 'Demonstrate potential cost savings through automation and efficiency improvements',
      impact: 'high',
      probability: 85,
      metrics: ['30% cost reduction', 'ROI: 2.5x', '18-month payback'],
      template: 'cost-optimization',
    },
    {
      id: 2,
      title: 'Performance Enhancement',
      description: 'Showcase performance improvements and scalability benefits',
      impact: 'high',
      probability: 82,
      metrics: ['3x faster processing', '99.9% uptime', '50% resource savings'],
      template: 'performance',
    },
    {
      id: 3,
      title: 'Security Upgrade',
      description: 'Highlight security improvements and compliance benefits',
      impact: 'medium',
      probability: 78,
      metrics: ['Zero vulnerabilities', 'SOC 2 compliance', '24/7 monitoring'],
      template: 'security',
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Conversion Opportunities
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<MonetizationOn />}
        >
          Generate Report
        </Button>
      </Box>

      <Grid container spacing={2}>
        {conversionOpportunities.map((opportunity) => (
          <Grid item xs={12} md={6} lg={4} key={opportunity.id}>
            <ConversionCard {...opportunity} />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="h6" gutterBottom>
          Success Metrics
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Historical Success Rates
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Cost Optimization</Typography>
                    <Typography variant="body2">85%</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={85}
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#cc0000',
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Performance Projects</Typography>
                    <Typography variant="body2">82%</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={82}
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#cc0000',
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Security Upgrades</Typography>
                    <Typography variant="body2">78%</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={78}
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#cc0000',
                      },
                    }}
                  />
                </Box>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Key Conversion Factors
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Speed sx={{ color: '#cc0000', mr: 1 }} />
                  <Typography variant="body2">
                    Clear ROI Metrics
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Security sx={{ color: '#cc0000', mr: 1 }} />
                  <Typography variant="body2">
                    Risk Mitigation
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Analytics sx={{ color: '#cc0000', mr: 1 }} />
                  <Typography variant="body2">
                    Data-Driven Insights
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

export default ConversionMetrics; 