import React, { useState } from 'react';
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
  TextField,
  Slider,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  TrendingUp,
  Warning,
  CheckCircle,
  Info,
  SentimentSatisfied,
  SentimentNeutral,
  SentimentDissatisfied,
  Psychology,
  AutoGraph,
} from '@mui/icons-material';

const SentimentIndicator = ({ value }) => {
  const getSentimentColor = (value) => {
    if (value > 0.6) return '#4caf50';
    if (value < 0.4) return '#cc0000';
    return '#ff9800';
  };

  const getSentimentIcon = (value) => {
    if (value > 0.6) return <SentimentSatisfied />;
    if (value < 0.4) return <SentimentDissatisfied />;
    return <SentimentNeutral />;
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {React.cloneElement(getSentimentIcon(value), {
        sx: { color: getSentimentColor(value) },
      })}
      <Typography variant="body2">
        {value > 0.6 ? 'Positive' : value < 0.4 ? 'Negative' : 'Neutral'}
      </Typography>
    </Box>
  );
};

const ThemeCard = ({ theme, confidence, sentiment, keywords }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          {theme}
        </Typography>
        <Box sx={{ mb: 2 }}>
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
            }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
            Sentiment
          </Typography>
          <SentimentIndicator value={sentiment} />
        </Box>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {keywords.map((keyword, index) => (
            <Chip
              key={index}
              label={keyword}
              size="small"
              variant="outlined"
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

const AnalysisTools = ({ selectedAssets, synthesisResults }) => {
  const [analysisSettings, setAnalysisSettings] = useState({
    sentimentThreshold: 0.5,
    confidenceThreshold: 70,
    includeKeywords: true,
    analyzeSentiment: true,
  });

  // Mock data - replace with actual NLP analysis
  const themes = [
    {
      id: 1,
      theme: 'System Scalability',
      confidence: 92,
      sentiment: 0.7,
      keywords: ['scaling', 'performance', 'growth'],
    },
    {
      id: 2,
      theme: 'Deployment Process',
      confidence: 85,
      sentiment: 0.3,
      keywords: ['automation', 'CI/CD', 'deployment'],
    },
    {
      id: 3,
      theme: 'Monitoring & Observability',
      confidence: 78,
      sentiment: 0.5,
      keywords: ['monitoring', 'logging', 'alerts'],
    },
  ];

  const handleSettingChange = (setting) => (event) => {
    setAnalysisSettings(prev => ({
      ...prev,
      [setting]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    }));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Analysis Tools
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Psychology />}
        >
          Run Analysis
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Analysis Settings
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                  Sentiment Threshold
                </Typography>
                <Slider
                  value={analysisSettings.sentimentThreshold}
                  onChange={handleSettingChange('sentimentThreshold')}
                  min={0}
                  max={1}
                  step={0.1}
                  marks
                />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                  Confidence Threshold
                </Typography>
                <Slider
                  value={analysisSettings.confidenceThreshold}
                  onChange={handleSettingChange('confidenceThreshold')}
                  min={0}
                  max={100}
                  step={5}
                  marks
                />
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={analysisSettings.includeKeywords}
                    onChange={handleSettingChange('includeKeywords')}
                  />
                }
                label="Include Keywords"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={analysisSettings.analyzeSentiment}
                    onChange={handleSettingChange('analyzeSentiment')}
                  />
                }
                label="Analyze Sentiment"
              />
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            Theme Analysis
          </Typography>
          <Grid container spacing={2}>
            {themes.map((theme) => (
              <Grid item xs={12} md={6} lg={4} key={theme.id}>
                <ThemeCard {...theme} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="h6" gutterBottom>
          Sentiment Analysis
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Positive Themes
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SentimentSatisfied sx={{ color: '#4caf50', mr: 1 }} />
                  <Typography variant="body2">
                    System Scalability (70% positive)
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SentimentSatisfied sx={{ color: '#4caf50', mr: 1 }} />
                  <Typography variant="body2">
                    Performance Optimization (65% positive)
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Areas of Concern
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SentimentDissatisfied sx={{ color: '#cc0000', mr: 1 }} />
                  <Typography variant="body2">
                    Manual Deployment (30% positive)
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SentimentDissatisfied sx={{ color: '#cc0000', mr: 1 }} />
                  <Typography variant="body2">
                    System Monitoring (35% positive)
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

export default AnalysisTools; 