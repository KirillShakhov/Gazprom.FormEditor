import React from 'react';
import { Box, Tab, useTheme } from '@mui/material';
import { Page } from '../page';
import { ITabPageController } from '../../../../interfaces/form-config';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { IFormControl } from '../../../../interfaces/form-control';
import { Experimental } from '../../../../utils/experimental';
import '../style.css';

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
    borderRadius: 6,
  };

  const onMouseEnter = (e: any, id: number) => {
    if (!Experimental.GROUP_DRAG_AND_DROP) return;
    if (e.nativeEvent.which) {
      // console.log('e.target.key ' + id);
      setTabIndex(id);
    }
  };

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex, element, payload } = dropResult;
    if (removedIndex == null && addedIndex == null) return;
    if (dropResult.payload == null) {
      if (value.pages === undefined) return;
      if (removedIndex != null) {
        const page = { ...value.pages[removedIndex] };
        value.pages?.splice(removedIndex, 1);
        if (addedIndex != null) {
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
            dropPlaceholder={{
              className: 'dropPlaceholderPage',
              animationDuration: 250,
              showOnTop: true,
            }}
          >
            {value.pages.map((item, index) => {
              return (
                <Draggable key={index}>
                  <div
                    style={{
                      background: '#ffffff',
                      borderRadius: 6,
                    }}
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
                          marginTop: -2,
                          marginLeft: 5,
                          marginRight: 5,
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
          return <Page key={index} value={item} onSelectItem={onSelectItem} update={update} />;
          return <div key={index}>{item.name}</div>;
        })}
      </div>
    </div>
  );
};
