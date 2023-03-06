import React, { useRef, useState } from 'react';
import { IconButton, Stack, Tooltip } from '@mui/material';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import ClearAllRoundedIcon from '@mui/icons-material/ClearAllRounded';
import './command-line.css';

interface CommandLineProps {
  getData: () => string;
  setData: (value: string) => void;
  changeMode: () => void;
}

/** Командная панель */
export const CommandLine: React.FC<CommandLineProps> = (props) => {
  function downloadTxtFile() {
    const text = props.getData();
    // file object
    const file = new Blob([text], { type: 'application/json' });
    // anchor link
    const element = document.createElement('a');
    element.href = URL.createObjectURL(file);
    element.download = 'form-' + Date.now() + '.txt';
    // simulate link click
    document.body.appendChild(element);
    // Required for this to work in FireFox
    element.click();
  }

  const readFile = async (event: any) => {
    const file = event.target.files[0];
    const text = await file.text();
    props.setData(text);
  };

  return (
    <div className="main">
      <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0}>
        <Tooltip title="Экспорт">
          <IconButton aria-label="download" component="label" onClick={downloadTxtFile}>
            <DownloadRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Импорт">
          <IconButton aria-label="upload" component="label">
            <input hidden accept="text/*" type="file" onChange={readFile} />
            <FileUploadRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Режим">
          <IconButton aria-label="mode" onClick={props.changeMode}>
            <ClearAllRoundedIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </div>
  );
};
