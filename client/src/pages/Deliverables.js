import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  TextField,
  Tooltip,
  Collapse,
  Stack,
  Checkbox,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Fab,
  LinearProgress,
} from '@mui/material';
import {
  Description,
  Slideshow,
  AccountTree,
  Assignment,
  CloudDownload,
  History,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FileCopy as CloneIcon,
  MoreVert as MoreVertIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  Close as CloseIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import AssessmentNav from '../components/AssessmentNav';

// Template categories with their respective icons
const templateCategories = [
  {
    id: 'word',
    title: 'Microsoft Word Reports',
    icon: <Description />,
    templates: [
      {
        id: 1,
        title: 'Assessment Executive Summary',
        description: 'Professional template for executive-level findings and recommendations',
        lastUpdated: '2024-03-20',
        version: '2.1',
        tags: ['executive', 'findings', 'recommendations'],
        thumbnail: 'word_template1.png',
      },
      {
        id: 2,
        title: 'Detailed Technical Analysis',
        description: 'Comprehensive template for technical assessment documentation',
        lastUpdated: '2024-03-18',
        version: '1.3',
        tags: ['technical', 'analysis', 'implementation'],
        thumbnail: 'word_template2.png',
      },
      {
        id: 5,
        title: 'One-Page Executive Brief',
        description: 'Concise summary template for C-level executives',
        lastUpdated: '2024-03-16',
        version: '1.5',
        tags: ['executive', 'summary', 'brief'],
        thumbnail: 'summary_template1.png',
      },
    ],
  },
  {
    id: 'powerpoint',
    title: 'PowerPoint Presentations',
    icon: <Slideshow />,
    templates: [
      {
        id: 3,
        title: 'Stakeholder Presentation',
        description: 'Executive-friendly presentation template for key findings',
        lastUpdated: '2024-03-19',
        version: '2.0',
        tags: ['presentation', 'executive', 'findings'],
        thumbnail: 'ppt_template1.png',
      },
    ],
  },
  {
    id: 'diagrams',
    title: 'Process Diagrams',
    icon: <AccountTree />,
    templates: [
      {
        id: 4,
        title: 'Implementation Roadmap',
        description: 'Visual template for project implementation planning',
        lastUpdated: '2024-03-17',
        version: '1.1',
        tags: ['implementation', 'planning', 'visual'],
        thumbnail: 'diagram_template1.png',
      },
    ],
  },
];

const InfoCard = ({ title, icon, children, collapsible = false }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <Paper sx={{ p: 3, height: 'auto' }}>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: expanded ? 2 : 0,
          cursor: collapsible ? 'pointer' : 'default',
        }}
        onClick={() => collapsible && setExpanded(!expanded)}
      >
        {React.cloneElement(icon, { sx: { color: '#cc0000' } })}
        <Typography variant="h6" sx={{ ml: 1, flex: 1 }}>
          {title}
        </Typography>
        {collapsible && (
          <IconButton 
            size="small"
            sx={{ 
              transform: expanded ? 'rotate(90deg)' : 'none',
              transition: 'transform 0.2s',
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        )}
      </Box>
      <Collapse in={expanded}>
        {expanded && (
          <>
            <Divider sx={{ mb: 2 }} />
            {children}
          </>
        )}
      </Collapse>
    </Paper>
  );
};

