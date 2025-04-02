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
} from '@mui/icons-material';
import AssessmentNav from '../components/AssessmentNav';

function Deliverables() {
  const { customerName } = useParams();
  const [currentView, setCurrentView] = useState('review');
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [progress, setProgress] = useState(25);
  const [expandedSections, setExpandedSections] = useState({
    onPremiseCompute: true,
    networking: true,
    softwareApplications: true
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

  const handleTemplateSelect = (templateId, isSelected) => {
    setSelectedTemplates(prev => 
      isSelected 
        ? [...prev, templateId]
        : prev.filter(id => id !== templateId)
    );
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
      {
        id: 1,
      title: 'Full Assessment Report',
      description: 'Comprehensive document with all findings and recommendations',
      type: 'word',
      icon: <Description />,
      },
      {
        id: 2,
      title: 'Validation Slides',
      description: 'Executive presentation for stakeholder review',
      type: 'powerpoint',
      icon: <Slideshow />,
    },
      {
        id: 3,
      title: 'Executive Summary',
      description: 'Concise overview of key findings and recommendations',
      type: 'word',
      icon: <Description />,
    },
      {
        id: 4,
      title: 'Recommendation Matrix',
      description: 'Prioritized action items with implementation timeline',
      type: 'diagram',
    icon: <AccountTree />,
    },
  ];

  // Sample data for the review interface
  const reviewData = {
    executiveSummary: {
      content: "Bath Concepts operates with functional but aging IT infrastructure that presents several areas of concern. Key vulnerabilities include single points of failure in network equipment, inadequate security monitoring, and limited backup capabilities."
    },
    onPremiseCompute: {
      categories: [
        {
          name: "Hypervisor",
          expanded: false,
          items: []
        },
        {
          name: "Physical Servers",
          expanded: false,
          items: []
        },
        {
          name: "Physical Storage",
          expanded: true,
          items: [
            {
              name: "Dell EMC Storage",
              status: "pending",
              findings: [
                "Unity 380 array at 75% capacity",
                "Running 5.0.3 firmware (out of date)",
                "No performance issues reported"
              ],
      recommendations: [
                "Upgrade firmware to latest version",
                "Plan capacity expansion in next 6 months"
              ]
            },
            {
              name: "Synology NAS",
              status: "pending",
              findings: [
                "RS1221+ used for file shares",
                "RAID5 configuration with 8x4TB drives",
                "No backup configured"
              ],
              recommendations: [
                "Implement backup solution for NAS data",
                "Consider migration to RAID6 for better redundancy"
              ]
            }
          ]
        },
        {
          name: "Virtual Machines",
          expanded: false,
          items: []
        },
        {
          name: "Sub Roles",
          expanded: false,
          items: []
        }
      ]
    },
    networking: {
      categories: [
        {
          name: "WAN",
          expanded: false,
          items: []
        },
        {
          name: "Remote Connectivity",
          expanded: false,
          items: []
        },
        {
          name: "Security Appliances",
          expanded: true,
          items: [
            {
              name: "WatchGuard Firewall",
              status: "approved",
              findings: [
                "Single WatchGuard T80 firewall",
                "No secondary for HA",
                "IPS only for low-priority"
              ],
              recommendations: [
                "Replace with Cisco Meraki MX75",
                "Include 24x7x4 coverage"
              ]
            }
          ]
        },
        {
          name: "Switches",
          expanded: false,
          items: []
        }
      ]
    },
    softwareApplications: {
      categories: [
        {
          name: "ERP System",
          expanded: false,
          items: []
        },
        {
          name: "Office 365",
          expanded: false,
          items: []
        }
      ]
    }
  };

  const renderFindingsAndRecommendations = (item) => (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Findings:
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        {item.findings.map((finding, idx) => (
          <Typography key={idx} component="li" variant="body2">
            {finding}
          </Typography>
        ))}
      </Box>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Recommendations:
      </Typography>
      <Box component="ul" sx={{ pl: 3 }}>
        {item.recommendations.map((recommendation, idx) => (
          <Typography key={idx} component="li" variant="body2">
            {recommendation}
            </Typography>
        ))}
      </Box>
    </Box>
  );

  const handleAddRecommendation = (category, item) => {
    setShowAddForm({
      category,
      item
    });
  };

  const handleSaveNewRecommendation = () => {
    // Here you would typically make an API call to save the new recommendation
    console.log('Saving new recommendation:', newRecommendation);
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
    alert('New recommendation added successfully!');
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
            {renderFindingsAndRecommendations(item)}
            {showAddForm.category === category.name && showAddForm.item === item.name ? (
              renderAddRecommendationForm(category.name, item.name)
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
                onClick={() => handleAddRecommendation(category.name, item.name)}
              >
                Add Recommendation
              </Button>
            )}
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
          onClick={() => setContentModalOpen(true)}
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

      {/* Client Branding Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Client Branding</Typography>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 3,
          p: 2,
          border: '1px dashed',
          borderColor: 'grey.300',
          borderRadius: 1,
          bgcolor: 'grey.50'
        }}>
          <Box sx={{ 
            width: 120, 
            height: 60, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: 1,
            bgcolor: 'white'
          }}>
            <Typography variant="body2" color="text.secondary">No logo</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Upload client logo to include in deliverables
            </Typography>
            <Button 
              variant="outlined" 
              size="small"
              sx={{ 
                color: '#cc0000',
                borderColor: '#cc0000',
                '&:hover': {
                  borderColor: '#aa0000',
                  backgroundColor: 'rgba(204, 0, 0, 0.04)',
                },
              }}
            >
              Upload Logo
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              Maximum dimensions: 512px width × 256px height
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Template Selection */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Select Deliverable Types</Typography>
        <Grid container spacing={2}>
          {templates.map((template) => (
            <Grid item xs={12} sm={6} key={template.id}>
              <Paper
            sx={{
                  p: 2,
                  cursor: 'pointer',
                  border: selectedTemplates.includes(template.id) ? '2px solid #cc0000' : '1px solid grey',
                  '&:hover': {
                    boxShadow: 3,
                  },
                }}
                onClick={() => handleTemplateSelect(template.id, !selectedTemplates.includes(template.id))}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Checkbox
                    checked={selectedTemplates.includes(template.id)}
            sx={{
                color: '#cc0000',
                      '&.Mui-checked': {
                color: '#cc0000',
                },
                    }}
                  />
                  {template.icon}
                  <Typography variant="subtitle1" sx={{ ml: 1 }}>
                    {template.title}
                      </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {template.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

   

      {/* Generation Queue */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Ready to Generate</Typography>
        <Stack spacing={2}>
          {selectedTemplates.length > 0 ? (
            templates
              .filter(template => selectedTemplates.includes(template.id))
              .map(template => (
                <Paper key={template.id} sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ 
                      p: 1, 
                      bgcolor: 'primary.light', 
                      borderRadius: 1,
                      mr: 2,
                    }}>
                      {template.icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1">{template.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {template.description}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#cc0000',
                        '&:hover': { backgroundColor: '#aa0000' },
                      }}
                    >
                      Generate
                    </Button>
                  </Box>
                </Paper>
              ))
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Please Select A Deliverable To Generate
              </Typography>
            </Paper>
          )}
        </Stack>
      </Paper>

      {/* Recently Generated Documents */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Recently Generated Documents</Typography>
        <Stack spacing={2}>
          {false ? ( // Replace with actual condition when you have documents
            // Add your recently generated documents here
            null
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                No Recently Generated Documents
              </Typography>
            </Paper>
          )}
        </Stack>
      </Paper>
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