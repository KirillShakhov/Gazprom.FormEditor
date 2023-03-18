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
  // const [form, setForm] = React.useState();

  const standardData =
    '{"glossary":{"title":"example glossary","GlossDiv":{"title":"S","GlossList":{"GlossEntry":{"ID":"SGML","SortAs":"SGML","GlossTerm":"Standard Generalized Markup Language","Acronym":"SGML","Abbrev":"ISO 8879:1986","GlossDef":{"para":"A meta-markup language, used to create markup languages such as DocBook.","GlossSeeAlso":["GML","XML"]},"GlossSee":"markup"}}}}}';
  const [str, setStr] = React.useState(standardData);

  const changeMode = () => {
    if (mode === Modes.Text) {
      setMode(Modes.Visual);
    } else {
      setMode(Modes.Text);
    }
  };

  //
  // const safeJsonParse = <T>(guard: (o: any) => o is T) =>
  // (text: string): ParseResult<T> => {
  //   const parsed = JSON.parse(text)
  //   return guard(parsed) ? { parsed, hasError: false } : { hasError: true }
  // }
  //

  const loadProperties = (data: string) => {
    try {
      // const p: IParameter[] = JSON.parse(data);
      const f: IForm = JSON.parse(data);
      // console.log(JSON.stringify(p));
      // setProperties(p);
      setData(f);
    } catch (e) {
      alert('Неверный формат');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="layout">
        <header>
          <CommandLine
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
            <TextMode value={str} onChange={setStr}></TextMode>
          </div>
        </main>
        <div className="right-side">
          <ComponentSettings value={0} onChange={setStr} />
        </div>
      </div>
    </ThemeProvider>
  );
};

FormEditor.displayName = 'FormEditor';
