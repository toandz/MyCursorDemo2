import React from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  CardMedia,
  useTheme,
  Stack,
  IconButton
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Placeholder notebook covers - in a real app, these would come from your backend
const notebooks = [
  {
    id: '2025',
    title: '2025 Planner',
    description: 'Plan ahead with your 2025 digital planner'
  },
  // Add more notebooks here in the future
];

const Landing = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'background.default',
          pt: 8,
          pb: 6
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component="h1"
                variant="h2"
                color="text.primary"
                gutterBottom
                sx={{ fontWeight: 700 }}
              >
                Your Digital Life,
                <br />
                Beautifully Organized
              </Typography>
              <Typography variant="h5" color="text.secondary" paragraph>
                Transform your planning experience with our all-in-one digital planner.
                Featuring customizable templates, habit tracking, and beautiful stickers.
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                sx={{ mt: 4 }}
              >
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={() => navigate('/signup')}
                >
                  Get Started Free
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/placeholder-hero.png"
                alt="Digital Planner Preview"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: 600,
                  display: 'block',
                  margin: 'auto'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Notebooks Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h3"
            color="text.primary"
            gutterBottom
            sx={{ fontWeight: 700, textAlign: 'center', mb: 6 }}
          >
            Your Digital Planners
          </Typography>

          <Grid container spacing={4}>
            {/* Add New Notebook Card */}
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 400,
                  cursor: 'pointer',
                  border: `2px dashed ${theme.palette.divider}`,
                  backgroundColor: 'white',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)'
                  }
                }}
                elevation={0}
                onClick={() => navigate('/signup')}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <IconButton 
                    sx={{ 
                      width: 60, 
                      height: 60, 
                      mb: 2,
                      backgroundColor: theme.palette.background.paper
                    }}
                  >
                    <AddIcon fontSize="large" />
                  </IconButton>
                  <Typography variant="h6" component="div">
                    Create New Planner
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Start fresh with a new digital planner
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Existing Notebooks */}
            {notebooks.map((notebook) => (
              <Grid item key={notebook.id} xs={12} sm={6} md={4}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 400,
                    cursor: 'pointer',
                    backgroundColor: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.3s ease-in-out'
                    }
                  }}
                  onClick={() => navigate('/calendar')}
                >
                  {/* Notebook Binding */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '30px',
                      background: `linear-gradient(90deg, ${theme.palette.grey[300]}, ${theme.palette.grey[100]})`,
                      borderRight: `1px solid ${theme.palette.grey[400]}`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      padding: '12px 0',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: '50%',
                        width: '1px',
                        background: theme.palette.grey[400],
                      }
                    }}
                  >
                    {/* Binding rings */}
                    {Array.from({ length: 12 }).map((_, i) => (
                      <Box
                        key={i}
                        sx={{
                          height: '12px',
                          width: '100%',
                          background: `linear-gradient(90deg, ${theme.palette.grey[400]}, ${theme.palette.grey[300]})`,
                          borderTop: `1px solid ${theme.palette.grey[500]}`,
                          borderBottom: `1px solid ${theme.palette.grey[500]}`
                        }}
                      />
                    ))}
                  </Box>

                  {/* Notebook Cover */}
                  <Box
                    sx={{
                      height: 300,
                      ml: '30px', // Space for binding
                      background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      position: 'relative',
                      borderBottom: `1px solid ${theme.palette.grey[300]}`,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                      }
                    }}
                  >
                    <Typography 
                      variant="h1" 
                      sx={{ 
                        fontWeight: 700, 
                        opacity: 0.9,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                      }}
                    >
                      {notebook.id}
                    </Typography>
                  </Box>

                  {/* Notebook Content */}
                  <CardContent sx={{ flexGrow: 1, ml: '30px' }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {notebook.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {notebook.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Login CTA for returning users */}
          {notebooks.length === 0 && (
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Already have an account?
              </Typography>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/login')}
              >
                Login to View Your Planners
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Landing; 