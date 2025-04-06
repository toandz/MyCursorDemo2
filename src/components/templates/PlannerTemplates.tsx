import React, { useState, useRef, ChangeEvent } from 'react';
import { Box, Typography, TextField, Grid, Button, CircularProgress } from '@mui/material';
import { PhotoLibrary, Assignment, Timeline, Mood, CloudUpload } from '@mui/icons-material';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../services/firebase';

interface ImageUploadBoxProps {
  index: number;
  onImageUpload: (index: number, url: string) => void;
}

// Image upload component
const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({ index, onImageUpload }) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];

    // Create a preview
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        setPreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);

    setLoading(true);
    try {
      // Upload to Firebase Storage
      const storageRef = ref(storage, `memories/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      // Set image and notify parent
      setImage(downloadURL);
      onImageUpload(index, downloadURL);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      onClick={handleClick}
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
        },
        position: 'relative',
        backgroundImage: preview ? `url(${preview})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      
      {loading ? (
        <CircularProgress size={40} />
      ) : (
        !preview && (
          <Box sx={{ textAlign: 'center' }}>
            <PhotoLibrary sx={{ color: 'grey.400', fontSize: 40 }} />
            <Typography variant="caption" display="block" sx={{ color: 'grey.500', mt: 1 }}>
              Click to upload
            </Typography>
          </Box>
        )
      )}
    </Box>
  );
};

// Memories Template Component
const MemoriesTemplate: React.FC = () => {
  const [images, setImages] = useState<(string | null)[]>(Array(9).fill(null));
  
  const handleImageUpload = (index: number, url: string): void => {
    const newImages = [...images];
    newImages[index] = url;
    setImages(newImages);
  };
  
  return (
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
            <ImageUploadBox 
              index={index} 
              onImageUpload={handleImageUpload} 
            />
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
  );
};

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
    component: () => <MemoriesTemplate />
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