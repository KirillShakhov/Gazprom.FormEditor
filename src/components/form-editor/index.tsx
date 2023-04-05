import { Shadows, Box, Tab, Tabs, createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import { CommandLine } from './command-line';
import { VisualMode } from './visual-mode';
import { TextMode } from './text-mode/text-mode';
import { ComponentSettings } from './component-settings';
import { generateStandardForm } from '../../utils/generate-form';
import { checkImplementForm, checkImplementParameters } from '../../utils/check-objects';
import { form, parameters } from '../../interfaces/example';
import { IFormControl } from '../../interfaces/form-control';
import { IPropertyMetadata, metadata } from '../../interfaces/property-metadata';
import { IParameter } from '../../interfaces/parameter';
import { IForm } from '../../interfaces/form-config';
import { ParametersTab } from './parameters-tab';
import { TreeViewForm } from './tree-view-form';
import { ComponentsTab } from './components-tab';
import './style.css';

enum Modes {
  Visual,
  Text,
}

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#5775F4',
//       contrastText: '#ffffff',
//     },
//     secondary: {
//       main: '#E2E5EC',
//       contrastText: '#525562',
//     },
//   },
//   shadows: Array(25).fill('none') as Shadows,
// });
const theme = createTheme({
  palette: {
    primary: {
      main: '#f45757',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#E2E5EC',
      contrastText: '#525562',
    },
  },
  shadows: Array(25).fill('none') as Shadows,
});

/** Редактор форм. */
export const FormEditor: React.FC = () => {
  const [mode, setMode] = React.useState(Modes.Visual);
  const [properties, setProperties] = React.useState<IParameter[]>(parameters);
  const [data, setData] = React.useState<IForm>(form);
  const [config] = React.useState<IPropertyMetadata>(metadata);
  const [selectedItem, setSelectedItem] = React.useState<IFormControl>();
  const [tabIndex, setTabIndex] = React.useState(0);

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
        setProperties(params);
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
    setData(generateStandardForm(properties));
    setSelectedItem(undefined);
  };

  const onSelectItem = (value: IFormControl) => {
    console.log(`IFormControl ${JSON.stringify(value)}`);
    setSelectedItem(value);
  };

  const updateAll = () => {
    console.log('updateAll');
    setData({ ...data });
    if (selectedItem !== undefined) setSelectedItem({ ...selectedItem });
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
            <ParametersTab properties={properties} />
          </div>
          <div hidden={tabIndex !== 1}>
            <TreeViewForm form={form} onSelectItem={onSelectItem} />
          </div>
          <div hidden={tabIndex !== 2}>
            <ComponentsTab form={form} update={updateAll} />
          </div>
        </div>
        <main>
          <div hidden={mode != Modes.Visual} style={{ height: '100%' }}>
            <VisualMode form={data} onSelectItem={onSelectItem} update={updateAll} />
          </div>
          <div hidden={mode != Modes.Text} style={{ height: '100%' }}>
            <TextMode
              value={JSON.stringify(data)}
              onChange={(data) => {
                console.log('text ' + data);
                setData({ ...JSON.parse(data) });
                setSelectedItem(undefined);
              }}
              update={updateAll}
            />
          </div>
        </main>
        <div className="right-side">
          <ComponentSettings value={selectedItem} properties={properties} config={config} update={updateAll} />
        </div>
      </div>
    </ThemeProvider>
  );
};

FormEditor.displayName = 'FormEditor';
