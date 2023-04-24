import React, { useCallback } from 'react';
import { useTheme } from '@mui/material';
import { Page } from '../page';
import { IForm, ITabPageController } from '../../../../interfaces/form-config';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { Experimental } from '../../../../utils/experimental';
import '../style.css';
import { IFormElement } from '../../../../interfaces/form-element';
import { isFormPage } from '../../../../utils/form-config';

interface PageGroupProps {
  zoom: number;
  readOnly: boolean;
  form: IForm;
  value: ITabPageController;
  selectedItem: IFormElement | undefined;
  onSelectItem: (value: IFormElement | undefined) => void;
  update: () => void;
}

export const PageGroup: React.FC<PageGroupProps> = (props) => {
  const { zoom, readOnly, form, value, selectedItem, onSelectItem, update } = props;
  const [tabCode, setTabCode] = React.useState('');
  const getTabIndex = useCallback(() => {
    if (value.pages == undefined) return 0;
    let index = 0;
    value.pages.forEach((p, i) => {
      if (p.code == tabCode) {
        index = i;
      }
    });
    return index;
  }, [tabCode, value.pages]);

  const theme = useTheme();

  const handleChange = (newValue: string) => {
    setTabCode(newValue);
    if (selectedItem == value.pages[getTabIndex()]) {
      onSelectItem(undefined);
      return;
    }
    onSelectItem(value.pages[getTabIndex()]);
  };

  const calculateWidth = useCallback(() => {
    let width = 150;
    if (value.pages !== undefined) {
      let count = 0;
      value.pages.forEach((page) => {
        count += page.name.length;
      });
      width += 25 + count * 10;
    }
    return width;
  }, [value.pages]);

  const onMouseEnter = (e: any, code: string) => {
    if (!Experimental.GROUP_DRAG_AND_DROP) return;
    if (e.nativeEvent.which) {
      const ghost = document.getElementsByClassName('smooth-dnd-ghost');
      const item = ghost.item(0)?.className;
      if (item === undefined) return;
      if (item.includes('page-ghost')) return;
      setTabCode(code);
    }
  };

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex, payload } = dropResult;
    if (removedIndex == null && addedIndex == null) return;
    if (payload != null) {
      if (value.pages == undefined) value.pages = [];
      const page = { ...payload };
      if (isFormPage(page)) {
        if (removedIndex != null) {
          value.pages?.splice(removedIndex, 1);
        }
        if (addedIndex != null) {
          value.pages?.splice(addedIndex, 0, page);
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

  return (
    <div
      style={{
        background: theme.palette.background.default,
        border: 1,
        borderRadius: 10,
        borderColor: selectedItem == value ? '#3373d9' : '#e0e0e0',
        borderStyle: 'dotted',
        marginTop: 10 * zoom,
      }}
    >
      <div
        style={{
          padding: 10 * zoom > 10 ? 10 : 10 * zoom,
        }}
      >
        <span style={{ fontSize: 18 * zoom, margin: 0 }} key={value.code} role={'presentation'} onClick={handleClick}>
          {value.name}
        </span>
        <div style={{ marginTop: 10 * zoom, height: '90%' }}>
          <div style={{ width: '100%', overflowY: 'hidden', paddingBottom: zoom }} className={'no-scroll'}>
            <Container
              getChildPayload={(i) => value.pages[i]}
              groupName={'pages'}
              orientation={'horizontal'}
              onDrop={onDrop}
              style={{
                width: calculateWidth() * zoom,
                display: 'flex',
                minHeight: 0,
              }}
              dropPlaceholder={{
                className: 'dropPlaceholderPage',
                animationDuration: 250,
                showOnTop: true,
              }}
              getGhostParent={() => document.body}
            >
              {value.pages.map((item, index) => {
                return (
                  <Draggable key={item.code + item.name + index} className={'page-ghost'}>
                    <div>
                      <div
                        style={{
                          padding: 5 * zoom,
                          paddingLeft: 10 * zoom,
                          paddingRight: 10 * zoom,
                          background: '#ffffff',
                          border: 1,
                          borderRadius: 6,
                          borderColor: selectedItem == item ? '#3373d9' : '#e0e0e0',
                          borderStyle: 'dotted',
                        }}
                        role={'presentation'}
                        onMouseEnter={(e) => {
                          onMouseEnter(e, item.code);
                        }}
                        onClick={() => {
                          handleChange(item.code);
                        }}
                      >
                        <div
                          style={{
                            fontSize: 16 * zoom,
                            whiteSpace: 'nowrap',
                            color: theme.palette.text.primary,
                          }}
                        >
                          {item.name}
                        </div>
                      </div>
                      {getTabIndex() == index && (
                        <div
                          style={{
                            height: 2 * zoom,
                            marginTop: -4 * zoom,
                            marginLeft: 10 * zoom,
                            marginRight: 15 * zoom,
                            borderRadius: 10 * zoom,
                            background: theme.palette.primary.main,
                          }}
                        />
                      )}
                    </div>
                  </Draggable>
                );
              })}
            </Container>
          </div>
          {value.pages.map((item, index) => {
            return (
              index == getTabIndex() && (
                <Page
                  form={form}
                  key={index}
                  value={item}
                  selectedItem={selectedItem}
                  onSelectItem={onSelectItem}
                  update={update}
                  zoom={zoom}
                />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};
