import React, { useState } from 'react';
import { IForm } from '../../../interfaces/form-config';
import { IFormElement } from '../../../interfaces/form-element';
import { useKeyDown, useMouseWheelZoom } from '../../../utils/key-down';
import { useLocalStorage } from '../../../utils/local-storage';
import { FormView } from './form';
import './style.css';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { ViewControlPanel } from './view-control-panel';

interface VisualModeProps {
  form: IForm;
  hideLeftPanel: boolean;
  hideRightPanel: boolean;
  setHideLeftPanel: (value: boolean) => void;
  setHideRightPanel: (value: boolean) => void;
  selectedItem: IFormElement | undefined;
  onSelectItem: (value: IFormElement | undefined) => void;
  update: () => void;
}

export const VisualMode: React.FC<VisualModeProps> = (props) => {
  const {
    form,
    selectedItem,
    onSelectItem,
    update,
    hideLeftPanel,
    hideRightPanel,
    setHideLeftPanel,
    setHideRightPanel,
  } = props;

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

  const [readOnly, setReadOnly] = React.useState(true);
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
                readOnly={readOnly}
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
          readOnly={readOnly}
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
        <ViewControlPanel
          zoom={zoom}
          hideLeftPanel={hideLeftPanel}
          setHideLeftPanel={setHideLeftPanel}
          hideRightPanel={hideLeftPanel}
          setHideRightPanel={setHideRightPanel}
          setZoom={setZoom}
          scrollable={scrollable}
          setScrollable={setScrollable}
          readOnly={readOnly}
          setReadOnly={setReadOnly}
          formWidth={formWidth}
          setFormWidth={setFormWidth}
        />
      </div>
    </div>
  );
};
