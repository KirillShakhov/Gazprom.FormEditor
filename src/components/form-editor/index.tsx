import { createTheme, Shadows, ThemeProvider } from '@mui/material';
import React from 'react';
import { CommandLine } from './command-line';
import './style.css';
import { VisualMode } from './visual-mode';
import { TextMode } from './text-mode/text-mode';
import { ComponentSettings } from './component-settings';
import { LeftMenu } from './left-menu';
import { IParameter } from '../../interfaces/parameter';
import { IForm } from '../../interfaces/form-config';
import { generateStandardForm } from '../../utils/generate-form';
import { checkImplementForm, checkImplementParameters } from '../../utils/check-objects';
import { form, parameters } from '../../interfaces/example';
import { IFormControl } from '../../interfaces/form-control';
import { IPropertyMetadata, metadata } from '../../interfaces/property-metadata';

enum Modes {
  Visual,
  Text,
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#5775F4',
      contrastText: '#fff',
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
    // if (selectedItem !== undefined) setSelectedItem({ ...selectedItem });
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
          <LeftMenu form={data} properties={properties} />
        </div>
        <main>
          <div hidden={mode != Modes.Visual} style={{ height: '100%' }}>
            <VisualMode form={data} onSelectItem={onSelectItem} />
          </div>
          <div hidden={mode != Modes.Text} style={{ height: '100%' }}>
            <TextMode
              value={JSON.stringify(data)}
              onChange={(data) => {
                setData({ ...data });
                updateAll();
              }}
              update={updateAll}
            />
          </div>
        </main>
        <div className="right-side">
          <ComponentSettings
            value={mode == Modes.Visual ? selectedItem : undefined}
            properties={properties}
            config={config}
            update={updateAll}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

FormEditor.displayName = 'FormEditor';
