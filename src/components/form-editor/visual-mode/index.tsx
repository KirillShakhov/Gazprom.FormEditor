import React, { useState } from 'react';
import './style.css';
import { Box, Button, ButtonProps, Tab, Tabs } from '@mui/material';
import { ParametersTab } from '../left-menu/parameters-tab';
import { FormTab } from '../left-menu/form-tab';
import { ComponentsTab } from '../left-menu/components-tab';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { PageGroup } from './page-group';

interface VisualModeProps {
  value: string;
}

const CancelButton = styled(Button)<ButtonProps>(({ theme }) => ({
  fontSize: 12,
  // contrastText: '#666974',
  color: theme.palette.getContrastText('#E4E5EC'),
  backgroundColor: '#E4E5EC',
  '&:hover': {
    backgroundColor: '#E4E5EC',
  },
}));

export const VisualMode: React.FC<VisualModeProps> = (props) => {
  return (
    <div className="visual-mode">
      <div
        className="box"
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '80%' }}
      >
        <PageGroup></PageGroup>
        <div style={{ display: 'flex', gap: 20 }}>
          <Button variant="contained">Ок</Button>
          <CancelButton>Отменить</CancelButton>
        </div>
      </div>
    </div>
  );
};
