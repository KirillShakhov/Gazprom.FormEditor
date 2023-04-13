import React from 'react';
import { Box, Tab, useTheme } from '@mui/material';
import { Page } from '../page';
import { ITabPageController } from '../../../../interfaces/form-config';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { Experimental } from '../../../../utils/experimental';
import '../style.css';
import { checkImplementFormElement } from '../../../../utils/check-objects';
import { IFormElement } from '../../../../interfaces/form-element';

interface PageGroupProps {
  value: ITabPageController;
  selectedItem: IFormElement | undefined;
  onSelectItem: (value: IFormElement) => void;
  update: () => void;
}

export const PageGroup: React.FC<PageGroupProps> = (props) => {
  const { value, selectedItem, onSelectItem, update } = props;
  const [tabIndex, setTabIndex] = React.useState(0);
  const theme = useTheme();

  const handleChange = (newValue: number) => {
    setTabIndex(newValue);
    onSelectItem(value.pages[newValue]);
  };

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
    const { removedIndex, addedIndex, payload } = dropResult;
    if (removedIndex == null && addedIndex == null) return;
    if (payload != null) {
      if (value.pages == undefined) value.pages = [];
      const page = { ...payload };
      if (checkImplementFormElement(page)) {
        if (removedIndex != null) {
          value.pages?.splice(removedIndex, 1);
        }
        if (addedIndex != null) {
          value.pages?.splice(addedIndex, 0, page);
        }
        if (removedIndex != null && addedIndex != null) {
          if (removedIndex == tabIndex) {
            setTabIndex(addedIndex);
          } else if (addedIndex == tabIndex) {
            setTabIndex(removedIndex);
          }
        }
        update();
      }
    }
  };

  const handleClick = () => {
    onSelectItem(value);
  };

  return (
    <div
      style={{
        background: theme.palette.background.default,
        padding: 5,
        border: 1,
        borderRadius: 10,
        borderColor: selectedItem == value ? '#3373d9' : '#e0e0e0',
        borderStyle: selectedItem == value ? 'dotted' : 'none',
      }}
    >
      <span style={{ fontSize: 18, margin: 0 }} key={value.code} role={'presentation'} onClick={handleClick}>
        {value.name}
      </span>
      <div style={{ marginTop: 20, height: '90%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Container
            getChildPayload={(i) => value.pages[i]}
            groupName={'pages'}
            orientation={'horizontal'}
            style={{
              display: 'flex',
              overflowY: 'hidden',
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
                      border: 1,
                      borderRadius: 6,
                      borderColor: selectedItem == item ? '#3373d9' : '#e0e0e0',
                      borderStyle: 'dotted',
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
                          borderRadius: 10,
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
            <div hidden={index != tabIndex} key={index}>
              <Page key={index} value={item} selectedItem={selectedItem} onSelectItem={onSelectItem} update={update} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
