import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Stack,
  Divider,
  Card,
  CardContent,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp,
  Warning,
  CheckCircle,
  Info,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Link as LinkIcon,
  Unlink as UnlinkIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
} from '@mui/icons-material';

// Mock data for the workspace
const initialNodes = [
  {
    id: 1,
    type: 'insight',
    title: 'Scalability Issue',
    content: 'Current architecture shows limitations in handling projected growth',
    position: { x: 100, y: 100 },
    connections: [2, 3],
  },
  {
    id: 2,
    type: 'solution',
    title: 'Automated CI/CD',
    content: 'Implement automated deployment pipeline',
    position: { x: 300, y: 100 },
    connections: [1, 3],
  },
  {
    id: 3,
    type: 'risk',
    title: 'Manual Processes',
    content: 'Manual deployment processes causing delays',
    position: { x: 200, y: 300 },
    connections: [1, 2],
  },
];

const NodeCard = ({ node, onEdit, onDelete, onConnect }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case 'insight':
        return '#cc0000';
      case 'solution':
        return '#4caf50';
      case 'risk':
        return '#ff9800';
      default:
        return '#757575';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'insight':
        return <Info />;
      case 'solution':
        return <CheckCircle />;
      case 'risk':
        return <Warning />;
      default:
        return <Info />;
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        border: `2px solid ${getTypeColor(node.type)}`,
        '&:hover': {
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          {React.cloneElement(getTypeIcon(node.type), {
            sx: { color: getTypeColor(node.type) },
          })}
          <Typography variant="subtitle1" sx={{ ml: 1, flex: 1 }}>
            {node.title}
          </Typography>
          <Box>
            <Tooltip title="Edit">
              <IconButton size="small" onClick={() => onEdit(node)}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Connect">
              <IconButton size="small" onClick={() => onConnect(node)}>
                <LinkIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton size="small" onClick={() => onDelete(node.id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {node.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

const SynthesisWorkspace = ({ selectedAssets, synthesisResults }) => {
  const [nodes, setNodes] = useState(initialNodes);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  const handleAddNode = () => {
    const newNode = {
      id: nodes.length + 1,
      type: 'insight',
      title: 'New Insight',
      content: 'Add your insight here',
      position: { x: 100, y: 100 },
      connections: [],
    };
    setNodes([...nodes, newNode]);
  };

  const handleEditNode = (node) => {
    setSelectedNode(node);
    // Implement edit dialog/modal here
  };

  const handleDeleteNode = (nodeId) => {
    setNodes(nodes.filter(node => node.id !== nodeId));
  };

  const handleConnect = (node) => {
    setSelectedNode(node);
    // Implement connection logic here
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Synthesis Workspace
        </Typography>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Zoom Out">
            <IconButton onClick={handleZoomOut}>
              <ZoomOutIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Zoom In">
            <IconButton onClick={handleZoomIn}>
              <ZoomInIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddNode}
          >
            Add Node
          </Button>
        </Stack>
      </Box>

      <Paper
        sx={{
          p: 2,
          minHeight: '500px',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Box
          sx={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            transition: 'transform 0.2s ease-in-out',
          }}
        >
          <Grid container spacing={2}>
            {nodes.map((node) => (
              <Grid item xs={12} md={6} lg={4} key={node.id}>
                <NodeCard
                  node={node}
                  onEdit={handleEditNode}
                  onDelete={handleDeleteNode}
                  onConnect={handleConnect}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="h6" gutterBottom>
          Connection Types
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Insights
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Info sx={{ color: '#cc0000', mr: 1 }} />
                  <Typography variant="body2">
                    Key Findings
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Info sx={{ color: '#cc0000', mr: 1 }} />
                  <Typography variant="body2">
                    Data Patterns
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Solutions
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircle sx={{ color: '#4caf50', mr: 1 }} />
                  <Typography variant="body2">
                    Implementation Steps
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircle sx={{ color: '#4caf50', mr: 1 }} />
                  <Typography variant="body2">
                    Best Practices
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Risks
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Warning sx={{ color: '#ff9800', mr: 1 }} />
                  <Typography variant="body2">
                    Potential Issues
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Warning sx={{ color: '#ff9800', mr: 1 }} />
                  <Typography variant="body2">
                    Mitigation Steps
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

export default SynthesisWorkspace; 