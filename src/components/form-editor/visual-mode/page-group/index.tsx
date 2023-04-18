import React from 'react';
import { useTheme } from '@mui/material';
import { Page } from '../page';
import { IForm, ITabPageController } from '../../../../interfaces/form-config';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { Experimental } from '../../../../utils/experimental';
import '../style.css';
import { checkImplementFormElement } from '../../../../utils/check-objects';
import { IFormElement } from '../../../../interfaces/form-element';

interface PageGroupProps {
  form: IForm;
  value: ITabPageController;
  selectedItem: IFormElement | undefined;
  onSelectItem: (value: IFormElement | undefined) => void;
  update: () => void;
}

export const PageGroup: React.FC<PageGroupProps> = (props) => {
  const { form, value, selectedItem, onSelectItem, update } = props;
  const [tabIndex, setTabIndex] = React.useState(0);
  const theme = useTheme();

  const handleChange = (newValue: number) => {
    setTabIndex(newValue);
    if (selectedItem == value.pages[newValue]) {
      onSelectItem(undefined);
      return;
    }
    onSelectItem(value.pages[newValue]);
  };

  const onMouseEnter = (e: any, id: number) => {
    if (!Experimental.GROUP_DRAG_AND_DROP) return;
    if (e.nativeEvent.which) {
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
    if (selectedItem == value) {
      onSelectItem(undefined);
      return;
    }
    onSelectItem(value);
  };

  // function onDropReady(dropResult: any) {
  //   const { removedIndex, addedIndex, payload } = dropResult;
  //   const element: HTMLDivElement = dropResult.element;
  //   if (payload.hasOwnProperty('isNew')) {
  //     console.log('removedIndex ' + removedIndex);
  //     console.log('addedIndex ' + addedIndex);
  //     console.log('payload ' + JSON.stringify(payload));
  //     console.log('element ' + element.clientWidth);
  //     // const ghost = document.getElementsByClassName('smooth-dnd-ghost');
  //     const ghost = document.getElementsByClassName('dropPlaceholderPage');
  //     const el = document.createElement('div');
  //     el.className = 'page-blob';
  //     const g = ghost.item(0);
  //     g?.replaceWith(el);
  //   }
  // }

  return (
    <div
      style={{
        background: theme.palette.background.default,
        border: 1,
        borderRadius: 10,
        borderColor: selectedItem == value ? '#3373d9' : '#e0e0e0',
        borderStyle: 'dotted',
        marginTop: 10,
      }}
    >
      <div
        style={{
          padding: 10,
        }}
      >
        <span style={{ fontSize: 18, margin: 0 }} key={value.code} role={'presentation'} onClick={handleClick}>
          {value.name}
        </span>
        <div style={{ marginTop: 10, height: '90%' }}>
          <Container
            getChildPayload={(i) => value.pages[i]}
            groupName={'pages'}
            orientation={'horizontal'}
            onDrop={onDrop}
            style={{
              display: 'flex',
              overflowY: 'hidden',
            }}
            dropPlaceholder={{
              className: 'dropPlaceholderPage',
              animationDuration: 250,
              showOnTop: true,
            }}
          >
            {value.pages.map((item, index) => {
              return (
                <Draggable key={index}>
                  <div>
                    <div
                      style={{
                        padding: 5,
                        paddingLeft: 10,
                        paddingRight: 10,
                        background: '#ffffff',
                        border: 1,
                        borderRadius: 6,
                        borderColor: selectedItem == item ? '#3373d9' : '#e0e0e0',
                        borderStyle: 'dotted',
                        // marginRight: 5,
                      }}
                      role={'presentation'}
                      onMouseEnter={(e) => {
                        onMouseEnter(e, index);
                      }}
                      onClick={() => {
                        handleChange(index);
                      }}
                    >
                      <div
                        style={{
                          fontSize: 16,
                          whiteSpace: 'nowrap',
                          color: theme.palette.text.primary,
                        }}
                      >
                        {item.name}
                      </div>
                    </div>
                    {tabIndex == index && (
                      <div
                        style={{
                          height: 2,
                          marginTop: -4,
                          marginLeft: 10,
                          marginRight: 15,
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
          {value.pages.map((item, index) => {
            return (
              index == tabIndex && (
                <Page
                  form={form}
                  key={index}
                  value={item}
                  selectedItem={selectedItem}
                  onSelectItem={onSelectItem}
                  update={update}
                />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};
