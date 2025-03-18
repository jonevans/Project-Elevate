import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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
} from '@mui/material';
import {
  Description,
  PictureAsPdf,
  Notes,
  Add as AddIcon,
  ContentCopy as ContentCopyIcon,
  Refresh as RefreshIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import AssessmentNav from '../components/AssessmentNav';

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
  const [synthesisResults, setSynthesisResults] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
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

  const handleToggleAsset = (assetId) => {
    const newSelected = new Set(selectedAssets);
    if (newSelected.has(assetId)) {
      newSelected.delete(assetId);
    } else {
      newSelected.add(assetId);
    }
    setSelectedAssets(newSelected);
  };

  const handleGenerateSynthesis = async () => {
    setIsGenerating(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock synthesis results
    setSynthesisResults({
      summary: `Based on the analysis of ${selectedAssets.size} selected documents, here are the key insights:

The client's technical infrastructure shows significant opportunities for optimization, particularly in the areas of scalability and system integration. Current pain points include manual processes in the deployment pipeline and limited monitoring capabilities.

Stakeholder interviews reveal a strong emphasis on improving development velocity while maintaining system reliability. The CTO has highlighted specific concerns about the current architecture's ability to handle projected growth over the next 18 months.

Key recommendations will focus on implementing automated deployment processes, enhancing monitoring systems, and establishing a more robust scaling strategy aligned with business growth projections.`,
      timestamp: new Date().toISOString(),
    });
    
    setIsGenerating(false);
  };

  const handleCopySynthesis = () => {
    if (synthesisResults) {
      navigator.clipboard.writeText(synthesisResults.summary);
    }
  };

  const handleSaveAsAsset = () => {
    if (synthesisResults) {
      // Here you would typically make an API call to save the synthesis
      // For now, we'll just log it
      console.log('Saving synthesis as asset:', synthesisResults);
    }
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

  return (
    <Box>
      <AssessmentNav customerName={customerName} />
      <Box sx={{ px: 4, pb: 4 }}>
        <Grid container spacing={3}>
          {/* Asset Selection */}
          <Grid item xs={12}>
            <InfoCard title="Select Assets for Synthesis" icon={<Description />}>
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
            </InfoCard>
          </Grid>

          {/* Synthesis Results */}
          {synthesisResults && (
            <Grid item xs={12}>
              <InfoCard title="Synthesis Results" icon={<Description />}>
                <Box sx={{ position: 'relative' }}>
                  <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 0, right: 0 }}>
                    <Tooltip title="Copy to clipboard">
                      <IconButton 
                        onClick={handleCopySynthesis}
                        sx={{ 
                          color: '#cc0000',
                          '&:hover': { backgroundColor: 'rgba(204, 0, 0, 0.04)' }
                        }}
                      >
                        <ContentCopyIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Regenerate synthesis">
                      <IconButton 
                        onClick={handleGenerateSynthesis}
                        sx={{ 
                          color: '#cc0000',
                          '&:hover': { backgroundColor: 'rgba(204, 0, 0, 0.04)' }
                        }}
                      >
                        <RefreshIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Save as asset">
                      <IconButton 
                        onClick={handleSaveAsAsset}
                        sx={{ 
                          color: '#cc0000',
                          '&:hover': { backgroundColor: 'rgba(204, 0, 0, 0.04)' }
                        }}
                      >
                        <SaveIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mt: 2 }}>
                    {synthesisResults.summary}
                  </Typography>
                </Box>
              </InfoCard>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* Generate Button */}
      {selectedAssets.size > 0 && !isGenerating && (
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
          onClick={handleGenerateSynthesis}
        >
          <AddIcon sx={{ mr: 1 }} />
          Generate Synthesis ({selectedAssets.size})
        </Fab>
      )}
    </Box>
  );
}

export default DataSynthesis; 