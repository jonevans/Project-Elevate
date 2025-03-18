import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  Chip,
  Avatar,
  Stack,
  LinearProgress,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
  Rating,
} from '@mui/material';
import {
  Lightbulb,
  TrendingUp,
  EmojiEvents,
  Feedback,
  Psychology,
  Timeline,
  Star,
  CheckCircle,
  Warning,
  ThumbUp,
  Campaign,
  WorkspacePremium,
  Group,
  LocalFireDepartment,
  Analytics,
  Assessment,
  Presentation,
  Business,
  TrendingDown,
} from '@mui/icons-material';
import AssessmentNav from '../components/AssessmentNav';
import { LineChart } from '@mui/x-charts/LineChart';

// Mock data for feedback
const mockFeedback = [
  {
    id: 1,
    type: 'success',
    message: 'Excellent use of open-ended questions with Person B',
    context: 'Technical Assessment Interview',
    timestamp: '2024-03-20T14:30:00',
    category: 'Interview Technique',
  },
  {
    id: 2,
    type: 'improvement',
    message: 'Consider deeper follow-up on technical debt concerns',
    context: 'Architecture Review',
    timestamp: '2024-03-20T15:45:00',
    category: 'Technical Analysis',
  },
  {
    id: 3,
    type: 'missed',
    message: 'Sentiment analysis detected frustration when discussing timeline',
    context: 'Stakeholder Interview',
    timestamp: '2024-03-21T10:15:00',
    category: 'Emotional Intelligence',
  },
];

// Mock data for quality metrics
const mockQualityMetrics = {
  interviewTechnique: [
    { date: '2024-01', score: 75 },
    { date: '2024-02', score: 82 },
    { date: '2024-03', score: 88 },
  ],
  dataAnalysis: [
    { date: '2024-01', score: 70 },
    { date: '2024-02', score: 85 },
    { date: '2024-03', score: 90 },
  ],
  recommendations: [
    { date: '2024-01', score: 65 },
    { date: '2024-02', score: 78 },
    { date: '2024-03', score: 85 },
  ],
};

// Mock data for achievements
const mockAchievements = {
  currentLevel: 'Senior Analyst',
  experiencePoints: 2750,
  nextLevelAt: 3000,
  recentBadges: [
    {
      id: 1,
      name: 'Insight Master',
      description: 'Consistently identified key business drivers',
      icon: <Psychology />,
      dateEarned: '2024-03-15',
    },
    {
      id: 2,
      name: 'Technical Expert',
      description: 'Demonstrated deep technical understanding',
      icon: <WorkspacePremium />,
      dateEarned: '2024-03-10',
    },
    {
      id: 3,
      name: 'Team Player',
      description: 'Contributed to 10 team assessments',
      icon: <Group />,
      dateEarned: '2024-03-05',
    },
  ],
  streaks: {
    currentStreak: 12,
    longestStreak: 15,
    improvements: [
      { category: 'Interview Quality', streak: 8 },
      { category: 'Analysis Depth', streak: 12 },
      { category: 'Client Satisfaction', streak: 6 },
    ],
  },
};

