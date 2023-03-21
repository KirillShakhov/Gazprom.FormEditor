import React from 'react';
import { IconButton, Stack, Tooltip } from '@mui/material';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import ClearAllRoundedIcon from '@mui/icons-material/ClearAllRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import './style.css';

interface CommandLineProps {
  newData: () => void;
  saveData: () => string;
  loadData: (value: string) => void;
  changeMode: () => void;
}

/** Командная панель */
export const CommandLine: React.FC<CommandLineProps> = (props) => {
  const inputRef = React.createRef<HTMLInputElement>();

  function createTxtFile() {
    // const text = '{}';
    // props.loadData(text);
    props.newData();
  }

  function downloadTxtFile() {
    const text = props.saveData();
    // file object
    const file = new Blob([text], { type: 'application/json' });
    // anchor link
    const element = document.createElement('a');
    element.href = URL.createObjectURL(file);
    element.download = 'form-' + Date.now() + '.json';
    // simulate link click
    document.body.appendChild(element);
    // Required for this to work in FireFox
    element.click();
  }

  function clearInput(event: any) {
    console.log(JSON.stringify(event.child));
    event.children.target.files = null;
  }

  const readFile = async (event: any) => {
    const file = event.target.files[0];
    const text = await file.text();
    event.target.files = null;
    props.loadData(text);
  };

  return (
    <div className="main">
      <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0}>
        <Tooltip title="Создать">
          <IconButton aria-label="create" component="label" onClick={createTxtFile}>
            <AddBoxRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Экспорт">
          <IconButton aria-label="download" component="label" onClick={downloadTxtFile}>
            <DownloadRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Импорт">
          <IconButton aria-label="upload" component="label" onClick={clearInput}>
            <input ref={inputRef} hidden accept="application/json,.txt" type="file" onChange={readFile} />
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
