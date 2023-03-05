import React from 'react';
import { IconButton, Stack } from '@mui/material';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import ClearAllRoundedIcon from '@mui/icons-material/ClearAllRounded';
import './command-line.css';

/** Редактор форм. */
export const CommandLine: React.FC = () => {
  return (
    <div className="main">
      <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0}>
        <IconButton aria-label="upload" component="label">
          <input hidden accept="image/*" type="file" />
          <DownloadRoundedIcon />
        </IconButton>
        <IconButton aria-label="upload" component="label">
          <input hidden accept="image/*" type="file" />
          <FileUploadRoundedIcon />
        </IconButton>
        <IconButton aria-label="mode">
          <ClearAllRoundedIcon />
        </IconButton>
      </Stack>
    </div>
  );
};
