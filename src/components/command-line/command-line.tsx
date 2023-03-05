import React, { useRef, useState } from 'react';
import { IconButton, Stack } from '@mui/material';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import ClearAllRoundedIcon from '@mui/icons-material/ClearAllRounded';
import './command-line.css';

/** Редактор форм. */
export const CommandLine: React.FC = () => {
  const hiddenFileInput = React.useRef(null);
  const handleChange = () => {
    // const fileUploaded = hiddenFileInput.files[0];
    // fileUploaded
    // handleFile(fileUploaded);
  };

  function downloadTxtFile() {
    const texts = ['line 1', 'line 2', 'line 3'];
    // file object
    const file = new Blob(texts, { type: 'text/plain' });
    // anchor link
    const element = document.createElement('a');
    element.href = URL.createObjectURL(file);
    element.download = 'form-' + Date.now() + '.txt';
    // simulate link click
    document.body.appendChild(element);
    // Required for this to work in FireFox
    element.click();
  }

  return (
    <div className="main">
      <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0}>
        <IconButton aria-label="download" component="label" onClick={downloadTxtFile}>
          <DownloadRoundedIcon />
        </IconButton>
        <IconButton aria-label="upload" component="label">
          <input hidden accept="image/*" type="file" ref={hiddenFileInput} onChange={handleChange} />
          <FileUploadRoundedIcon />
        </IconButton>
        <IconButton aria-label="mode">
          <ClearAllRoundedIcon />
        </IconButton>
      </Stack>
    </div>
  );
};
