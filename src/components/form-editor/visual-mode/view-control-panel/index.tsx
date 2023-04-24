import React from 'react';
import { IconButton } from '@mui/material';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ZoomInMapRoundedIcon from '@mui/icons-material/ZoomInMapRounded';
import ZoomOutMapRoundedIcon from '@mui/icons-material/ZoomOutMapRounded';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import Grid3x3RoundedIcon from '@mui/icons-material/Grid3x3Rounded';
import Grid4x4RoundedIcon from '@mui/icons-material/Grid4x4Rounded';

interface ViewControlPanelProps {
  zoom: number;
  setZoom: (value: number) => void;
  scrollable: boolean;
  setScrollable: (value: boolean) => void;
  readOnly: boolean;
  setReadOnly: (value: boolean) => void;
  formWidth: number;
  setFormWidth: (value: number) => void;
}

export const ViewControlPanel: React.FC<ViewControlPanelProps> = (props) => {
  const { scrollable, setScrollable, zoom, setZoom, readOnly, setReadOnly, formWidth, setFormWidth } = props;

  return (
    <div>
      <IconButton
        style={{ height: 30, width: 30 }}
        onClick={() => {
          const newZoom = zoom - 0.1;
          if (newZoom > 0.1 && newZoom < 5.0) {
            setZoom(newZoom);
          }
        }}
      >
        <RemoveRoundedIcon />
      </IconButton>
      <IconButton
        style={{ height: 30, width: 30 }}
        onClick={() => {
          const newZoom = zoom + 0.1;
          if (newZoom > 0.1 && newZoom < 5.0) {
            setZoom(newZoom);
          }
        }}
      >
        <AddRoundedIcon />
      </IconButton>
      <IconButton
        style={{ height: 30, width: 30 }}
        onClick={() => {
          setScrollable(!scrollable);
        }}
      >
        {scrollable && <ZoomInMapRoundedIcon />}
        {!scrollable && <ZoomOutMapRoundedIcon />}
      </IconButton>

      <IconButton
        style={{ height: 30, width: 30 }}
        onClick={() => {
          setReadOnly(!readOnly);
        }}
      >
        {!readOnly && <LockOpenRoundedIcon />}
        {readOnly && <LockRoundedIcon />}
      </IconButton>

      {scrollable && (
        <IconButton
          style={{ height: 30, width: 30 }}
          onClick={() => {
            setFormWidth(formWidth - 50);
          }}
        >
          <Grid3x3RoundedIcon />
        </IconButton>
      )}
      {scrollable && (
        <IconButton
          style={{ height: 30, width: 30 }}
          onClick={() => {
            setFormWidth(formWidth + 50);
          }}
        >
          <Grid4x4RoundedIcon />
        </IconButton>
      )}
    </div>
  );
};
