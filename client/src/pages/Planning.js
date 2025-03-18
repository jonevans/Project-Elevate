import React, { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondary,
  Alert,
  CircularProgress,
  Snackbar,
  Card,
  CardContent,
} from '@mui/material';
import {
  CloudUpload,
  Description,
  PictureAsPdf,
  Image,
  Notes,
  AccountTree,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Business,
  Code,
  Person,
  TrendingUp,
  Warning,
  ContentCopy,
  Refresh,
  QuestionAnswer,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
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

const fileTypes = [
  { value: 'transcript', label: 'Transcript', icon: <Description /> },
  { value: 'pdf', label: 'PDF Document', icon: <PictureAsPdf /> },
  { value: 'notes', label: 'Notes', icon: <Notes /> },
  { value: 'workflow', label: 'Workflow Diagram', icon: <AccountTree /> },
  { value: 'image', label: 'Image', icon: <Image /> },
];

const FileUploadWidget = ({ onFileAccepted }) => {
  const [uploadError, setUploadError] = useState('');
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setUploadError('');
    
    if (rejectedFiles?.length > 0) {
      const file = rejectedFiles[0];
      if (file.size > MAX_FILE_SIZE) {
        setUploadError(`File is too large. Maximum size is 10MB.`);
      }
      return;
    }

    const file = acceptedFiles[0];
    if (file.size > MAX_FILE_SIZE) {
      setUploadError(`File is too large. Maximum size is 10MB.`);
      return;
    }

    onFileAccepted(file);
  }, [onFileAccepted, MAX_FILE_SIZE]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: MAX_FILE_SIZE
  });

  return (
    <InfoCard title="Upload Assets" icon={<CloudUpload />}>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: isDragActive ? '#cc0000' : uploadError ? '#d32f2f' : 'grey.300',
          borderRadius: 1,
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragActive ? 'rgba(204, 0, 0, 0.04)' : 'transparent',
          '&:hover': {
            borderColor: uploadError ? '#d32f2f' : '#cc0000',
            backgroundColor: 'rgba(204, 0, 0, 0.04)',
          },
        }}
      >
        <input {...getInputProps()} />
        <CloudUpload 
          sx={{ 
            fontSize: 48, 
            color: uploadError ? '#d32f2f' : isDragActive ? '#cc0000' : 'text.secondary',
            mb: 2 
          }} 
        />
        <Typography 
          variant="h6" 
          color={uploadError ? '#d32f2f' : isDragActive ? '#cc0000' : 'text.primary'}
        >
          {isDragActive ? 'Drop the file here' : 'Drag and drop a file here'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          or click to select a file
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Maximum file size: 10MB
        </Typography>
      </Box>
      {uploadError && (
        <Alert 
          severity="error" 
          sx={{ mt: 2 }}
          onClose={() => setUploadError('')}
        >
          {uploadError}
        </Alert>
      )}
    </InfoCard>
  );
};

const PrepCard = ({ title, icon, onClick }) => (
  <Card
    onClick={onClick}
    sx={{
      height: '100%',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 3,
        borderColor: '#cc0000',
      },
    }}
  >
    <CardContent>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        {React.cloneElement(icon, { sx: { fontSize: 40, color: '#cc0000', mb: 2 } })}
        <Typography variant="h6">{title}</Typography>
      </Box>
    </CardContent>
  </Card>
);

