import { Shadows, Box, Tab, Tabs, createTheme, ThemeProvider, Button } from '@mui/material';
import React, { useState } from 'react';
import { CommandLine } from './command-line';
import { VisualMode } from './visual-mode';
import { TextMode } from './text-mode/text-mode';
import { ComponentSettings } from './component-settings';
import { generateStandardForm } from '../../utils/form-generator';
import { checkImplementForm, checkImplementParameters } from '../../utils/check-objects';
import { form as standardForm, parameters as standardParameters } from '../../interfaces/example';
import { IPropertyMetadata, metadata } from '../../interfaces/property-metadata';
import { IParameter } from '../../interfaces/parameter';
import { IForm } from '../../interfaces/form-config';
import { ParametersTab } from './parameters-tab';
import { TreeViewForm } from './tree-view-form';
import { ComponentsTab } from './components-tab';
import { IFormElement } from '../../interfaces/form-element';
import { findAndDeleteFromForm } from '../../utils/find-and-delete-from-form';
import { DropZone } from './drop-zone';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import { useLocalStorage } from '../../utils/local-storage';

enum Modes {
  Visual,
  Text,
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#5775F4',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#E2E5EC',
      contrastText: '#525562',
    },
  },
  shadows: Array(25).fill('none') as Shadows,
});

// const theme2 = createTheme({
//   palette: {
//     primary: {
//       main: '#f45757',
//       contrastText: '#ffffff',
//     },
//     secondary: {
//       main: '#E2E5EC',
//       contrastText: '#525562',
//     },
//   },
//   shadows: Array(25).fill('none') as Shadows,
// });

/** Редактор форм. */
export const FormEditor: React.FC = () => {
  const [sizes, setSizes] = useLocalStorage<number[] | string[]>('sizes', ['20%', '50%', '25%']);
  const [parameters, setParameters] = useState<IParameter[]>(standardParameters);
  const [data, setData] = useLocalStorage<IForm>('form', standardForm);
  const [config] = useState<IPropertyMetadata>(metadata);
  const [selectedItem, setSelectedItem] = useState<IFormElement>();
  const [tabIndex, setTabIndex] = React.useState(1);
  const [mode, setMode] = useState(Modes.Visual);

  const changeMode = () => {
    if (mode === Modes.Text) {
      setMode(Modes.Visual);
    } else {
      setMode(Modes.Text);
    }
  };

  const loadProperties = (data: string) => {
    try {
      const params: IParameter[] = JSON.parse(data);
      if (checkImplementParameters(params)) {
        setParameters(params);
        setData(generateStandardForm(params));
        return;
      }
      const form: IForm = JSON.parse(data);
      if (checkImplementForm(form)) {
        setData(form);
        return;
      }
    } catch (e) {
      alert('Неверный формат');
    }
  };

  const newBlankJson = () => {
    setData(generateStandardForm(parameters));
    setSelectedItem(undefined);
  };

  const updateAll = () => {
    console.log('updateAll');
    setData({ ...data });
  };

  const deleteObject = () => {
    if (selectedItem) {
      setSelectedItem(undefined);
      findAndDeleteFromForm(data, selectedItem);
      updateAll();
    }
  };

  const [test, setTest] = useState(false);
  const testClick = () => {
    setTest(!test);
  };

  const tabStyle = {
    fontSize: 12,
    minHeight: 30,
    minWidth: 20,
    padding: 10,
    height: 30,
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: '5%', borderBottom: '1px solid', borderColor: '#dadada' }}>
        <CommandLine
          newData={newBlankJson}
          loadData={loadProperties}
          saveData={() => {
            return JSON.stringify(data);
          }}
          changeMode={changeMode}
        >
          Редактор форм
        </CommandLine>
      </div>
      <div style={{ height: '100%' }}>
        <SplitPane
          performanceMode={false}
          split={test ? 'horizontal' : 'vertical'}
          sizes={sizes}
          onChange={setSizes}
          style={{ height: '100%', width: '100%' }}
          // sashRender={(index, active) => {
          //   console.log(`index ${index} active ${active}`);
          //   // return <SashContent active={active} type="vscode" />;
          // }}
        >
          <Pane minSize="15%" maxSize="30%">
            <div style={{ height: '95%', borderRight: '1px solid', borderColor: '#dadada' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={tabIndex}
                  onChange={(event: React.SyntheticEvent, newValue: number) => {
                    setTabIndex(newValue);
                  }}
                  textColor="inherit"
                  style={{
                    minHeight: 0,
                  }}
                >
                  <Tab label="Параметры" style={tabStyle} />
                  <Tab label="Форма" style={tabStyle} />
                  <Tab label="Компоненты" style={tabStyle} />
                </Tabs>
              </Box>
              <div style={{ width: '100%', height: '84%' }}>
                {tabIndex === 0 && <ParametersTab form={data} properties={parameters} />}
                {tabIndex === 1 && <TreeViewForm form={data} onSelectItem={setSelectedItem} update={updateAll} />}
                {tabIndex === 2 && (
                  <ComponentsTab form={data} parameters={parameters} selectedItem={selectedItem} update={updateAll} />
                )}
              </div>
              <div style={{ width: '100%', height: '8%' }}>
                <DropZone />
                <Button onClick={testClick} style={{ height: '100px', width: '100px', background: '#36c5d2' }}>
                  Тест
                </Button>
              </div>
            </div>
          </Pane>
          <div style={{ background: '#d5d7d9', height: '100%' }}>
            {mode == Modes.Visual && (
              <VisualMode form={data} selectedItem={selectedItem} onSelectItem={setSelectedItem} update={updateAll} />
            )}
            {mode == Modes.Text && (
              <TextMode
                value={data}
                onChange={(newData) => {
                  if (JSON.stringify(data) !== JSON.stringify(newData)) setData(newData);
                  setSelectedItem(undefined);
                }}
              />
            )}
          </div>
          <Pane minSize="15%" maxSize="70%">
            <div style={{ background: '#a1a5a9', height: '95%', borderLeft: '1px solid', borderColor: '#dadada' }}>
              <ComponentSettings
                form={data}
                value={selectedItem}
                properties={parameters}
                config={config}
                update={updateAll}
                deleteObject={deleteObject}
              />
            </div>
          </Pane>
        </SplitPane>
      </div>
    </ThemeProvider>
  );
};

FormEditor.displayName = 'FormEditor';
