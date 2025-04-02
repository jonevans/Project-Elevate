import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Checkbox,
  Chip,
  Divider,
  Card,
  CardContent,
  Button,
  Fab,
  IconButton,
  Stack,
  Tooltip,
  Tabs,
  Tab,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
} from '@mui/material';
import {
  Description,
  PictureAsPdf,
  Notes,
  Add as AddIcon,
  ContentCopy as ContentCopyIcon,
  Refresh as RefreshIcon,
  Save as SaveIcon,
  ChevronRight,
  ExpandLess as ChevronUp,
  ExpandMore as ChevronDown,
  PlayArrow,
  Visibility,
  CheckCircle,
  Edit,
  Warning,
  Info,
  BarChart,
  FileCopy,
} from '@mui/icons-material';
import AssessmentNav from '../components/AssessmentNav';
import AutomatedInsights from '../components/data-synthesis/automated-insights/AutomatedInsights';
import PatternMatcher from '../components/data-synthesis/pattern-matching/PatternMatcher';
import RecommendationEngine from '../components/data-synthesis/recommendations/RecommendationEngine';
import AnalysisTools from '../components/data-synthesis/analysis-tools/AnalysisTools';
import SynthesisWorkspace from '../components/data-synthesis/workspace/SynthesisWorkspace';
import ConversionMetrics from '../components/data-synthesis/conversion/ConversionMetrics';

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

