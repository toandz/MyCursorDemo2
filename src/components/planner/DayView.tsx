import React, { useState } from 'react';
import { 
  Box, 
  Drawer, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  IconButton,
  Paper,
  Divider
} from '@mui/material';
import { ChevronRight, Add as AddIcon } from '@mui/icons-material';
import { templates } from '../templates/PlannerTemplates';

interface DayViewProps {
  date: Date;
  onClose: () => void;
}

const DRAWER_WIDTH = 340;

const DayView: React.FC<DayViewProps> = ({ date, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setIsDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const selectedTemplateComponent = selectedTemplate 
    ? templates.find(t => t.id === selectedTemplate)?.component()
    : null;

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default' }}>
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: theme => theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginRight: `${DRAWER_WIDTH}px`,
          ...(isDrawerOpen && {
            transition: theme => theme.transitions.create('margin', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
          }),
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            {date.toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Typography>
          <IconButton 
            onClick={toggleDrawer}
            sx={{ ml: 2 }}
            size="small"
          >
            <ChevronRight />
          </IconButton>
        </Box>

        {/* Canvas Area */}
        <Paper 
          elevation={0}
          sx={{ 
            height: 'calc(100vh - 140px)',
            bgcolor: 'white',
            borderRadius: 2,
            overflow: 'auto'
          }}
        >
          {selectedTemplateComponent ? (
            selectedTemplateComponent
          ) : (
            <Box 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexDirection: 'column',
                color: 'text.secondary'
              }}
            >
              <AddIcon sx={{ fontSize: 40, mb: 2 }} />
              <Typography>
                Select a template from the sidebar to get started
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>

      {/* Template Drawer */}
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            border: 'none',
            bgcolor: 'grey.50'
          },
        }}
        variant="persistent"
        anchor="right"
        open={isDrawerOpen}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Templates
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Choose a template to start creating
          </Typography>
        </Box>
        
        <Divider />
        
        <List>
          {templates.map((template) => (
            <ListItem
              button
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              selected={selectedTemplate === template.id}
              sx={{
                mb: 1,
                borderRadius: 1,
                mx: 1,
                '&.Mui-selected': {
                  bgcolor: 'primary.light',
                  '&:hover': {
                    bgcolor: 'primary.light',
                  }
                }
              }}
            >
              <ListItemIcon>
                {template.icon}
              </ListItemIcon>
              <ListItemText 
                primary={template.title}
                secondary={template.description}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default DayView; 