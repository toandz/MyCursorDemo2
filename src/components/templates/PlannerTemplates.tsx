import React from 'react';
import { Box, Typography, TextField, Grid } from '@mui/material';
import { PhotoLibrary, Assignment, Timeline, Mood } from '@mui/icons-material';

// Template definitions
export const templates = [
  {
    id: 'yearly-reflection',
    title: 'Yearly Reflection',
    icon: <Assignment />,
    description: 'Reflect on your year and set intentions for the next',
    component: () => (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          2024 Yearly Reflection
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            This year in a few words:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="Write your thoughts..."
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            What am I most proud of this year?
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="List your achievements..."
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            How can I be a better version of myself for next year?
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="Write your intentions..."
          />
        </Box>
      </Box>
    )
  },
  {
    id: 'memories',
    title: 'Memories Page',
    icon: <PhotoLibrary />,
    description: 'Create a photo collection of your memories',
    component: () => (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          2024 Memories
        </Typography>
        
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          What 2024 was to me...
        </Typography>

        <Grid container spacing={2}>
          {Array.from({ length: 9 }).map((_, index) => (
            <Grid item xs={4} key={index}>
              <Box
                sx={{
                  height: 150,
                  bgcolor: 'grey.100',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'grey.200'
                  }
                }}
              >
                <PhotoLibrary sx={{ color: 'grey.400', fontSize: 40 }} />
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1">
            What emotions am I feeling going into 2025?
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            sx={{ mt: 1 }}
            placeholder="Share your feelings..."
          />
        </Box>
      </Box>
    )
  },
  {
    id: 'habit-tracker',
    title: 'Habit Tracker',
    icon: <Timeline />,
    description: 'Track your daily and weekly habits',
    component: () => (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Habit Tracker
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 3 }}>
          Coming soon...
        </Typography>
      </Box>
    )
  },
  {
    id: 'mood-tracker',
    title: 'Mood Tracker',
    icon: <Mood />,
    description: 'Track your daily moods and emotions',
    component: () => (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Mood Tracker
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 3 }}>
          Coming soon...
        </Typography>
      </Box>
    )
  }
]; 