import React, { useState, useRef, useEffect } from 'react';
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
  IconButton,
  Avatar,
  Rating,
  LinearProgress,
  Stack,
  Tooltip,
  Tab,
  Tabs,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper as MuiPaper,
  CircularProgress,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Person,
  Business,
  TrendingUp,
  Psychology,
  Assignment,
  Warning,
  CheckCircle,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon,
  ArrowUpward,
  ArrowDownward,
  Delete as DeleteIcon,
  SaveAltOutlined,
  Refresh,
  Info as InfoIcon,
  Group as GroupIcon,
  Send,
  ChatBubbleOutline,
  ArticleOutlined,
} from '@mui/icons-material';
import AssessmentNav from '../components/AssessmentNav';

// Mock data for stakeholders
const mockStakeholders = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CTO',
    type: 'Technical Decision Maker',
    influence: 5,
    sentiment: 'positive',
    changeReadiness: 8,
    priorities: ['System Performance', 'Security', 'Scalability'],
    concerns: ['Implementation Timeline', 'Resource Allocation'],
    decisionAuthority: [
      'Technical Architecture',
      'Security Standards',
      'Infrastructure Investments'
    ],
    anticipatedObjections: [
      { text: 'Migration timeline too aggressive', severity: 'High' },
      { text: 'Team bandwidth constraints', severity: 'Medium' },
      { text: 'Legacy system dependencies', severity: 'High' }
    ],
    persona: {
      background: 'Technical leader with 15+ years in enterprise architecture',
      goals: ['Modernize Infrastructure', 'Reduce Technical Debt'],
      painPoints: ['Legacy System Maintenance', 'Security Vulnerabilities'],
    },
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'IT Director',
    type: 'Implementation Owner',
    influence: 4,
    sentiment: 'neutral',
    changeReadiness: 6,
    priorities: ['Team Capacity', 'Project Timeline', 'Budget'],
    concerns: ['Training Requirements', 'Operational Impact'],
    decisionAuthority: [
      'Resource Allocation',
      'Implementation Timeline',
      'Team Assignments'
    ],
    anticipatedObjections: [
      { text: 'Staff training requirements', severity: 'High' },
      { text: 'Operational disruption', severity: 'Medium' },
      { text: 'Resource reallocation', severity: 'Medium' }
    ],
    persona: {
      background: '10 years managing IT operations and projects',
      goals: ['Streamline Operations', 'Minimize Disruption'],
      painPoints: ['Resource Constraints', 'Change Management'],
    },
  },
  {
    id: 3,
    name: 'Amanda Foster',
    role: 'CFO',
    type: 'Business Decision Maker',
    influence: 5,
    sentiment: 'negative',
    changeReadiness: 4,
    priorities: ['Cost Management', 'ROI', 'Risk Mitigation'],
    concerns: ['Investment Size', 'Operational Costs'],
    decisionAuthority: [
      'Budget Approval',
      'Vendor Contracts',
      'Financial Risk Assessment'
    ],
    anticipatedObjections: [
      { text: 'High initial investment', severity: 'High' },
      { text: 'Unclear ROI timeline', severity: 'High' },
      { text: 'Ongoing maintenance costs', severity: 'Medium' }
    ],
    persona: {
      background: 'Financial executive focused on strategic growth',
      goals: ['Optimize Spending', 'Ensure Value'],
      painPoints: ['Budget Constraints', 'Risk Management'],
    },
  },
];

