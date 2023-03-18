import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { TabPanel } from '@mui/lab';
import { Page } from '../page';
import {ITabPageController} from '../../../../interfaces/form-config';

interface PageGroupProps {
  value: ITabPageController;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const PageGroup: React.FC<PageGroupProps> = (props) => {
  const { value } = props;
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
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
    // <div
    //   role="tabpanel"
    //   hidden={value !== index}
    //   id={`simple-tabpanel-${index}`}
    //   aria-labelledby={`simple-tab-${index}`}
    //   style={{
    //     height: '100%',
    //   }}
    //   {...other}
    // >
    //   {children}
    // </div>

    <div>
      <span style={{ fontSize: 18, margin: 0 }}>{value.name}</span>
      <div style={{ marginTop: 20, height: '90%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            textColor="inherit"
            style={{
              minHeight: 0,
            }}
          >
            {value.pages.map((item, index) => {
              return <Tab label={item.name} {...a11yProps(index)} key={item.code} style={tabStyle} />;
            })}
          </Tabs>
        </Box>
        {value.pages.map((item, index) => {
          return (
            <TabPanel value={tabIndex} index={index}>
              <Page value={item}></Page>
            </TabPanel>
          );
        })}
      </div>
    </div>
  );
};