function DataSynthesis() {
  const { customerName } = useParams();
  const [openMetadataModal, setOpenMetadataModal] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [metadata, setMetadata] = useState({
    type: '',
    description: '',
    intent: '',
  });
  
  const [openPrepModal, setOpenPrepModal] = useState(false);
  const [selectedPrep, setSelectedPrep] = useState(null);
  const [customPrompt, setCustomPrompt] = useState('');
  
  const prepCategories = [
    {
      id: 'c-level',
      title: 'C-Level Intel',
      icon: <Business />,
      content: `Executive Discussion Points:

1. Current Business Challenges
- Market positioning and competitive landscape
- Growth targets and strategic initiatives
- Current operational bottlenecks
- Budget considerations and ROI expectations

2. Strategic Value Proposition
- Impact on revenue and cost optimization
- Competitive advantage opportunities
- Risk mitigation strategies
- Long-term scalability benefits

3. Implementation Considerations
- Resource allocation and timeline
- Change management approach
- Success metrics and KPIs
- Governance and oversight structure

4. Future State Vision
- Digital transformation roadmap
- Innovation opportunities
- Market expansion potential
- Strategic partnerships and integrations`,
    },
    {
      id: 'tech',
      title: 'Tech Questions',
      icon: <Code />,
      content: `Technical Assessment Questions:

1. Infrastructure & Architecture
- What is your current tech stack composition?
- How are your systems currently integrated?
- What are your main scalability challenges?
- Describe your deployment and DevOps practices

2. Security & Compliance
- What security frameworks do you follow?
- How do you handle data privacy and protection?
- What compliance requirements are you subject to?
- Describe your incident response process

3. Performance & Reliability
- What are your current performance metrics?
- How do you handle system monitoring?
- What is your disaster recovery strategy?
- What are your biggest technical pain points?

4. Future Technology Roadmap
- What technical debt needs addressing?
- Are you considering any emerging technologies?
- How do you approach technology selection?
- What are your automation priorities?`,
    },
    {
      id: 'user',
      title: 'User Questions',
      icon: <Person />,
      content: `End-User Experience Assessment:

1. Current Workflow Analysis
- What are your daily operational processes?
- Which tasks consume most of your time?
- What are the common friction points?
- How do you collaborate across teams?

2. Pain Points & Challenges
- What frustrates you most about current systems?
- Where do you see the biggest inefficiencies?
- What manual processes need automation?
- How do system issues impact your work?

3. Feature Requirements
- What capabilities are missing currently?
- Which tools do you use most frequently?
- What would make your job easier?
- How do you prefer to access information?

4. Success Criteria
- What does an ideal solution look like?
- How would you measure improvement?
- What training would you need?
- What would drive user adoption?`,
    },
    {
      id: 'industry',
      title: 'Industry Analysis',
      icon: <TrendingUp />,
      content: `Industry Context & Trends:

1. Market Dynamics
- Current industry challenges and opportunities
- Regulatory changes and compliance requirements
- Competitive landscape analysis
- Market growth projections

2. Technology Trends
- Industry-specific technology adoption
- Digital transformation initiatives
- Emerging technology impact
- Innovation opportunities

3. Best Practices
- Industry standard methodologies
- Successful implementation cases
- Common pitfalls to avoid
- Benchmark metrics

4. Future Outlook
- Industry evolution predictions
- Potential disruptive factors
- Growth opportunities
- Risk considerations`,
    },
    {
      id: 'objections',
      title: 'Common Objections',
      icon: <Warning />,
      content: `Anticipated Concerns & Responses:

1. Cost & ROI
- Initial investment concerns
- Operating cost implications
- ROI timeline expectations
- Hidden cost considerations

2. Implementation & Disruption
- Resource commitment required
- Impact on current operations
- Timeline and phasing concerns
- Change management challenges

3. Technical Concerns
- Integration complexity
- Data migration risks
- Security considerations
- Performance impact

4. Organizational Impact
- User adoption challenges
- Training requirements
- Process change implications
- Resource allocation needs

5. Risk Mitigation
- Fallback strategies
- Quality assurance approach
- Support and maintenance
- Success metrics and validation`,
    },
    {
      id: 'ask-anything',
      title: 'Ask Me Anything',
      icon: <QuestionAnswer />,
      content: `Open-Ended Discussion Topics:

1. General Questions
- What specific aspects of the business would you like to explore?
- Are there any unique challenges you'd like to discuss?
- What areas need the most clarification?
- What keeps you up at night regarding this project?

2. Custom Inquiries
- What topics weren't covered in other sections?
- Are there industry-specific questions you need answered?
- What additional context would be helpful?
- What assumptions should we validate?

3. Strategic Considerations
- Are there specific market conditions to consider?
- What competitive factors should we discuss?
- How do you see the business evolving?
- What potential disruptions should we prepare for?

4. Specific Concerns
- What particular aspects need more detailed exploration?
- Are there historical challenges we should address?
- What future scenarios should we consider?
- What dependencies might impact success?`,
    },
  ];

  // Mock data - replace with actual data from your backend
  const [assets, setAssets] = useState([
    {
      id: 1,
      name: 'Kickoff Meeting Notes.txt',
      type: 'notes',
      description: 'Initial meeting with client stakeholders',
      intent: 'Document key requirements and pain points',
      uploadDate: '2024-03-15',
      size: '24.5 KB',
    },
    {
      id: 2,
      name: 'Current Architecture.pdf',
      type: 'pdf',
      description: 'System architecture documentation',
      intent: 'Understand existing infrastructure',
      uploadDate: '2024-03-16',
      size: '1.2 MB',
    },
  ]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleFileAccepted = useCallback((file) => {
    setCurrentFile(file);
    setOpenMetadataModal(true);
  }, []);

  const handleMetadataSubmit = async () => {
    if (currentFile && metadata.type && metadata.description) {
      setIsUploading(true);
      
      try {
        // Simulate file upload - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const newAsset = {
          id: assets.length + 1,
          name: currentFile.name,
          type: metadata.type,
          description: metadata.description,
          intent: metadata.intent,
          uploadDate: new Date().toISOString().split('T')[0],
          size: formatFileSize(currentFile.size),
        };
        
        setAssets([...assets, newAsset]);
        setCurrentFile(null);
        setMetadata({ type: '', description: '', intent: '' });
        setOpenMetadataModal(false);
        setUploadSuccess(true);
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const getFileIcon = (type) => {
    const fileType = fileTypes.find(t => t.value === type);
    return fileType ? fileType.icon : <Description />;
  };

  const handlePrepClick = (prep) => {
    setSelectedPrep(prep);
    setOpenPrepModal(true);
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(selectedPrep.content);
    // You could add a small notification here if desired
  };

  const handleRegenerateContent = () => {
    // This would be connected to your AI service
    console.log('Regenerating content for:', selectedPrep.id);
  };

  const handleSaveToAssets = () => {
    const newAsset = {
      id: assets.length + 1,
      name: `${selectedPrep?.title} - AI Generated.txt`,
      type: 'notes',
      description: `${selectedPrep?.title} - AI Generated Content`,
      intent: customPrompt || 'AI-generated interview preparation content',
      uploadDate: new Date().toISOString().split('T')[0],
      size: `${selectedPrep?.content.length} B`,
    };
    
    setAssets([...assets, newAsset]);
    setUploadSuccess(true);
  };

  return (
    <Box>
      <AssessmentNav customerName={customerName} />
      
      <Box sx={{ px: 4, pb: 4 }}>
        <Grid container spacing={3}>
          {/* File Upload Widget */}
          <Grid item xs={12}>
            <FileUploadWidget onFileAccepted={handleFileAccepted} />
          </Grid>

          {/* Assets List */}
          <Grid item xs={12}>
            <InfoCard title="Assessment Assets" icon={<Description />}>
              <Grid container spacing={2}>
                {assets.map((asset) => (
                  <Grid item xs={12} sm={6} md={4} key={asset.id}>
                    <Card 
                      variant="outlined"
                      sx={{
                        height: '100%',
                        borderColor: 'grey.200',
                        position: 'relative',
                      }}
                    >
                      <CardContent>
                        <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
                          <IconButton size="small" sx={{ color: 'text.secondary' }}>
                            <EditIcon />
                          </IconButton>
                          <IconButton size="small" sx={{ color: 'text.secondary' }}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, pr: 7 }}>
                          {React.cloneElement(getFileIcon(asset.type), { 
                            sx: { color: 'text.secondary', mr: 1 } 
                          })}
                          <Typography 
                            variant="subtitle1" 
                            noWrap 
                            sx={{ 
                              maxWidth: 'calc(100% - 80px)',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {asset.name}
                          </Typography>
                        </Box>
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ 
                            mb: 2,
                            minHeight: '40px',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {asset.description}
                        </Typography>
                        {asset.intent && (
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ 
                              mb: 2,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}
                          >
                            Intent: {asset.intent}
                          </Typography>
                        )}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          <Chip
                            size="small"
                            label={fileTypes.find(t => t.value === asset.type)?.label}
                          />
                          <Chip
                            size="small"
                            label={asset.size}
                            sx={{ backgroundColor: 'grey.100' }}
                          />
                          <Chip
                            size="small"
                            label={`Uploaded: ${asset.uploadDate}`}
                            variant="outlined"
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </InfoCard>
          </Grid>

          {/* Interview Preparation */}
          <Grid item xs={12}>
            <InfoCard title="Interview Preparation" icon={<Description />}>
              <Grid container spacing={2}>
                {prepCategories.map((prep) => (
                  <Grid item xs={12} sm={6} md={4} key={prep.id}>
                    <PrepCard
                      title={prep.title}
                      icon={prep.icon}
                      onClick={() => handlePrepClick(prep)}
                    />
                  </Grid>
                ))}
              </Grid>
            </InfoCard>
          </Grid>
        </Grid>
      </Box>

      {/* Interview Prep Modal */}
      <Dialog
        open={openPrepModal}
        onClose={() => setOpenPrepModal(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { 
            minHeight: '80vh',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column'
          }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {selectedPrep?.icon}
            <Typography variant="h6" sx={{ ml: 1 }}>
              {selectedPrep?.title}
            </Typography>
          </Box>
          <IconButton
            aria-label="close"
            onClick={() => setOpenPrepModal(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'text.secondary'
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent 
          sx={{ 
            flex: 1,
            overflow: 'auto',
            pb: 0,
            position: 'relative'
          }}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              whiteSpace: 'pre-wrap',
              mb: 3,
              fontSize: '1rem',
              lineHeight: 1.8,
              pb: 10 // Add padding to ensure content isn't hidden behind the fixed prompt box
            }}
          >
            {selectedPrep?.content}
          </Typography>
        </DialogContent>
        <Box 
          sx={{ 
            position: 'sticky',
            bottom: 0,
            bgcolor: 'background.paper',
            borderTop: 1,
            borderColor: 'divider',
            p: 3,
            pt: 2
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            Customize AI Prompt
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Add specific requirements or context to guide the AI recommendations..."
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Button
                startIcon={<ContentCopy />}
                onClick={handleCopyContent}
                sx={{ 
                  mr: 1,
                  color: '#cc0000',
                  '&:hover': {
                    backgroundColor: 'rgba(204, 0, 0, 0.04)'
                  }
                }}
              >
                Copy
              </Button>
              <Button
                startIcon={<Refresh />}
                onClick={handleRegenerateContent}
                sx={{ 
                  mr: 1,
                  color: '#cc0000',
                  '&:hover': {
                    backgroundColor: 'rgba(204, 0, 0, 0.04)'
                  }
                }}
              >
                Regenerate
              </Button>
              <Button
                onClick={handleSaveToAssets}
                sx={{ 
                  mr: 1,
                  color: '#cc0000',
                  '&:hover': {
                    backgroundColor: 'rgba(204, 0, 0, 0.04)'
                  }
                }}
              >
                Save to Assets
              </Button>
            </Box>
            <Button
              onClick={() => setOpenPrepModal(false)}
              sx={{ color: 'text.secondary' }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Dialog>

      {/* Metadata Modal */}
      <Dialog
        open={openMetadataModal}
        onClose={() => !isUploading && setOpenMetadataModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          File Details
          {!isUploading && (
            <IconButton
              aria-label="close"
              onClick={() => setOpenMetadataModal(false)}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'text.secondary'
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              File: {currentFile?.name} ({formatFileSize(currentFile?.size || 0)})
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>File Type</InputLabel>
              <Select
                value={metadata.type}
                label="File Type"
                onChange={(e) => setMetadata({ ...metadata, type: e.target.value })}
                required
                disabled={isUploading}
              >
                {fileTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {React.cloneElement(type.icon, { sx: { mr: 1 } })}
                      {type.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Description"
              value={metadata.description}
              onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
              margin="normal"
              required
              multiline
              rows={2}
              disabled={isUploading}
            />
            <TextField
              fullWidth
              label="Intent"
              value={metadata.intent}
              onChange={(e) => setMetadata({ ...metadata, intent: e.target.value })}
              margin="normal"
              required
              multiline
              rows={2}
              helperText="How should this file be used in the assessment?"
              disabled={isUploading}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenMetadataModal(false)}
            sx={{ color: 'text.secondary' }}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleMetadataSubmit}
            disabled={!metadata.type || !metadata.description || isUploading}
            sx={{ 
              color: '#cc0000',
              '&:hover': {
                backgroundColor: 'rgba(204, 0, 0, 0.04)'
              }
            }}
            startIcon={isUploading ? <CircularProgress size={20} /> : null}
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={uploadSuccess}
        autoHideDuration={3000}
        onClose={() => setUploadSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setUploadSuccess(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          File uploaded successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default DataSynthesis; 