// Mock recommendations data
const mockRecommendations = [
  {
    id: 1,
    title: 'Cloud Infrastructure Migration',
    description: 'Transition core systems to cloud-based infrastructure',
    impact: {
      technical: 5,
      business: 4,
      financial: 3,
    },
    stakeholderImpact: {
      'Technical Decision Maker': {
        score: 5,
        benefits: ['Improved Scalability', 'Enhanced Security'],
        concerns: ['Migration Complexity', 'Service Disruption'],
      },
      'Implementation Owner': {
        score: 3,
        benefits: ['Automated Management', 'Reduced Maintenance'],
        concerns: ['Team Training', 'Timeline Risk'],
      },
      'Business Decision Maker': {
        score: 4,
        benefits: ['Cost Optimization', 'Business Agility'],
        concerns: ['Initial Investment', 'ROI Timeline'],
      },
    },
  },
  {
    id: 2,
    title: 'Security Enhancement Program',
    description: 'Implement comprehensive security measures across systems',
    impact: {
      technical: 4,
      business: 3,
      financial: 4,
    },
    stakeholderImpact: {
      'Technical Decision Maker': {
        score: 5,
        benefits: ['Reduced Vulnerabilities', 'Improved Compliance'],
        concerns: ['Implementation Complexity'],
      },
      'Implementation Owner': {
        score: 4,
        benefits: ['Automated Security', 'Clear Protocols'],
        concerns: ['Resource Allocation'],
      },
      'Business Decision Maker': {
        score: 3,
        benefits: ['Risk Mitigation', 'Compliance Assurance'],
        concerns: ['Ongoing Costs'],
      },
    },
  },
];

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