function DataSynthesis() {
  const { customerName } = useParams();
  const [selectedAssets, setSelectedAssets] = useState(new Set());
  const [activeTab, setActiveTab] = useState(0);
  const [expandedAnalysis, setExpandedAnalysis] = useState(null);
  const [viewingOutput, setViewingOutput] = useState(false);
  const [completedAnalyses, setCompletedAnalyses] = useState([1, 2, 4, 6, 8, 10, 12, 14]); // 8 completed analyses for demo
  const [analyzing, setAnalyzing] = useState(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [recentDocuments, setRecentDocuments] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  
  const analysisTypes = [
    { id: 1, name: "Gap Analysis", description: "Identify differences between current and desired states", completed: false },
    { id: 2, name: "Cause & Effect Analysis", description: "Examine how issues impact outcomes across systems", completed: false },
    { id: 3, name: "Cross-Domain Connections", description: "Find relationships between different business areas", completed: false },
    { id: 4, name: "Dependency Mapping", description: "Map interconnections between systems and processes", completed: false },
    { id: 5, name: "Contradiction Exploration", description: "Highlight misalignments between expectations and reality", completed: false },
    { id: 6, name: "Hidden Opportunity", description: "Uncover potential improvements that might be overlooked", completed: false },
    { id: 7, name: "Root Cause Analysis", description: "Find underlying issues behind symptoms", completed: false },
    { id: 8, name: "Impact Chain Reaction", description: "Project how changes might ripple through the organization", completed: true },
    { id: 9, name: "Stakeholder Influence", description: "Analyze how stakeholders affect outcomes", completed: false },
    { id: 10, name: "Historical Patterns", description: "Compare current situations to past successes", completed: false },
    { id: 11, name: "Strategic Alignment", description: "Ensure recommendations support business objectives", completed: false },
    { id: 12, name: "Trend Analysis", description: "Identify patterns across systems and time", completed: false },
    { id: 13, name: "Risk Assessment", description: "Evaluate potential vulnerabilities and impacts", completed: false },
    { id: 14, name: "Comparative Analysis", description: "Benchmark against industry standards and peers", completed: false },
  ];
  
  // Mock data - replace with actual data from your backend
  const [assets] = useState([
    {
      id: 1,
      name: 'Kickoff Meeting Notes.txt',
      type: 'notes',
      description: 'Initial meeting with client stakeholders',
      uploadDate: '2024-03-15',
      size: '24.5 KB',
    },
    {
      id: 2,
      name: 'Current Architecture.pdf',
      type: 'pdf',
      description: 'System architecture documentation',
      uploadDate: '2024-03-16',
      size: '1.2 MB',
    },
    {
      id: 3,
      name: 'Stakeholder Interview.txt',
      type: 'transcript',
      description: 'Interview with CTO about technical challenges',
      uploadDate: '2024-03-17',
      size: '45.8 KB',
    },
    {
      id: 4,
      name: 'Requirements Document.pdf',
      type: 'pdf',
      description: 'Detailed requirements specification',
      uploadDate: '2024-03-18',
      size: '2.1 MB',
    },
  ]);

  const templates = [
    { id: 1, title: "Executive Summary", type: "word", description: "High-level overview of findings" },
    { id: 2, title: "Technical Analysis", type: "word", description: "Detailed technical assessment" },
    { id: 3, title: "Recommendations Report", type: "word", description: "Strategic recommendations" },
    { id: 4, title: "Implementation Plan", type: "word", description: "Step-by-step implementation guide" },
    { id: 5, title: "Stakeholder Presentation", type: "pdf", description: "Presentation for stakeholders" },
  ];

  const handleToggleAsset = (assetId) => {
    const newSelected = new Set(selectedAssets);
    if (newSelected.has(assetId)) {
      newSelected.delete(assetId);
    } else {
      newSelected.add(assetId);
    }
    setSelectedAssets(newSelected);
  };

  const toggleExpandAnalysis = (id) => {
    setExpandedAnalysis(expandedAnalysis === id ? null : id);
    setViewingOutput(false);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <PictureAsPdf />;
      case 'transcript':
        return <Description />;
      case 'notes':
        return <Notes />;
      default:
        return <Description />;
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAnalysisStart = async (analysisId) => {
    setAnalyzing(analysisId);
    setAnalysisProgress(0);
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setAnalyzing(null);
            setCompletedAnalyses(prev => [...prev, analysisId]);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleCloseAnalysisModal = () => {
    setAnalyzing(null);
    setAnalysisProgress(0);
  };

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplates(prev => {
      if (prev.some(t => t.id === templateId)) {
        return prev.filter(t => t.id !== templateId);
      } else {
        const template = templates.find(t => t.id === templateId);
        return [...prev, template];
      }
    });
  };

  const handleGenerateDocuments = async () => {
    if (selectedTemplates.length === 0) return;
    
    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Simulate document generation progress
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Create new documents
          const newDocuments = selectedTemplates.map(template => ({
            id: Date.now() + Math.random(),
            name: template.title,
            type: template.type,
            date: new Date().toISOString(),
            size: '2.5 MB',
            status: 'Completed'
          }));
          
          // Update recent documents
          setRecentDocuments(prevDocs => [...newDocuments, ...prevDocs]);
          
          // Clear selection and reset generation state
          setSelectedTemplates([]);
          setIsGenerating(false);
          
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <Box>
      <AssessmentNav customerName={customerName} />
      <Box sx={{ px: 4, pb: 4 }}>
        <Grid container spacing={3}>
          {/* Asset Selection */}
          <Grid item xs={12}>
            <InfoCard title="Selected Assets for Analysis" icon={<Description />}>
              <Grid container spacing={2}>
                {assets.map((asset) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={asset.id}>
                    <Card 
                      sx={{ 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        border: selectedAssets.has(asset.id) ? '2px solid #cc0000' : 'none',
                        '&:hover': {
                          boxShadow: 3,
                          transform: 'translateY(-2px)',
                          transition: 'all 0.2s ease-in-out',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 2, pb: 1, flex: 1, position: 'relative' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                          <Box sx={{ flex: 1, minWidth: 0, pr: 7 }}>
                            <Typography variant="subtitle2" noWrap>
                              {asset.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" display="block">
                              {asset.size}
                            </Typography>
                          </Box>
                          <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                            <Checkbox
                              checked={selectedAssets.has(asset.id)}
                              onChange={() => handleToggleAsset(asset.id)}
                              sx={{
                                color: '#cc0000',
                                '&.Mui-checked': {
                                  color: '#cc0000',
                                },
                              }}
                            />
                          </Box>
                        </Box>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ 
                            mb: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            minHeight: '40px'
                          }}
                        >
                          {asset.description}
                        </Typography>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            gap: 0.5, 
                            flexWrap: 'wrap',
                            mb: 1,
                            minHeight: '24px',
                            maxHeight: '24px',
                            overflow: 'hidden'
                          }}
                        >
                          <Chip
                            key={asset.type}
                            label={asset.type}
                            size="small"
                            sx={{ 
                              height: '20px',
                              backgroundColor: 'rgba(204, 0, 0, 0.08)',
                              color: '#cc0000',
                              '& .MuiChip-label': {
                                px: 1,
                                fontSize: '0.7rem',
                              },
                            }}
                          />
                          <Chip
                            label={`Uploaded: ${asset.uploadDate}`}
                            size="small"
                            sx={{ 
                              height: '20px',
                              '& .MuiChip-label': {
                                px: 1,
                                fontSize: '0.7rem',
                              },
                            }}
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Button
                component={Link}
                to={`/assessments/${customerName}/planning`}
                startIcon={<AddIcon />}
                sx={{ mt: 2, color: '#cc0000' }}
              >
                Add more assets
              </Button>
            </InfoCard>
          </Grid>

          {/* Analysis Types */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Analysis Types
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Select analysis type to run against your assets
                </Typography>
              </Box>
              
              <Grid container spacing={2}>
                {analysisTypes.map((analysis) => (
                  <Grid item xs={12} md={6} key={analysis.id}>
                    <Card
                      sx={{
                        border: completedAnalyses.includes(analysis.id) ? '1px solid #4caf50' : '1px solid #e0e0e0',
                        '&:hover': {
                          borderColor: '#cc0000',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                              {completedAnalyses.includes(analysis.id) && (
                                <CheckCircle sx={{ color: '#4caf50', mr: 1 }} />
                              )}
                              {analysis.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {analysis.description}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            {completedAnalyses.includes(analysis.id) && (
                              <IconButton
                                size="small"
                                onClick={() => toggleExpandAnalysis(analysis.id)}
                                sx={{ color: '#cc0000' }}
                              >
                                {expandedAnalysis === analysis.id ? <ChevronUp /> : <ChevronDown />}
                              </IconButton>
                            )}
                            <IconButton
                              size="small"
                              sx={{
                                color: completedAnalyses.includes(analysis.id) ? '#4caf50' : '#cc0000',
                                backgroundColor: completedAnalyses.includes(analysis.id) ? 'rgba(76, 175, 80, 0.1)' : 'rgba(204, 0, 0, 0.1)',
                                opacity: selectedAssets.size > 0 ? 1 : 0.5,
                                cursor: selectedAssets.size > 0 ? 'pointer' : 'not-allowed',
                              }}
                              onClick={() => selectedAssets.size > 0 && handleAnalysisStart(analysis.id)}
                              disabled={selectedAssets.size === 0}
                            >
                              {completedAnalyses.includes(analysis.id) ? <Visibility /> : <PlayArrow />}
                            </IconButton>
                          </Box>
                        </Box>

                        <Collapse in={expandedAnalysis === analysis.id && completedAnalyses.includes(analysis.id)}>
                          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Analysis Results
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                              Analysis completed on March 27, 2025. 3 key findings and 3 preliminary recommendations identified.
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="caption" color="text.secondary">
                                Created insight asset: Impact_Chain_Analysis.txt
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button
                                  size="small"
                                  onClick={() => setViewingOutput(true)}
                                  sx={{ color: '#cc0000' }}
                                >
                                  View Full Results
                                </Button>
                                <Button
                                  size="small"
                                  startIcon={<Edit />}
                                  sx={{ color: '#cc0000' }}
                                >
                                  Edit
                                </Button>
                              </Box>
                            </Box>
                          </Box>
                        </Collapse>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Completed Analyses Summary */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Completed Analyses
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Summary of completed analyses and their insights
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {completedAnalyses.length} of {analysisTypes.length} completed
                </Typography>
              </Box>

              <Grid container spacing={2}>
                {analysisTypes
                  .filter(analysis => completedAnalyses.includes(analysis.id))
                  .map((analysis) => (
                    <Grid item xs={12} key={analysis.id}>
                      <Card>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <CheckCircle sx={{ color: '#4caf50', mr: 1 }} />
                            <Typography variant="subtitle1">
                              {analysis.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                              Completed {Math.floor(Math.random() * 24)} hours ago
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {analysis.description}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" color="text.secondary">
                              Created insight asset: {analysis.name.replace(/\s+/g, '_')}_Analysis.txt
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Button
                                size="small"
                                onClick={() => {
                                  setExpandedAnalysis(analysis.id);
                                  setViewingOutput(true);
                                }}
                                sx={{ color: '#cc0000' }}
                              >
                                View Results
                              </Button>
                              <Button
                                size="small"
                                startIcon={<Edit />}
                                sx={{ color: '#cc0000' }}
                              >
                                Edit
                              </Button>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Button
                  startIcon={<BarChart />}
                  sx={{ color: '#cc0000' }}
                >
                  View Analysis Progress
                </Button>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  sx={{ bgcolor: '#cc0000', '&:hover': { bgcolor: '#aa0000' } }}
                >
                  Save All Insights
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Final Analysis Actions */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Final Analysis
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Generate recommendations and executive summary based on completed analyses
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Generate Recommendations
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Create targeted recommendations based on analysis insights
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<PlayArrow />}
                        disabled
                        sx={{ bgcolor: 'grey.300', color: 'text.secondary' }}
                      >
                        Available after 10 analyses
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Create Executive Summary
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Synthesize all analyses into comprehensive summary
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<PlayArrow />}
                        disabled
                        sx={{ bgcolor: 'grey.300', color: 'text.secondary' }}
                      >
                        Available after recommendations
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Analysis Progress Modal */}
      <Dialog
        open={analyzing !== null}
        onClose={handleCloseAnalysisModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Running Analysis
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
            <CircularProgress 
              variant="determinate" 
              value={analysisProgress} 
              size={60}
              sx={{ color: '#cc0000', mb: 2 }}
            />
            <Typography variant="h6" gutterBottom>
              Processing Analysis
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please wait while we analyze your data...
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
              {analysisProgress}% complete
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default DataSynthesis; 