const TemplateCard = ({ template, selected, onSelect }) => {
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <>
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          border: selected ? '2px solid #cc0000' : 'none',
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
                {template.title}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                v{template.version}
              </Typography>
            </Box>
            <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
              <Checkbox
                checked={selected}
                onChange={(e) => onSelect(template.id, e.target.checked)}
                sx={{
                  color: '#cc0000',
                  '&.Mui-checked': {
                    color: '#cc0000',
                  },
                }}
              />
            </Box>
          </Box>
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
            {template.tags.slice(0, 2).map((tag) => (
              <Chip
                key={tag}
                label={tag}
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
            ))}
            {template.tags.length > 2 && (
              <Typography variant="caption" color="text.secondary">
                +{template.tags.length - 2}
              </Typography>
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ p: 1, pt: 0, justifyContent: 'flex-end' }}>
          <Tooltip title="Preview">
            <IconButton size="small" onClick={() => setPreviewOpen(true)}>
              <Description sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download Template">
            <IconButton size="small">
              <CloudDownload sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>

      {/* Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">{template.title}</Typography>
            <IconButton onClick={() => setPreviewOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Description</Typography>
            <Typography variant="body2" color="text.secondary">
              {template.description}
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Tags</Typography>
            <Stack direction="row" spacing={1}>
              {template.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{ 
                    backgroundColor: 'rgba(204, 0, 0, 0.08)',
                    color: '#cc0000',
                  }}
                />
              ))}
            </Stack>
          </Box>
          <Box sx={{ height: 400, backgroundColor: 'grey.100', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="text.secondary">Template Preview</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)} sx={{ color: 'text.secondary' }}>
            Close
          </Button>
          <Button 
            variant="contained"
            sx={{ 
              backgroundColor: '#cc0000',
              '&:hover': { backgroundColor: '#aa0000' },
            }}
          >
            Use Template
          </Button>
        </DialogActions>
      </Dialog>

      {/* Version History Dialog */}
      <Dialog
        open={versionHistoryOpen}
        onClose={() => setVersionHistoryOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Version History
          <Typography variant="subtitle2" color="text.secondary">
            {template.title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {/* Mock version history */}
            {[
              {
                version: template.version,
                date: template.lastUpdated,
                author: 'John Doe',
                changes: 'Updated executive summary section and added new recommendation templates',
              },
              {
                version: '1.0',
                date: '2024-03-10',
                author: 'Jane Smith',
                changes: 'Initial template creation',
              },
            ].map((version, index) => (
              <Box key={version.version} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle2">
                    Version {version.version}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {version.date}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {version.changes}
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  By {version.author}
                </Typography>
                {index !== 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setVersionHistoryOpen(false)}
            sx={{ color: 'text.secondary' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const ContentGenerationModal = ({ open, onClose, selectedTemplates, templates }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFiles, setGeneratedFiles] = useState([]);
  const [generationProgress, setGenerationProgress] = useState(0);
  
  // Reset state when modal is opened
  React.useEffect(() => {
    if (open) {
      setActiveStep(0);
      setIsGenerating(false);
      setGeneratedFiles([]);
      setGenerationProgress(0);
    }
  }, [open]);

  const handleNext = () => {
    if (activeStep === selectedTemplates.length - 1) {
      handleGenerateDocuments();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getTemplateById = (id) => templates.find(t => t.id === id);

  // Mock data that would come from previous steps
  const mockPreviousStepData = {
    onboarding: {
      companyName: "Acme Corp",
      industry: "Manufacturing",
      mainChallenges: "Legacy system modernization, data security",
      stakeholders: ["CTO", "IT Director", "Security Team"],
      objectives: ["Improve system performance", "Enhance security measures"]
    },
    planning: {
      interviewFindings: {
        technical: "Current infrastructure requires significant updates",
        business: "Operational inefficiencies due to manual processes",
        security: "Multiple potential vulnerabilities identified"
      },
      recommendations: [
        "Implement modern cloud architecture",
        "Automate key business processes",
        "Enhance security protocols"
      ]
    },
    dataSynthesis: {
      metrics: {
        performance: "System response time: 3.5s (industry avg: 1.2s)",
        security: "15 critical vulnerabilities identified",
        efficiency: "40% of processes require manual intervention"
      },
      priorities: [
        "Address critical security vulnerabilities",
        "Modernize core infrastructure",
        "Implement automation framework"
      ]
    }
  };

  const getTemplateContent = (template) => {
    switch (template.id) {
      case 1: // Assessment Executive Summary
        return {
          title: "Executive Summary Fields",
          sections: [
            {
              label: "Background",
              defaultValue: `${mockPreviousStepData.onboarding.companyName} is seeking to address challenges in ${mockPreviousStepData.onboarding.mainChallenges}.`,
              type: "text"
            },
            {
              label: "Key Findings",
              defaultValue: Object.values(mockPreviousStepData.planning.interviewFindings).join("\n"),
              type: "bullets"
            },
            {
              label: "Recommendations",
              defaultValue: mockPreviousStepData.planning.recommendations,
              type: "bullets"
            }
          ]
        };
      case 2: // Detailed Technical Analysis
        return {
          title: "Technical Analysis Fields",
          sections: [
            {
              label: "Current State Analysis",
              defaultValue: mockPreviousStepData.dataSynthesis.metrics,
              type: "metrics"
            },
            {
              label: "Technical Findings",
              defaultValue: mockPreviousStepData.planning.interviewFindings.technical,
              type: "text"
            },
            {
              label: "Implementation Recommendations",
              defaultValue: mockPreviousStepData.planning.recommendations,
              type: "bullets"
            }
          ]
        };
      case 3: // Stakeholder Presentation
        return {
          title: "Presentation Content",
          sections: [
            {
              label: "Executive Overview",
              defaultValue: mockPreviousStepData.planning.interviewFindings.business,
              type: "text"
            },
            {
              label: "Key Metrics",
              defaultValue: mockPreviousStepData.dataSynthesis.metrics,
              type: "metrics"
            },
            {
              label: "Action Items",
              defaultValue: mockPreviousStepData.dataSynthesis.priorities,
              type: "bullets"
            }
          ]
        };
      // Add cases for other templates...
      default:
        return {
          title: "Content Fields",
          sections: [
            {
              label: "Content",
              defaultValue: "",
              type: "text"
            }
          ]
        };
    }
  };

  const renderContentField = (section) => {
    switch (section.type) {
      case "bullets":
        return (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              {section.label}
            </Typography>
            {Array.isArray(section.defaultValue) ? (
              section.defaultValue.map((bullet, idx) => (
                <TextField
                  key={idx}
                  fullWidth
                  defaultValue={bullet}
                  variant="outlined"
                  size="small"
                  sx={{ mb: 1 }}
                />
              ))
            ) : (
              <TextField
                fullWidth
                multiline
                rows={4}
                defaultValue={section.defaultValue}
                variant="outlined"
                size="small"
              />
            )}
          </Box>
        );
      case "metrics":
        return (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              {section.label}
            </Typography>
            {Object.entries(section.defaultValue).map(([key, value]) => (
              <Box key={key} sx={{ mb: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Typography>
                <TextField
                  fullWidth
                  defaultValue={value}
                  variant="outlined"
                  size="small"
                />
              </Box>
            ))}
          </Box>
        );
      default:
        return (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              {section.label}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              defaultValue={section.defaultValue}
              variant="outlined"
              size="small"
            />
          </Box>
        );
    }
  };

  const handleGenerateDocuments = async () => {
    setIsGenerating(true);
    setGeneratedFiles([]);
    setGenerationProgress(0);

    // Mock document generation with progress
    const totalDocs = selectedTemplates.length;
    for (let i = 0; i < totalDocs; i++) {
      const template = getTemplateById(selectedTemplates[i]);
      // Simulate document generation delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a mock file object
      const fileName = `${mockPreviousStepData.onboarding.companyName.replace(/\s+/g, '_')}_${template.title.replace(/\s+/g, '_')}.${template.id === 3 ? 'pptx' : 'docx'}`;
      const newFile = {
        id: template.id,
        name: fileName,
        template: template.title,
        url: '#', // This would be a real URL in production
        type: template.id === 3 ? 'PowerPoint' : 'Word',
        icon: template.id === 3 ? <Slideshow fontSize="small" /> : <Description fontSize="small" />,
      };

      setGeneratedFiles(prev => [...prev, newFile]);
      setGenerationProgress(((i + 1) / totalDocs) * 100);
    }

    setIsGenerating(false);
  };

  const renderGenerationProgress = () => (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <LinearProgress 
            variant="determinate" 
            value={generationProgress} 
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
        <Typography variant="body2" color="text.secondary" sx={{ ml: 2, minWidth: 45 }}>
          {Math.round(generationProgress)}%
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" align="center">
        Generating documents... Please wait
      </Typography>
    </Box>
  );

  const renderGeneratedFiles = () => (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Generated Documents
      </Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={2}>
          {generatedFiles.map((file) => (
            <Box
              key={file.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              {file.icon}
              <Box sx={{ ml: 2, flex: 1 }}>
                <Typography variant="subtitle2">{file.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {file.type} Document
                </Typography>
              </Box>
              <Button
                variant="outlined"
                size="small"
                startIcon={<CloudDownload />}
                sx={{
                  color: '#cc0000',
                  borderColor: '#cc0000',
                  '&:hover': {
                    borderColor: '#aa0000',
                    backgroundColor: 'rgba(204, 0, 0, 0.04)',
                  },
                }}
                onClick={() => window.open(file.url, '_blank')}
              >
                Download
              </Button>
            </Box>
          ))}
        </Stack>
      </Paper>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: '#cc0000',
            '&:hover': { backgroundColor: '#aa0000' },
          }}
        >
          Close
        </Button>
      </Box>
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { minHeight: '80vh' }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">
            {isGenerating || generatedFiles.length > 0 ? 'Document Generation' : 'Generate Content'}
          </Typography>
          {!(isGenerating || generatedFiles.length > 0) && (
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </DialogTitle>
      <DialogContent>
        {isGenerating ? (
          renderGenerationProgress()
        ) : generatedFiles.length > 0 ? (
          renderGeneratedFiles()
        ) : (
          <Stepper 
            activeStep={activeStep} 
            orientation="vertical"
            sx={{
              '& .MuiStepIcon-root': {
                color: '#cc0000',
                '& .MuiStepIcon-text': {
                  fill: '#ffffff',
                },
              },
              '& .MuiStepIcon-root.Mui-completed': {
                color: '#cc0000',
                '& .MuiStepIcon-text': {
                  fill: '#ffffff',
                },
              },
              '& .MuiStepConnector-line': {
                borderColor: '#cc0000',
              },
              '& .Mui-active': {
                '& .MuiStepIcon-root': {
                  color: '#cc0000',
                },
                '& .MuiStepIcon-text': {
                  fill: '#ffffff',
                },
              },
              '& .MuiStepLabel-label.Mui-active': {
                color: '#cc0000',
              },
              '& .MuiStepIcon-text': {
                fill: '#ffffff',
              },
            }}
          >
            {selectedTemplates.map((templateId, index) => {
              const template = getTemplateById(templateId);
              const content = getTemplateContent(template);
              return (
                <Step key={template.id}>
                  <StepLabel>
                    <Typography variant="subtitle1">{template.title}</Typography>
                  </StepLabel>
                  <StepContent>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Review and enhance the pre-populated content for your {template.title.toLowerCase()}:
                      </Typography>
                      
                      {content.sections.map((section, idx) => (
                        renderContentField(section)
                      ))}

                      <Box sx={{ mt: 3 }}>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{
                            mr: 1,
                            backgroundColor: '#cc0000',
                            '&:hover': { backgroundColor: '#aa0000' },
                          }}
                        >
                          {index === selectedTemplates.length - 1 ? 'Generate Documents' : 'Continue'}
                        </Button>
                        {index > 0 && (
                          <Button
                            onClick={handleBack}
                            sx={{ color: 'text.secondary' }}
                          >
                            Back
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
        )}
      </DialogContent>
    </Dialog>
  );
};

function Deliverables() {
  const { customerName } = useParams();
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [contentModalOpen, setContentModalOpen] = useState(false);

  const handleTemplateSelect = (templateId, isSelected) => {
    setSelectedTemplates(prev => 
      isSelected 
        ? [...prev, templateId]
        : prev.filter(id => id !== templateId)
    );
  };

  // Flatten all templates into a single array for easier lookup
  const allTemplates = templateCategories.reduce((acc, category) => 
    [...acc, ...category.templates], []);

  return (
    <Box>
      <AssessmentNav customerName={customerName} />
      
      <Box sx={{ px: 4, pb: 4 }}>
        <Grid container spacing={3}>
          {/* Template Categories */}
          {templateCategories.map((category) => (
            <Grid item xs={12} key={category.id}>
              <InfoCard title={category.title} icon={category.icon}>
                <Grid container spacing={2}>
                  {category.templates.map((template) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={template.id}>
                      <TemplateCard 
                        template={template}
                        selected={selectedTemplates.includes(template.id)}
                        onSelect={handleTemplateSelect}
                      />
                    </Grid>
                  ))}
                </Grid>
              </InfoCard>
            </Grid>
          ))}
        </Grid>

        {/* Floating Action Button for Generate Content */}
        {selectedTemplates.length > 0 && (
          <Fab
            variant="extended"
            sx={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              backgroundColor: '#cc0000',
              color: 'white',
              '&:hover': {
                backgroundColor: '#aa0000',
              },
            }}
            onClick={() => setContentModalOpen(true)}
          >
            <AddIcon sx={{ mr: 1 }} />
            Generate Content ({selectedTemplates.length})
          </Fab>
        )}

        {/* Content Generation Modal */}
        <ContentGenerationModal
          open={contentModalOpen}
          onClose={() => setContentModalOpen(false)}
          selectedTemplates={selectedTemplates}
          templates={allTemplates}
        />
      </Box>
    </Box>
  );
}

export default Deliverables; 