import React, { useState } from 'react';
import './style.css';
import { Box, Button, ButtonProps, Tab, Tabs } from '@mui/material';
import { ParametersTab } from '../left-menu/parameters-tab';
import { FormTab } from '../left-menu/form-tab';
import { ComponentsTab } from '../left-menu/components-tab';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

interface VisualModeProps {
  value: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style={{
          height: '98%',
        }}
        {...other}
      >
        {children}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const tabStyle = {
    minWidth: 20,
    minHeight: 30,
    height: 30,
    padding: 10,
    fontSize: 14,
  };

  return (
    <div className="visual-mode">
      <div className="box">
        <span style={{ fontSize: 18, margin: 0 }}>Заголовок операции</span>
        <div style={{ marginTop: 20, height: '90%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              style={{
                minHeight: 0,
              }}
            >
              <Tab label="Шаг 1" {...a11yProps(0)} style={tabStyle} />
              <Tab label="Шаг 2" {...a11yProps(1)} style={tabStyle} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span style={{ fontSize: 16, margin: 0, marginTop: 10 }}>Заголовок группы 1</span>
                <span style={{ marginTop: 10 }}>Страница 1</span>
              </div>

              <div style={{ display: 'flex', gap: 20 }}>
                <Button variant="contained">Ок</Button>
                <CancelButton>Отменить</CancelButton>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <span style={{ marginTop: 10 }}>Страница 2</span>
          </TabPanel>
        </div>
      </div>
    </div>
  );
};
