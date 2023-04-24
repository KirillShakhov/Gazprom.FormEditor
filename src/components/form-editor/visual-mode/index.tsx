import React, { useState } from 'react';
import { IForm } from '../../../interfaces/form-config';
import { IFormElement } from '../../../interfaces/form-element';
import { useKeyDown, useMouseWheelZoom } from '../../../utils/key-down';
import { useLocalStorage } from '../../../utils/local-storage';
import { FormView } from './form';
import './style.css';
import { IconButton } from '@mui/material';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ZoomOutMapRoundedIcon from '@mui/icons-material/ZoomOutMapRounded';
import ZoomInMapRoundedIcon from '@mui/icons-material/ZoomInMapRounded';
import Grid3x3RoundedIcon from '@mui/icons-material/Grid3x3Rounded';
import Grid4x4RoundedIcon from '@mui/icons-material/Grid4x4Rounded';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

interface VisualModeProps {
  form: IForm;
  selectedItem: IFormElement | undefined;
  onSelectItem: (value: IFormElement | undefined) => void;
  update: () => void;
}

export const VisualMode: React.FC<VisualModeProps> = (props) => {
  const { form, selectedItem, onSelectItem, update } = props;

  const [scrollable, setScrollable] = React.useState(true);

  const [zoom, setZoom] = useLocalStorage('zoom', 1.0);
  const [isMouseOnVisualMode, setIsMouseOnVisualMode] = useState(false);
  useMouseWheelZoom((delta) => {
    if (!isMouseOnVisualMode) return;
    if (Math.abs(delta) < 4) return;
    const newZoom = zoom + delta / 200;
    if (newZoom > 0.1 && newZoom < 5.0) {
      setZoom(newZoom);
    }
    console.log('zoom ' + zoom);
    update();
  });

  // useEffect(() => {
  //   update();
  // }, [update, zoom]);

  useKeyDown(() => {
    console.log('Escape');
  }, ['Escape', 'Control']);

  const [draggable, setDraggable] = React.useState(false);
  const [formWidth, setFormWidth] = React.useState(800);

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      onMouseEnter={() => {
        setIsMouseOnVisualMode(true);
      }}
      onMouseLeave={() => {
        setIsMouseOnVisualMode(false);
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {scrollable && (
        <TransformWrapper
          panning={{ disabled: draggable }}
          limitToBounds={false}
          wheel={{ wheelDisabled: true }}
          doubleClick={{ disabled: true }}
          zoomAnimation={{ disabled: true }}
        >
          <TransformComponent>
            <div style={{ width: formWidth }}>
              <FormView
                zoom={zoom}
                scrollable={scrollable}
                form={form}
                onSelectItem={onSelectItem}
                update={update}
                selectedItem={selectedItem}
                setDraggable={setDraggable}
              />
            </div>
          </TransformComponent>
        </TransformWrapper>
      )}
      {!scrollable && (
        <FormView
          zoom={zoom}
          scrollable={scrollable}
          form={form}
          onSelectItem={onSelectItem}
          update={update}
          selectedItem={selectedItem}
          setDraggable={setDraggable}
        />
      )}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          background: '#fafafa',
          borderRadius: 5,
          marginLeft: 10,
          marginBottom: 5,
          zIndex: 1000,
        }}
        className={'zoomControl'}
      >
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
    </div>
  );
};
