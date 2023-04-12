import { Shadows, Box, Tab, Tabs, createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
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
import './style.css';
import { IFormElement } from '../../interfaces/form-element';

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
// const theme = createTheme({
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
  const [mode, setMode] = React.useState(Modes.Text);
  const [parameters, setParameters] = React.useState<IParameter[]>(standardParameters);
  const [data, setData] = React.useState<IForm>(standardForm);
  const [config] = React.useState<IPropertyMetadata>(metadata);
  const [selectedItem, setSelectedItem] = React.useState<IFormElement>();
  const [tabIndex, setTabIndex] = React.useState(1);

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

  const onSelectItem = (value: IFormElement) => {
    console.log(`IFormControl ${JSON.stringify(value)}`);
    setSelectedItem(value);
  };

  const updateAll = () => {
    console.log('updateAll');
    setData({ ...data });
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
      <div className="layout">
        <header>
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
        </header>
        <div className="left-side">
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

          <div hidden={tabIndex !== 0}>
            <ParametersTab properties={parameters} />
          </div>
          <div hidden={tabIndex !== 1}>
            <TreeViewForm form={data} onSelectItem={onSelectItem} update={updateAll} />
          </div>
          <div hidden={tabIndex !== 2}>
            <ComponentsTab form={data} parameters={parameters} />
          </div>
        </div>
        <main>
          {mode == Modes.Visual && (
            <div style={{ height: '100%' }}>
              <VisualMode form={data} onSelectItem={onSelectItem} update={updateAll} />
            </div>
          )}
          {mode == Modes.Text && (
            <div style={{ height: '100%' }}>
              <TextMode
                value={data}
                onChange={(data) => {
                  setData({ ...JSON.parse(data) });
                  setSelectedItem(undefined);
                }}
              />
            </div>
          )}
        </main>
        <div className="right-side">
          <ComponentSettings value={selectedItem} properties={parameters} config={config} update={updateAll} />
        </div>
      </div>
    </ThemeProvider>
  );
};

FormEditor.displayName = 'FormEditor';
