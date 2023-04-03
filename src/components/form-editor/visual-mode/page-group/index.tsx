import React, { EventHandler, MouseEventHandler, SyntheticEvent } from 'react';
import { Box, Tab, useTheme } from '@mui/material';
import { Page } from '../page';
import { ITabPageController } from '../../../../interfaces/form-config';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { IFormControl } from '../../../../interfaces/form-control';

interface PageGroupProps {
  value: ITabPageController;
  onSelectItem: (value: IFormControl) => void;
  update: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const PageGroup: React.FC<PageGroupProps> = (props) => {
  const { value, onSelectItem, update } = props;
  const [tabIndex, setTabIndex] = React.useState(0);
  const theme = useTheme();

  const handleChange = (newValue: number) => {
    setTabIndex(newValue);
  };

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        style={{
          height: '98%',
        }}
        {...other}
      >
        {children}
      </div>
    );
  }

  const tabStyle = {
    minWidth: 20,
    minHeight: 30,
    height: 30,
    padding: 10,
    fontSize: 14,
  };

  const onMouseEnter = (e: any, id: number) => {
    if (e.nativeEvent.which) {
      // console.log('e.target.key ' + id);
      setTabIndex(id);
    }
  };

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex, element, payload } = dropResult;
    if (removedIndex == null && addedIndex == null) return;
    console.log('removedIndex ' + removedIndex);
    console.log('addedIndex ' + addedIndex);
    console.log('element ' + element);
    console.log('payload ' + JSON.stringify(payload));
    if (dropResult.payload == null) {
      if (value.pages === undefined) return;
      if (removedIndex != null) {
        const page = { ...value.pages[removedIndex] };
        value.pages?.splice(removedIndex, 1);
        if (addedIndex != null) {
          console.log('add: ' + JSON.stringify(page));
          value.pages?.splice(addedIndex, 0, page);
          if (removedIndex == tabIndex) {
            setTabIndex(addedIndex);
          } else if (addedIndex == tabIndex) {
            setTabIndex(removedIndex);
          }
          update();
        }
      }
    }
  };

  return (
    <div>
      <span style={{ fontSize: 18, margin: 0 }}>{value.name}</span>
      <div style={{ marginTop: 20, height: '90%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Container
            groupName={'pages'}
            orientation={'horizontal'}
            style={{
              display: 'flex',
            }}
            onDrop={onDrop}
          >
            {value.pages.map((item, index) => {
              return (
                <Draggable key={index}>
                  <div
                    onMouseEnter={(e) => {
                      onMouseEnter(e, index);
                    }}
                  >
                    <Tab
                      key={index}
                      label={item.name}
                      style={tabStyle}
                      onClick={() => {
                        handleChange(index);
                      }}
                    />
                    {tabIndex == index && (
                      <div
                        style={{
                          height: 2,
                          background: theme.palette.primary.main,
                        }}
                      />
                    )}
                  </div>
                </Draggable>
              );
            })}
          </Container>
        </Box>
        {value.pages.map((item, index) => {
          return (
            <TabPanel value={tabIndex} index={index} key={index}>
              <Page value={item} onSelectItem={onSelectItem} update={update}></Page>
            </TabPanel>
          );
        })}
      </div>
    </div>
  );
};
