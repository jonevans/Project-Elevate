import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Divider,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Chip,
  Checkbox,
  Fab,
  Fade,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import {
  Description,
  Slideshow,
  AccountTree,
  CloudDownload,
  Close as CloseIcon,
  Add as AddIcon,
  ChevronRight as ChevronRightIcon,
  CheckCircle as CheckCircleIcon,
  PictureAsPdf,
  FileCopy,
} from '@mui/icons-material';
import AssessmentNav from '../components/AssessmentNav';

function Deliverables() {
  const { customerName } = useParams();
  const [currentView, setCurrentView] = useState('review');
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [progress, setProgress] = useState(25);
  const [expandedSections, setExpandedSections] = useState({
    onPremiseCompute: false,
    networking: false,
    softwareApplications: false
  });
  const [executiveSummary, setExecutiveSummary] = useState("Bath Concepts operates with functional but aging IT infrastructure that presents several areas of concern. Key vulnerabilities include single points of failure in network equipment, inadequate security monitoring, and limited backup capabilities.");
  const [newRecommendation, setNewRecommendation] = useState({
    category: '',
    item: '',
    finding: '',
    recommendation: ''
  });
  const [showAddForm, setShowAddForm] = useState({
    category: '',
    item: ''
  });
  const [approvedItems, setApprovedItems] = useState([]);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [recentDocuments, setRecentDocuments] = useState([]);
  const [reviewData, setReviewData] = useState({
    executiveSummary: {
      content: "Bath Concepts operates with functional but aging IT infrastructure that presents several areas of concern. Key vulnerabilities include single points of failure in network equipment, inadequate security monitoring, and limited backup capabilities."
    },
    onPremiseCompute: {
      categories: [
        {
          name: "Hypervisor",
          expanded: false,
          items: [
            {
              name: "VMware vSphere 6.5",
              status: "pending",
              findings: [
                "Running outdated version (6.5)",
                "No high availability configured",
                "Limited resource monitoring"
              ],
              recommendations: [
                "Upgrade to vSphere 7.0 or newer",
                "Implement vSphere HA",
                "Deploy vRealize Operations for monitoring"
              ]
            }
          ]
        },
        {
          name: "Physical Servers",
          expanded: false,
          items: [
            {
              name: "Dell PowerEdge R740",
              status: "pending",
              findings: [
                "Running Windows Server 2012 R2",
                "No redundancy for power supplies",
                "Limited memory capacity"
              ],
              recommendations: [
                "Upgrade to Windows Server 2019",
                "Add redundant power supplies",
                "Expand memory to 256GB"
              ]
            }
          ]
        }
      ]
    },
    networking: {
      categories: [
        {
          name: "WAN",
          expanded: false,
          items: [
            {
              name: "Primary Internet Connection",
              status: "pending",
              findings: [
                "100Mbps dedicated fiber",
                "No backup connection",
                "Limited bandwidth for cloud services"
              ],
              recommendations: [
                "Upgrade to 1Gbps connection",
                "Add secondary ISP",
                "Implement SD-WAN solution"
              ]
            }
          ]
        }
      ]
    },
    softwareApplications: {
      categories: [
        {
          name: "ERP System",
          expanded: false,
          items: [
            {
              name: "SAP Business One",
              status: "pending",
              findings: [
                "Version 9.2 (outdated)",
                "No disaster recovery plan",
                "Limited integration capabilities"
              ],
              recommendations: [
                "Upgrade to latest version",
                "Implement DR solution",
                "Enable API integrations"
              ]
            }
          ]
        }
      ]
    }
  });

  // Calculate total number of items that can be approved
  const getTotalApprovableItems = () => {
    let count = 0;
    Object.values(reviewData).forEach(section => {
      if (section.categories) {
        section.categories.forEach(category => {
          count += category.items.length;
        });
      }
    });
    return count;
  };

  // Calculate progress based on approved items
  const calculateProgress = () => {
    const totalItems = getTotalApprovableItems();
    if (totalItems === 0) return 25;
    const approvedCount = approvedItems.length;
    const baseProgress = 25;
    const additionalProgress = (approvedCount / totalItems) * 75;
    return Math.min(baseProgress + additionalProgress, 100);
  };

  const handleApprove = (category, item) => {
    const itemId = `${category}-${item}`;
    setApprovedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
    setProgress(calculateProgress());
  };

  const isItemApproved = (category, item) => {
    return approvedItems.includes(`${category}-${item}`);
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

  const handleViewChange = (newView) => {
    setCurrentView(newView);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Template data
  const templates = [
    { id: 1, title: "Executive Summary", type: "word", description: "High-level overview of findings" },
    { id: 2, title: "Technical Analysis", type: "word", description: "Detailed technical assessment" },
    { id: 3, title: "Recommendations Report", type: "word", description: "Strategic recommendations" },
    { id: 4, title: "Implementation Plan", type: "word", description: "Step-by-step implementation guide" },
    { id: 5, title: "Stakeholder Presentation", type: "pdf", description: "Presentation for stakeholders" },
  ];

  const renderFindingsAndRecommendations = (item) => {
    // Ensure item has the required properties
    const findings = item.findings || [];
    const recommendations = item.recommendations || [];
    
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Findings:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          {findings.map((finding, idx) => (
            <Typography key={idx} component="li" variant="body2">
              {finding}
            </Typography>
          ))}
        </Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Recommendations:
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          {recommendations.map((recommendation, idx) => (
            <Typography key={idx} component="li" variant="body2">
              {recommendation}
            </Typography>
          ))}
        </Box>
        {showAddForm.category === item.category && showAddForm.item === item.name ? (
          renderAddRecommendationForm(item.category, item.name)
        ) : (
          <Button
            startIcon={<AddIcon />}
            size="small"
            sx={{ 
              color: '#cc0000',
              mt: 2,
              '&:hover': {
                backgroundColor: 'rgba(204, 0, 0, 0.04)',
              },
            }}
            onClick={() => handleAddRecommendation(item.category, item.name)}
          >
            Add Recommendation
          </Button>
        )}
      </Box>
    );
  };

  const handleAddRecommendation = (category, item) => {
    setShowAddForm({
      category,
      item
    });
    setNewRecommendation({
      category,
      item,
      finding: '',
      recommendation: ''
    });
  };

  const handleSaveNewRecommendation = () => {
    if (!newRecommendation.category || !newRecommendation.item || !newRecommendation.finding || !newRecommendation.recommendation) {
      return;
    }

    setReviewData(prevData => {
      // Create a deep copy of the previous data
      const updatedData = JSON.parse(JSON.stringify(prevData));
      
      // Find the category section
      const categorySection = updatedData[newRecommendation.category];
      if (categorySection && categorySection.categories) {
        // Find the specific category
        const category = categorySection.categories.find(cat => 
          cat.items.some(item => item.name === newRecommendation.item)
        );
        
        if (category) {
          // Update the specific item
          category.items = category.items.map(item => {
            if (item.name === newRecommendation.item) {
              return {
                ...item,
                findings: [...(item.findings || []), newRecommendation.finding],
                recommendations: [...(item.recommendations || []), newRecommendation.recommendation]
              };
            }
            return item;
          });
        }
      }
      
      return updatedData;
    });

    // Reset form
    setNewRecommendation({
      category: '',
      item: '',
      finding: '',
      recommendation: ''
    });
    setShowAddForm({
      category: '',
      item: ''
    });
    setShowSaveSuccess(true);
    setTimeout(() => {
      setShowSaveSuccess(false);
    }, 2000);
  };

  const renderAddRecommendationForm = (category, item) => (
    <Paper 
      sx={{ 
        p: 2, 
        mt: 2,
        border: '1px dashed #cc0000',
        bgcolor: 'rgba(204, 0, 0, 0.02)'
      }}
    >
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Add New Recommendation
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          fullWidth
          label="Finding"
          multiline
          rows={2}
          value={newRecommendation.finding}
          onChange={(e) => setNewRecommendation(prev => ({
            ...prev,
            finding: e.target.value
          }))}
          variant="outlined"
          size="small"
        />
        <TextField
          fullWidth
          label="Recommendation"
          multiline
          rows={2}
          value={newRecommendation.recommendation}
          onChange={(e) => setNewRecommendation(prev => ({
            ...prev,
            recommendation: e.target.value
          }))}
          variant="outlined"
          size="small"
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button 
            variant="outlined" 
            size="small"
            onClick={() => setShowAddForm({ category: '', item: '' })}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            size="small"
            onClick={handleSaveNewRecommendation}
            sx={{
              backgroundColor: '#cc0000',
              '&:hover': { backgroundColor: '#aa0000' },
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Paper>
  );

  const renderCategoryItems = (items, category) => (
    <Box sx={{ pl: 2 }}>
      {items.map((item, idx) => {
        const isApproved = isItemApproved(category.name, item.name);
        const itemWithCategory = {
          ...item,
          category: category.name
        };
        return (
          <Paper 
            key={idx} 
            sx={{ 
              p: 2, 
              mb: 2,
              border: isApproved ? '1px solid #4caf50' : '1px solid #e0e0e0',
              bgcolor: isApproved ? '#f1f8e9' : 'white'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle1">{item.name}</Typography>
              <Chip 
                label={isApproved ? "Approved" : "Approve"} 
                size="small"
                onClick={() => handleApprove(category.name, item.name)}
                sx={{ 
                  bgcolor: isApproved ? '#4caf50' : '#cc0000',
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: isApproved ? '#388e3c' : '#aa0000',
                  },
                }}
              />
            </Box>
            {renderFindingsAndRecommendations(itemWithCategory)}
          </Paper>
        );
      })}
    </Box>
  );

  const renderCategory = (category) => (
    <Box key={category.name} sx={{ mb: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {category.name}
            </Typography>
      {category.items.length > 0 ? (
        renderCategoryItems(category.items, category)
      ) : (
        <Paper 
          sx={{ 
            p: 2, 
            mb: 2,
            border: '1px solid #e0e0e0',
            bgcolor: 'white'
          }}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            No Recommendations
          </Typography>
        </Paper>
      )}
          </Box>
        );

  const handleSaveSummary = () => {
    // Here you would typically make an API call to save the summary
    console.log('Saving executive summary:', executiveSummary);
    // Show success animation
    setShowSaveSuccess(true);
    setTimeout(() => {
      setShowSaveSuccess(false);
    }, 2000); // Hide after 2 seconds
  };

  const renderReviewInterface = () => (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Review and Approve Recommendations</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ width: '200px' }}>
          <LinearProgress 
            variant="determinate" 
              value={progress} 
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(204, 0, 0, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#cc0000',
              },
            }}
          />
        </Box>
          <Typography variant="body2" color="text.secondary">
            {progress}% Complete
        </Typography>
          <Button 
            variant="contained"
            onClick={() => handleViewChange('generate')}
            sx={{
              backgroundColor: '#cc0000',
              '&:hover': { backgroundColor: '#aa0000' },
            }}
          >
            Continue to Generation
          </Button>
      </Box>
    </Box>

      {/* Executive Summary Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Executive Summary</Typography>
        </Box>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={executiveSummary}
          onChange={(e) => setExecutiveSummary(e.target.value)}
          variant="outlined"
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
          <Fade in={showSaveSuccess} timeout={500}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircleIcon sx={{ color: '#4caf50' }} />
              <Typography variant="body2" color="success.main">
                Saved
      </Typography>
            </Box>
          </Fade>
          <Button 
            variant="contained"
            onClick={handleSaveSummary}
            sx={{
              backgroundColor: '#cc0000',
              '&:hover': { backgroundColor: '#aa0000' },
            }}
          >
            Save Summary
          </Button>
        </Box>
      </Paper>

      {/* On-Premise Compute Section */}
      <Paper sx={{ mb: 3, overflow: 'hidden' }}>
        <Box 
              sx={{
            p: 2, 
            bgcolor: 'grey.100', 
                display: 'flex',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
          onClick={() => toggleSection('onPremiseCompute')}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6">On-Premise Compute</Typography>
            <Chip 
              label={`${reviewData.onPremiseCompute.categories.length} categories`} 
              size="small" 
              sx={{ ml: 2, bgcolor: 'grey.200' }}
            />
              </Box>
          <IconButton>
            <ChevronRightIcon sx={{ 
              transform: expandedSections.onPremiseCompute ? 'rotate(90deg)' : 'none',
              transition: 'transform 0.2s'
            }} />
          </IconButton>
        </Box>
        {expandedSections.onPremiseCompute && (
          <Box sx={{ p: 2 }}>
            {reviewData.onPremiseCompute.categories.map(renderCategory)}
          </Box>
        )}
      </Paper>

      {/* Networking Section */}
      <Paper sx={{ mb: 3, overflow: 'hidden' }}>
        <Box 
          sx={{ 
            p: 2, 
            bgcolor: 'grey.100', 
            display: 'flex', 
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
          onClick={() => toggleSection('networking')}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6">Networking</Typography>
            <Chip 
              label={`${reviewData.networking.categories.length} categories`} 
                size="small"
              sx={{ ml: 2, bgcolor: 'grey.200' }}
            />
          </Box>
          <IconButton>
            <ChevronRightIcon sx={{ 
              transform: expandedSections.networking ? 'rotate(90deg)' : 'none',
              transition: 'transform 0.2s'
            }} />
          </IconButton>
        </Box>
        {expandedSections.networking && (
          <Box sx={{ p: 2 }}>
            {reviewData.networking.categories.map(renderCategory)}
          </Box>
        )}
      </Paper>

      {/* Software Applications Section */}
      <Paper sx={{ mb: 3, overflow: 'hidden' }}>
        <Box 
                sx={{
            p: 2, 
            bgcolor: 'grey.100', 
            display: 'flex', 
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
          onClick={() => toggleSection('softwareApplications')}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6">Software Applications</Typography>
            <Chip 
              label={`${reviewData.softwareApplications.categories.length} applications`} 
              size="small" 
              sx={{ ml: 2, bgcolor: 'grey.200' }}
            />
            </Box>
          <IconButton>
            <ChevronRightIcon sx={{ 
              transform: expandedSections.softwareApplications ? 'rotate(90deg)' : 'none',
              transition: 'transform 0.2s'
            }} />
          </IconButton>
        </Box>
        {expandedSections.softwareApplications && (
          <Box sx={{ p: 2 }}>
            {reviewData.softwareApplications.categories.map(renderCategory)}
          </Box>
        )}
      </Paper>
    </Box>
  );

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
          
          // Replace recent documents with only the newly generated ones
          setRecentDocuments(newDocuments);
          
          // Clear selection and reset generation state
          setSelectedTemplates([]);
          setIsGenerating(false);
          
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const renderGenerationInterface = () => (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => handleViewChange('review')}
            startIcon={<ChevronRightIcon sx={{ transform: 'rotate(180deg)' }} />}
            sx={{
              color: '#cc0000',
              borderColor: '#cc0000',
              '&:hover': {
                borderColor: '#aa0000',
                backgroundColor: 'rgba(204, 0, 0, 0.04)',
              },
            }}
          >
            Back to Recommendations
          </Button>
        </Box>
        <Button
          variant="contained"
          onClick={handleGenerateDocuments}
          disabled={selectedTemplates.length === 0}
          sx={{
            backgroundColor: '#cc0000',
            '&:hover': { backgroundColor: '#aa0000' },
            '&.Mui-disabled': {
              backgroundColor: 'grey.300',
            },
          }}
        >
          Generate All Selected
        </Button>
      </Box>

      {/* Document Templates */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Document Templates</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Select templates to generate documents
        </Typography>
        <Grid container spacing={2}>
          {templates.map((template) => (
            <Grid item xs={12} sm={6} md={4} key={template.id}>
              <Card
                sx={{
                  border: selectedTemplates.some(t => t.id === template.id) ? '2px solid #cc0000' : '1px solid #e0e0e0',
                  '&:hover': {
                    borderColor: '#cc0000',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {template.type === 'word' ? <Description /> : <PictureAsPdf />}
                    <Typography variant="subtitle1" sx={{ ml: 1, flex: 1 }}>
                      {template.title}
                    </Typography>
                    <Checkbox
                      checked={selectedTemplates.some(t => t.id === template.id)}
                      onChange={() => handleTemplateSelect(template.id)}
                      sx={{
                        color: '#cc0000',
                        '&.Mui-checked': {
                          color: '#cc0000',
                        },
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {template.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Recently Generated Documents */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Recently Generated Documents</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          View and download your recently generated documents
        </Typography>
        {recentDocuments.length > 0 ? (
          <Grid container spacing={2}>
            {recentDocuments.map((doc) => (
              <Grid item xs={12} sm={6} md={4} key={doc.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {doc.type === 'word' ? <Description /> : <PictureAsPdf />}
                      <Typography variant="subtitle1" sx={{ ml: 1, flex: 1 }}>
                        {doc.name}
                      </Typography>
                      <Chip
                        label={doc.status}
                        size="small"
                        sx={{
                          backgroundColor: doc.status === 'Completed' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                          color: doc.status === 'Completed' ? '#4caf50' : '#ff9800',
                        }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Generated on {new Date(doc.date).toLocaleDateString()}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        {doc.size}
                      </Typography>
                      <Button
                        size="small"
                        startIcon={<FileCopy />}
                        sx={{ color: '#cc0000' }}
                      >
                        Download
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No recently generated documents
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Generation Progress Modal */}
      <Dialog
        open={isGenerating}
        onClose={() => {}}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Generating Documents
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
            <CircularProgress 
              variant="determinate" 
              value={generationProgress} 
              size={60}
              sx={{ color: '#cc0000', mb: 2 }}
            />
            <Typography variant="h6" gutterBottom>
              Processing {selectedTemplates.length} documents
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please wait while we generate your documents...
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
              {generationProgress}% complete
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );

  return (
    <Box>
      <AssessmentNav customerName={customerName} />
      
      <Box sx={{ px: 4, pb: 4 }}>
        {currentView === 'review' ? renderReviewInterface() : renderGenerationInterface()}
      </Box>
    </Box>
  );
}

export default Deliverables; 