const StakeholderCard = ({ stakeholder }) => {
  const [expanded, setExpanded] = useState(false);
  const [showObjections, setShowObjections] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [perspectiveModalOpen, setPerspectiveModalOpen] = useState(false);
  const [editedStakeholder, setEditedStakeholder] = useState(stakeholder);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const tooltipRef = useRef(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const chatContainerRef = useRef(null);

  // Handle clicks outside tooltip to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setActiveTooltip(null);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tooltipRef]);

  const toggleTooltip = (id) => {
    setActiveTooltip(activeTooltip === id ? null : id);
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return '#4caf50';
      case 'neutral':
        return '#ff9800';
      case 'negative':
        return '#f44336';
      default:
        return '#757575';
    }
  };

  const getSentimentLabel = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'Positive toward changes';
      case 'neutral':
        return 'Cautious about implementation';
      case 'negative':
        return 'Resistant to changes';
      default:
        return 'Sentiment unknown';
    }
  };

  const handleEditOpen = () => {
    setEditedStakeholder(stakeholder);
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
  };

  const handleEditSave = () => {
    // TODO: Add save functionality
    console.log('Saving stakeholder:', editedStakeholder);
    setEditModalOpen(false);
  };

  const handleInputChange = (field, value) => {
    setEditedStakeholder(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleObjectionChange = (index, field, value) => {
    setEditedStakeholder(prev => ({
      ...prev,
      anticipatedObjections: prev.anticipatedObjections.map((obj, i) => 
        i === index ? { ...obj, [field]: value } : obj
      )
    }));
  };

  const handlePerspectiveOpen = () => {
    setPerspectiveModalOpen(true);
  };

  const handlePerspectiveClose = () => {
    setPerspectiveModalOpen(false);
  };

  const handleRegenerateClick = () => {
    setIsGenerating(true);
    // Mock regeneration delay
    setTimeout(() => {
      setIsGenerating(false);
    }, 1500);
  };

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;
    
    setIsSending(true);
    const userMessage = chatMessage.trim();
    setChatMessage('');
    
    // Add user message to chat
    setChatHistory(prev => [...prev, {
      type: 'user',
      message: userMessage,
      timestamp: new Date()
    }]);

    // Simulate AI response - Replace with actual AI integration
    setTimeout(() => {
      const stakeholderResponse = generateStakeholderResponse(userMessage, stakeholder);
      setChatHistory(prev => [...prev, {
        type: 'stakeholder',
        message: stakeholderResponse,
        timestamp: new Date()
      }]);
      setIsSending(false);
    }, 1500);
  };

  const generateStakeholderResponse = (message, stakeholder) => {
    // This is a placeholder - Replace with actual AI integration
    return `As ${stakeholder.role}, I need to consider the impact on our technical infrastructure. Let me think about how this aligns with our current priorities.`;
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const mockPerspective = {
    summary: "Based on Sarah Chen's technical background and current priorities, she is likely to approach our assessment findings with a strong focus on technical feasibility and system performance implications. As CTO, her primary concerns will center around the technical architecture decisions and their long-term impact on scalability and security.",
    keyPoints: [
      "Will strongly support cloud migration recommendations due to alignment with modernization goals",
      "May express concerns about aggressive implementation timelines",
      "Likely to scrutinize security measures and compliance aspects",
      "Expected to advocate for additional technical resources"
    ],
    recommendationAlignment: {
      positive: [
        "Infrastructure modernization proposals",
        "Security enhancement recommendations",
        "Scalability improvements"
      ],
      concerns: [
        "Resource allocation timelines",
        "Legacy system integration complexity",
        "Team bandwidth constraints"
      ]
    },
    suggestedApproach: "Present technical benefits first, followed by detailed implementation phases. Prepare comprehensive responses about security measures and scaling strategies. Address timeline concerns with flexible milestone options."
  };

  return (
    <>
      <Card 
        sx={{ 
          height: '100%',
          p: 3,
          '&:hover': {
            boxShadow: 3,
            transform: 'translateY(-2px)',
            transition: 'all 0.2s ease-in-out',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
          <Avatar 
            sx={{ 
              bgcolor: '#cc0000',
              width: 56,
              height: 56,
              fontSize: '1.5rem',
            }}
          >
            {stakeholder.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Box sx={{ ml: 2, flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 500, mb: 0.5 }}>
              {stakeholder.name}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
              {stakeholder.role}
            </Typography>
          </Box>
          <Box 
            onClick={() => setPerspectiveModalOpen(true)}
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': {
                '& .MuiTypography-root': {
                  color: '#cc0000'
                }
              }
            }}
          >
            <Avatar
              sx={{
                bgcolor: '#cc0000',
                width: 32,
                height: 32,
                mr: 1,
                '& .MuiSvgIcon-root': {
                  fontSize: 18
                }
              }}
            >
              <VisibilityIcon />
            </Avatar>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.primary',
                transition: 'color 0.2s'
              }}
            >
              View Perspective
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, position: 'relative' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Influence Level
            </Typography>
            <Tooltip
              title="Influence level indicates decision-making power based on org. structure and peer interviews"
              arrow
              placement="right"
              sx={{ ml: 0.5 }}
            >
              <IconButton
                size="small"
                sx={{ color: 'rgba(0, 0, 0, 0.3)' }}
              >
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ display: 'flex', color: '#cc0000' }}>
            {[...Array(5)].map((_, index) => (
              <ArrowUpward
                key={index}
                sx={{
                  fontSize: 24,
                  color: index < stakeholder.influence ? '#cc0000' : 'rgba(0, 0, 0, 0.12)',
                  cursor: 'help',
                }}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 4, position: 'relative' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Stakeholder Type
              </Typography>
              <Tooltip
                title="Functional role in decision-making processes"
                arrow
                placement="right"
                sx={{ ml: 0.5 }}
              >
                <IconButton
                  size="small"
                  sx={{ color: 'rgba(0, 0, 0, 0.3)' }}
                >
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <Chip 
              label={stakeholder.type}
              sx={{ 
                backgroundColor: 'rgba(204, 0, 0, 0.08)',
                color: '#cc0000',
                fontWeight: 500,
                fontSize: '0.9rem',
                height: 32,
              }}
            />
          </Box>
        </Box>

        <Box sx={{ mb: 4, position: 'relative' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Sentiment
              </Typography>
              <Tooltip
                title="Emotional attitude toward proposed changes based on interview transcript analysis"
                arrow
                placement="right"
                sx={{ ml: 0.5 }}
              >
                <IconButton
                  size="small"
                  sx={{ color: 'rgba(0, 0, 0, 0.3)' }}
                >
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {getSentimentLabel(stakeholder.sentiment)}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={stakeholder.sentiment === 'positive' ? 100 : stakeholder.sentiment === 'neutral' ? 50 : 20}
            sx={{
              height: 8,
              borderRadius: 4,
              mb: 3,
              bgcolor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                background: 'linear-gradient(90deg, #f44336 0%, #fdd835 50%, #4caf50 100%)',
                backgroundSize: '200% 100%',
                backgroundPosition: stakeholder.sentiment === 'positive' ? 'right' : 
                                  stakeholder.sentiment === 'neutral' ? 'center' : 'left',
                transition: 'all 0.3s ease',
              },
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Change Readiness
              </Typography>
              <Tooltip
                title="Practical ability to implement changes based on resources, capacity, and organizational constraints"
                arrow
                placement="right"
                sx={{ ml: 0.5 }}
              >
                <IconButton
                  size="small"
                  sx={{ color: 'rgba(0, 0, 0, 0.3)' }}
                >
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <Typography variant="body2" sx={{ 
              color: stakeholder.changeReadiness >= 7 ? '#4caf50' :
                     stakeholder.changeReadiness >= 5 ? '#ff9800' :
                     '#f44336',
              fontWeight: 500,
            }}>
              {stakeholder.changeReadiness}/10
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={stakeholder.changeReadiness * 10}
            sx={{
              height: 8,
              borderRadius: 4,
              mb: 3,
              bgcolor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                background: 'linear-gradient(90deg, #f44336 0%, #fdd835 50%, #4caf50 100%)',
                backgroundSize: '200% 100%',
                backgroundPosition: `${100 - (stakeholder.changeReadiness * 10)}% center`,
                transition: 'all 0.3s ease',
              },
            }}
          />
        </Box>

        <Box sx={{ mb: 4, position: 'relative' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Key Priorities
            </Typography>
            <Tooltip
              title="Primary concerns and focus areas for this stakeholder"
              arrow
              placement="right"
              sx={{ ml: 0.5 }}
            >
              <IconButton
                size="small"
                sx={{ color: 'rgba(0, 0, 0, 0.3)' }}
              >
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {stakeholder.priorities.map((priority, index) => (
              <Chip 
                key={index}
                label={priority}
                variant="outlined"
                sx={{ 
                  borderColor: '#cc0000',
                  color: '#cc0000',
                  fontSize: '0.85rem',
                  height: 32,
                }}
              />
            ))}
          </Stack>
        </Box>

        <Box sx={{ mb: 4, position: 'relative' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Decision Authority
            </Typography>
            <Tooltip
              title="Areas where this stakeholder has final approval power, determined through interviews and organizational analysis"
              arrow
              placement="right"
              sx={{ ml: 0.5 }}
            >
              <IconButton
                size="small"
                sx={{ color: 'rgba(0, 0, 0, 0.3)' }}
              >
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {stakeholder.decisionAuthority.map((authority, index) => (
              <Chip
                key={index}
                label={authority}
                sx={{
                  bgcolor: 'rgba(25, 118, 210, 0.08)',
                  color: '#1976d2',
                  fontSize: '0.85rem',
                  height: 32,
                }}
              />
            ))}
          </Stack>
        </Box>

        <Box sx={{ mb: 4, position: 'relative' }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              cursor: 'pointer',
              mb: 1
            }}
            onClick={() => setShowObjections(!showObjections)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                ANTICIPATED OBJECTIONS
              </Typography>
              <Tooltip
                title="Likely concerns based on previous projects, stakeholder interviews, and organizational history"
                arrow
                placement="right"
                sx={{ ml: 0.5 }}
              >
                <IconButton
                  size="small"
                  sx={{ color: 'rgba(0, 0, 0, 0.3)' }}
                >
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            {showObjections ? 
              <ArrowUpward sx={{ color: 'text.secondary' }} /> : 
              <ArrowDownward sx={{ color: 'text.secondary' }} />
            }
          </Box>
          
          <Collapse in={showObjections}>
            <Stack spacing={1.5} sx={{ mt: 2 }}>
              {stakeholder.anticipatedObjections.map((objection, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    bgcolor: 'rgba(0, 0, 0, 0.02)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="body1">
                    {objection.text}
                  </Typography>
                  <Chip
                    label={objection.severity}
                    sx={{
                      ml: 2,
                      bgcolor: objection.severity === 'High' ? 'error.main' :
                             objection.severity === 'Medium' ? 'warning.main' : 'success.main',
                      color: 'white',
                      fontSize: '0.85rem',
                      height: 28,
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Collapse>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <IconButton 
            size="medium" 
            onClick={() => setEditModalOpen(true)}
            sx={{ color: 'text.secondary' }}
          >
            <EditIcon />
          </IconButton>
        </Box>
      </Card>

      <Dialog 
        open={editModalOpen} 
        onClose={handleEditClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            maxHeight: '90vh',
            overflowY: 'auto'
          }
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          px: 4,
          py: 3,
          fontSize: '1.75rem',
          fontWeight: 400,
        }}>
          Edit Stakeholder Profile
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <Grid container spacing={4}>
            {/* Basic Information */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  Name
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={editedStakeholder.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'background.paper',
                    }
                  }}
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  Role
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={editedStakeholder.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'background.paper',
                    }
                  }}
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  Type
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={editedStakeholder.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'background.paper',
                    }
                  }}
                />
              </Box>
            </Grid>

            {/* Influence and Sentiment */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  Influence Level
                </Typography>
                <Rating
                  value={editedStakeholder.influence}
                  onChange={(e, newValue) => handleInputChange('influence', newValue)}
                  max={5}
                  sx={{ 
                    color: '#FFB400',
                    '& .MuiRating-iconFilled': {
                      color: '#FFB400',
                    },
                    '& .MuiRating-iconHover': {
                      color: '#FFB400',
                    }
                  }}
                />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  Sentiment
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={editedStakeholder.sentiment}
                    onChange={(e) => handleInputChange('sentiment', e.target.value)}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'background.paper',
                      }
                    }}
                  >
                    <MenuItem value="positive">Positive</MenuItem>
                    <MenuItem value="neutral">Neutral</MenuItem>
                    <MenuItem value="negative">Negative</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  Change Readiness
                </Typography>
                <Slider
                  value={editedStakeholder.changeReadiness}
                  onChange={(e, newValue) => handleInputChange('changeReadiness', newValue)}
                  min={1}
                  max={10}
                  marks
                  valueLabelDisplay="auto"
                  sx={{ 
                    color: '#cc0000',
                    '& .MuiSlider-thumb': {
                      bgcolor: '#cc0000',
                    },
                    '& .MuiSlider-track': {
                      bgcolor: '#cc0000',
                    },
                    '& .MuiSlider-rail': {
                      bgcolor: 'rgba(204, 0, 0, 0.2)',
                    },
                    '& .MuiSlider-mark': {
                      bgcolor: 'rgba(204, 0, 0, 0.2)',
                    }
                  }}
                />
              </Box>
            </Grid>

            {/* Priorities */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>Key Priorities</Typography>
              <TextField
                fullWidth
                value={editedStakeholder.priorities.join(', ')}
                onChange={(e) => handleInputChange('priorities', e.target.value.split(',').map(p => p.trim()))}
                helperText="Separate priorities with commas"
                sx={{ mb: 2 }}
              />
            </Grid>

            {/* Decision Authority */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>Decision Authority</Typography>
              <TextField
                fullWidth
                value={editedStakeholder.decisionAuthority.join(', ')}
                onChange={(e) => handleInputChange('decisionAuthority', e.target.value.split(',').map(d => d.trim()))}
                helperText="Separate areas with commas"
                sx={{ mb: 2 }}
              />
            </Grid>

            {/* Anticipated Objections */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle2">Anticipated Objections</Typography>
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => {
                    setEditedStakeholder(prev => ({
                      ...prev,
                      anticipatedObjections: [
                        ...prev.anticipatedObjections,
                        { text: '', severity: 'Medium' }
                      ]
                    }));
                  }}
                  sx={{ 
                    color: '#cc0000',
                    '&:hover': { bgcolor: 'rgba(204, 0, 0, 0.04)' },
                  }}
                >
                  Add Objection
                </Button>
              </Box>
              <Stack spacing={2}>
                {editedStakeholder.anticipatedObjections.map((objection, index) => (
                  <Paper
                    key={index}
                    variant="outlined"
                    sx={{ p: 2, bgcolor: 'background.paper' }}
                  >
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <TextField
                        fullWidth
                        label="Objection"
                        value={objection.text}
                        onChange={(e) => handleObjectionChange(index, 'text', e.target.value)}
                      />
                      <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel>Severity</InputLabel>
                        <Select
                          value={objection.severity}
                          onChange={(e) => handleObjectionChange(index, 'severity', e.target.value)}
                          label="Severity"
                        >
                          <MenuItem value="High">High</MenuItem>
                          <MenuItem value="Medium">Medium</MenuItem>
                          <MenuItem value="Low">Low</MenuItem>
                        </Select>
                      </FormControl>
                      <IconButton 
                        onClick={() => {
                          setEditedStakeholder(prev => ({
                            ...prev,
                            anticipatedObjections: prev.anticipatedObjections.filter((_, i) => i !== index)
                          }));
                        }}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
          <Button 
            onClick={handleEditClose}
            sx={{ 
              color: '#cc0000',
              '&:hover': { bgcolor: 'rgba(204, 0, 0, 0.04)' },
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleEditSave}
            variant="contained"
            sx={{ 
              bgcolor: '#cc0000',
              '&:hover': { bgcolor: '#aa0000' }
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={perspectiveModalOpen}
        onClose={handlePerspectiveClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            maxHeight: '90vh',
            overflowY: 'auto'
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar 
              sx={{ 
                bgcolor: '#cc0000', 
                mr: 2,
                width: 40,
                height: 40,
                '& .MuiSvgIcon-root': {
                  fontSize: 20
                }
              }}
            >
              {stakeholder.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h6" component="div">
                {stakeholder.name}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Perspective Analysis
              </Typography>
            </Box>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ px: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ 
              mb: 3, 
              borderBottom: 1, 
              borderColor: 'divider',
              '& .MuiTab-root': {
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: '#cc0000',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: 20,
                  marginRight: 1,
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#cc0000',
              },
            }}
          >
            <Tab 
              label="Analysis" 
              icon={<ArticleOutlined />} 
              iconPosition="start"
              sx={{ minHeight: 48 }}
            />
            <Tab 
              label="Chat" 
              icon={<ChatBubbleOutline />} 
              iconPosition="start"
              sx={{ minHeight: 48 }}
            />
          </Tabs>

          {activeTab === 0 ? (
            // Existing analysis content
            <Box>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Summary
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {mockPerspective.summary}
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Key Points
                </Typography>
                <List>
                  {mockPerspective.keyPoints.map((point, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <ArrowUpward sx={{ color: '#cc0000', fontSize: 20 }} />
                      </ListItemIcon>
                      <ListItemText primary={point} />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Positive Alignment
                  </Typography>
                  <Stack spacing={1} alignItems="flex-start">
                    {mockPerspective.recommendationAlignment.positive.map((item, index) => (
                      <Chip
                        key={index}
                        label={item}
                        icon={<CheckCircle />}
                        sx={{
                          bgcolor: 'rgba(76, 175, 80, 0.08)',
                          color: '#4caf50',
                          '& .MuiChip-icon': { color: '#4caf50' },
                          maxWidth: '100%',
                          height: 'auto',
                          '& .MuiChip-label': {
                            whiteSpace: 'normal',
                            display: 'block',
                            py: 0.5,
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Potential Concerns
                  </Typography>
                  <Stack spacing={1} alignItems="flex-start">
                    {mockPerspective.recommendationAlignment.concerns.map((item, index) => (
                      <Chip
                        key={index}
                        label={item}
                        icon={<Warning />}
                        sx={{
                          bgcolor: 'rgba(244, 67, 54, 0.08)',
                          color: '#f44336',
                          '& .MuiChip-icon': { color: '#f44336' },
                          maxWidth: '100%',
                          height: 'auto',
                          '& .MuiChip-label': {
                            whiteSpace: 'normal',
                            display: 'block',
                            py: 0.5,
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </Grid>
              </Grid>

              <Box>
                <Typography variant="h6" gutterBottom>
                  Suggested Approach
                </Typography>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 2,
                    bgcolor: 'rgba(25, 118, 210, 0.08)',
                    borderColor: 'rgba(25, 118, 210, 0.2)',
                  }}
                >
                  <Typography variant="body1" color="primary">
                    {mockPerspective.suggestedApproach}
                  </Typography>
                </Paper>
              </Box>
            </Box>
          ) : (
            // New chat interface
            <Box sx={{ height: '60vh', display: 'flex', flexDirection: 'column' }}>
              <Box 
                ref={chatContainerRef}
                sx={{ 
                  flex: 1,
                  overflowY: 'auto',
                  mb: 2,
                  p: 2,
                  bgcolor: 'rgba(204, 0, 0, 0.02)',
                  borderRadius: 1
                }}
              >
                {chatHistory.map((chat, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: chat.type === 'user' ? 'flex-end' : 'flex-start',
                      mb: 2
                    }}
                  >
                    {chat.type === 'stakeholder' && (
                      <Avatar 
                        sx={{ 
                          bgcolor: '#cc0000', 
                          width: 32, 
                          height: 32, 
                          mr: 1 
                        }}
                      >
                        {stakeholder.name.charAt(0)}
                      </Avatar>
                    )}
                    <Paper
                      sx={{
                        maxWidth: '70%',
                        p: 2,
                        bgcolor: chat.type === 'user' ? 'rgba(204, 0, 0, 0.08)' : 'white',
                        color: chat.type === 'user' ? '#cc0000' : 'text.primary',
                        borderRadius: 2,
                        boxShadow: 1,
                        border: chat.type === 'user' ? '1px solid rgba(204, 0, 0, 0.2)' : '1px solid rgba(0, 0, 0, 0.12)'
                      }}
                    >
                      <Typography variant="body1">
                        {chat.message}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          display: 'block',
                          mt: 0.5,
                          color: chat.type === 'user' ? 'rgba(204, 0, 0, 0.7)' : 'text.secondary'
                        }}
                      >
                        {new Date(chat.timestamp).toLocaleTimeString()}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
                {isSending && (
                  <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: '#cc0000', 
                        width: 32, 
                        height: 32, 
                        mr: 1 
                      }}
                    >
                      {stakeholder.name.charAt(0)}
                    </Avatar>
                    <CircularProgress size={20} sx={{ color: '#cc0000' }} />
                  </Box>
                )}
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Ask a question..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={isSending}
                  multiline
                  maxRows={3}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(204, 0, 0, 0.5)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#cc0000',
                      },
                    }
                  }}
                />
                <IconButton 
                  onClick={handleSendMessage}
                  disabled={!chatMessage.trim() || isSending}
                  sx={{ 
                    bgcolor: '#cc0000',
                    color: 'white',
                    '&:hover': {
                      bgcolor: '#aa0000'
                    },
                    '&.Mui-disabled': {
                      bgcolor: 'rgba(204, 0, 0, 0.3)',
                      color: 'white'
                    }
                  }}
                >
                  <Send />
                </IconButton>
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3, borderTop: 1, borderColor: 'divider', bgcolor: 'grey.50', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Button 
              startIcon={<SaveAltOutlined />}
              sx={{ 
                color: '#cc0000',
                '&:hover': { bgcolor: 'rgba(204, 0, 0, 0.04)' },
              }}
            >
              Save to Assets
            </Button>
          </Box>
          <Button 
            onClick={handlePerspectiveClose}
            sx={{ 
              color: '#cc0000',
              '&:hover': { bgcolor: 'rgba(204, 0, 0, 0.04)' },
            }}
          >
            Close
          </Button>
          {activeTab === 0 && (
            <LoadingButton
              onClick={handleRegenerateClick}
              loading={isGenerating}
              startIcon={<Refresh />}
              variant="contained"
              sx={{
                bgcolor: '#cc0000',
                '&:hover': {
                  bgcolor: '#aa0000'
                }
              }}
            >
              Regenerate
            </LoadingButton>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

const RecommendationCard = ({ recommendation }) => {
  const [selectedStakeholder, setSelectedStakeholder] = useState(null);
  
  const getImpactColor = (score) => {
    if (score >= 4) return '#4caf50';
    if (score >= 3) return '#ff9800';
    return '#f44336';
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          {recommendation.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {recommendation.description}
        </Typography>

        <Typography variant="caption" color="text.secondary" gutterBottom>
          Impact Analysis
        </Typography>
        <Box sx={{ mb: 2 }}>
          {Object.entries(recommendation.impact).map(([area, score]) => (
            <Box key={area} sx={{ mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="caption" sx={{ flex: 1, textTransform: 'capitalize' }}>
                  {area}
                </Typography>
                <Typography variant="caption" sx={{ color: getImpactColor(score) }}>
                  {score}/5
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={score * 20} 
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: getImpactColor(score),
                  },
                }}
              />
            </Box>
          ))}
        </Box>

        <Typography variant="caption" color="text.secondary" gutterBottom>
          Stakeholder Perspective
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          {Object.entries(recommendation.stakeholderImpact).map(([type, impact]) => (
            <Chip
              key={type}
              label={`${type}: ${impact.score}/5`}
              size="small"
              onClick={() => setSelectedStakeholder(type)}
              sx={{
                backgroundColor: selectedStakeholder === type ? 'rgba(204, 0, 0, 0.08)' : 'transparent',
                color: selectedStakeholder === type ? '#cc0000' : 'inherit',
                border: '1px solid',
                borderColor: selectedStakeholder === type ? '#cc0000' : 'rgba(0, 0, 0, 0.23)',
              }}
            />
          ))}
        </Stack>

        {selectedStakeholder && (
          <Box sx={{ mt: 2, p: 1, bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              Benefits
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap', gap: 1 }}>
              {recommendation.stakeholderImpact[selectedStakeholder].benefits.map((benefit, index) => (
                <Chip
                  key={index}
                  label={benefit}
                  size="small"
                  icon={<CheckCircle sx={{ fontSize: '16px !important' }} />}
                  sx={{ 
                    backgroundColor: 'rgba(76, 175, 80, 0.08)',
                    color: '#4caf50',
                    '& .MuiChip-icon': { color: '#4caf50' },
                  }}
                />
              ))}
            </Stack>
            
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              Concerns
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {recommendation.stakeholderImpact[selectedStakeholder].concerns.map((concern, index) => (
                <Chip
                  key={index}
                  label={concern}
                  size="small"
                  icon={<Warning sx={{ fontSize: '16px !important' }} />}
                  sx={{ 
                    backgroundColor: 'rgba(244, 67, 54, 0.08)',
                    color: '#f44336',
                    '& .MuiChip-icon': { color: '#f44336' },
                  }}
                />
              ))}
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

// Main Strategy component
const Strategy = () => {
  const { customerName } = useParams();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <AssessmentNav customerName={customerName} />
      
      <Box>
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
            <Tab label="Stakeholder Analysis" icon={<Person />} iconPosition="start" />
            <Tab label="Perspective Simulation" icon={<Psychology />} iconPosition="start" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <Grid container spacing={3}>
            {/* Stakeholder Personas */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Stakeholder Personas</Typography>
                <Button
                  startIcon={<AddIcon />}
                  sx={{
                    color: '#cc0000',
                    '&:hover': { backgroundColor: 'rgba(204, 0, 0, 0.04)' },
                  }}
                >
                  Add Stakeholder
                </Button>
              </Box>
              <Grid container spacing={2}>
                {mockStakeholders.map((stakeholder) => (
                  <Grid item xs={12} sm={6} md={4} key={stakeholder.id}>
                    <StakeholderCard stakeholder={stakeholder} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Grid container spacing={3}>
            {/* Recommendations Analysis */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Recommendation Impact Analysis</Typography>
                <Button
                  startIcon={<AddIcon />}
                  sx={{
                    color: '#cc0000',
                    '&:hover': { backgroundColor: 'rgba(204, 0, 0, 0.04)' },
                  }}
                >
                  Add Recommendation
                </Button>
              </Box>
              <Grid container spacing={2}>
                {mockRecommendations.map((recommendation) => (
                  <Grid item xs={12} md={6} key={recommendation.id}>
                    <RecommendationCard recommendation={recommendation} />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Gap Analysis */}
            <Grid item xs={12}>
              <InfoCard title="Stakeholder Alignment Analysis" icon={<Assignment />}>
                <Typography variant="body2" color="text.secondary">
                  Analysis of gaps between recommendations and stakeholder priorities
                </Typography>
              </InfoCard>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Strategy; 