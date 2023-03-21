import { createTheme, Shadows, ThemeProvider } from '@mui/material';
import React from 'react';
import { CommandLine } from './command-line';
import './style.css';
import { VisualMode } from './visual-mode';
import { TextMode } from './text-mode/text-mode';
import { ComponentSettings } from './component-settings';
import { LeftMenu } from './left-menu';
import { IParameter } from '../../interfaces/parameter';
import { form, parameters } from '../../interfaces/example';
import { IForm } from '../../interfaces/form-config';
import { generateStandardForm } from '../../utils/generate-form';

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

  const changeMode = () => {
    if (mode === Modes.Text) {
      setMode(Modes.Visual);
    } else {
      setMode(Modes.Text);
    }
  };

  const loadProperties = (data: string) => {
    try {
      const p: IParameter[] = JSON.parse(data);
      setProperties(p);
      setData(generateStandardForm(p));
    } catch (e) {
      alert('Неверный формат');
    }
  };

  const newBlankJson = () => {
    setData(generateStandardForm(properties));
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
          <LeftMenu
            properties={properties}
            setProperties={() => {
              return;
            }}
          ></LeftMenu>
        </div>
        <main>
          <div hidden={mode != Modes.Visual} style={{ height: '100%' }}>
            <VisualMode form={data}></VisualMode>
          </div>
          <div hidden={mode != Modes.Text} style={{ height: '100%' }}>
            <TextMode
              value={JSON.stringify(data)}
              onChange={(data) => {
                setData(JSON.parse(data));
              }}
            ></TextMode>
          </div>
        </main>
        <div className="right-side">
          <ComponentSettings
            properties={properties}
            onChangeProperty={(property) => {
              console.log('event: ' + JSON.stringify(property));
            }}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

FormEditor.displayName = 'FormEditor';
