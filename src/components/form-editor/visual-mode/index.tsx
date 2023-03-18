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

export const VisualMode: React.FC<VisualModeProps> = (props) => {
  return (
    <div className="visual-mode">
      <div className="box">
        <div style={{ overflowY: 'auto', height: 640 }}>
          <PageGroup></PageGroup>
          <PageGroup></PageGroup>
          <PageGroup></PageGroup>
          <PageGroup></PageGroup>
          <PageGroup></PageGroup>
          <PageGroup></PageGroup>
          <PageGroup></PageGroup>
          <PageGroup></PageGroup>
          <PageGroup></PageGroup>
        </div>
        <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
          <Button variant="contained">Ок</Button>
          <Button color="secondary" variant="contained">
            Отменить
          </Button>
        </div>
      </div>
    </div>
  );
};