const FeedbackCard = ({ feedback }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle sx={{ color: 'success.main' }} />;
      case 'improvement':
        return <Lightbulb sx={{ color: 'warning.main' }} />;
      case 'missed':
        return <Warning sx={{ color: 'error.main' }} />;
      default:
        return <Feedback />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'success':
        return 'success.main';
      case 'improvement':
        return 'warning.main';
      case 'missed':
        return 'error.main';
      default:
        return 'grey.500';
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <ListItemIcon>
            {getIcon(feedback.type)}
          </ListItemIcon>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" gutterBottom>
              {feedback.message}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <Chip
                label={feedback.context}
                size="small"
                sx={{ bgcolor: 'grey.100' }}
              />
              <Chip
                label={feedback.category}
                size="small"
                sx={{ 
                  bgcolor: `${getColor(feedback.type)}15`,
                  color: getColor(feedback.type),
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {new Date(feedback.timestamp).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const QualityMetricsChart = ({ data, title }) => {
  const chartData = {
    xAxis: [{ data: data.map(d => d.date), scaleType: 'band' }],
    series: [
      {
        data: data.map(d => d.score),
        area: true,
        color: '#cc0000',
      },
    ],
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ height: 200, mt: 2 }}>
          <LineChart
            {...chartData}
            height={200}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

const AchievementCard = ({ achievement }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: '#cc0000' }}>
          {achievement.icon}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">
            {achievement.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {achievement.description}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Earned on {new Date(achievement.dateEarned).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Growth = () => {
  const { customerName } = useParams();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <AssessmentNav customerName={customerName} />
      
      <Box sx={{ px: 4, pb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: '#cc0000',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#cc0000',
              },
            }}
          >
            <Tab label="Feedback & Growth" icon={<Feedback />} iconPosition="start" />
            <Tab label="Quality Metrics" icon={<Analytics />} iconPosition="start" />
            <Tab label="Achievements" icon={<EmojiEvents />} iconPosition="start" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Recent Feedback
              </Typography>
              {mockFeedback.map((feedback) => (
                <FeedbackCard key={feedback.id} feedback={feedback} />
              ))}
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Feedback Summary
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <ThumbUp sx={{ color: 'success.main' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Strengths" 
                        secondary="Interview technique, technical analysis"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <TrendingUp sx={{ color: 'warning.main' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Growth Areas" 
                        secondary="Emotional intelligence, follow-up questions"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Campaign sx={{ color: 'info.main' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Recent Focus" 
                        secondary="Stakeholder engagement, technical depth"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Performance Trends
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <QualityMetricsChart 
                data={mockQualityMetrics.interviewTechnique}
                title="Interview Technique"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <QualityMetricsChart 
                data={mockQualityMetrics.dataAnalysis}
                title="Data Analysis"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <QualityMetricsChart 
                data={mockQualityMetrics.recommendations}
                title="Recommendation Quality"
              />
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ mt: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Key Performance Indicators
                  </Typography>
                  <Grid container spacing={3}>
                    {[
                      { label: 'Interview Technique', score: 88 },
                      { label: 'Data Analysis', score: 90 },
                      { label: 'Recommendation Quality', score: 85 },
                      { label: 'Communication', score: 92 },
                      { label: 'Client Relationship', score: 87 },
                      { label: 'Sales Conversion', score: 78 },
                    ].map((kpi) => (
                      <Grid item xs={12} sm={6} md={4} key={kpi.label}>
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2">{kpi.label}</Typography>
                            <Typography variant="body2" color="primary">{kpi.score}%</Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={kpi.score} 
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: 'grey.100',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: '#cc0000',
                                borderRadius: 4,
                              },
                            }}
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {activeTab === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Current Progress
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1">
                        Level: {mockAchievements.currentLevel}
                      </Typography>
                      <Typography variant="body1">
                        {mockAchievements.experiencePoints} / {mockAchievements.nextLevelAt} XP
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(mockAchievements.experiencePoints / mockAchievements.nextLevelAt) * 100}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        bgcolor: 'grey.100',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: '#cc0000',
                          borderRadius: 5,
                        },
                      }}
                    />
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    Recent Achievements
                  </Typography>
                  {mockAchievements.recentBadges.map((badge) => (
                    <AchievementCard key={badge.id} achievement={badge} />
                  ))}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Improvement Streaks
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <LocalFireDepartment sx={{ color: '#cc0000' }} />
                      <Typography variant="body1">
                        Current Streak: {mockAchievements.streaks.currentStreak} days
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Star sx={{ color: '#cc0000' }} />
                      <Typography variant="body1">
                        Longest Streak: {mockAchievements.streaks.longestStreak} days
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" gutterBottom>
                    Active Improvement Streaks
                  </Typography>
                  <List>
                    {mockAchievements.streaks.improvements.map((improvement) => (
                      <ListItem key={improvement.category}>
                        <ListItemIcon>
                          <Badge 
                            badgeContent={improvement.streak} 
                            color="error"
                          >
                            <LocalFireDepartment />
                          </Badge>
                        </ListItemIcon>
                        <ListItemText 
                          primary={improvement.category}
                          secondary={`${improvement.streak} day streak`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Growth; 